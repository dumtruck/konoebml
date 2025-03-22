import {
  dataViewSlice,
  dataViewSliceToBuf,
  readSigned,
  readSignedVint,
  readVint,
  writeSigned,
  writeVint,
} from '../tools';
import { EbmlBlockLacing } from './enums';
import {
  type EbmlBlockTagIdType,
  type EbmlSimpleBlockTagIdType,
  EbmlTagIdEnum,
} from './enums';
import { EbmlElementType } from './enums';
import { type CreateEbmlDataTagOptions, EbmlDataTag } from './tag-data';
import type { DecodeContentOptions } from './tag-trait';

export interface CreateEbmlBlockTagOptions
  extends Omit<CreateEbmlDataTagOptions, 'id' | 'type'> {
  id?: EbmlBlockTagIdType | EbmlSimpleBlockTagIdType;
}

export class EbmlBlockTag extends EbmlDataTag {
  payload = new Uint8Array(0);
  track: number | bigint = 0;
  value = 0;

  invisible: boolean | undefined;
  lacing: EbmlBlockLacing | undefined;
  frames: DataView[] = [];
  lacingLength?: number;

  constructor(options: CreateEbmlBlockTagOptions) {
    super({
      id: options.id ?? EbmlTagIdEnum.Block,
      type: EbmlElementType.Binary,
      ...options,
    });
  }

  protected writeTrackBuffer(): Uint8Array {
    return writeVint(this.track);
  }

  protected writeValueBuffer(): Uint8Array {
    return writeSigned(this.value, 2);
  }

  protected writeFlagsBuffer(): Uint8Array {
    let flags = 0x00;
    if (this.invisible) {
      flags |= 0x10;
    }

    switch (this.lacing) {
      case EbmlBlockLacing.None:
        break;
      case EbmlBlockLacing.Xiph:
        flags |= 0x04;
        break;
      case EbmlBlockLacing.EBML:
        flags |= 0x08;
        break;
      case EbmlBlockLacing.FixedSize:
        flags |= 0x0c;
        break;
      default:
    }

    return new Uint8Array([flags % 256]);
  }

  *encodeContent(): Generator<Uint8Array, void, unknown> {
    yield this.writeTrackBuffer();
    yield this.writeValueBuffer();
    yield this.writeFlagsBuffer();
    yield this.payload;
  }

  // biome-ignore lint/correctness/useYield: <explanation>
  async *decodeContentImpl(options: DecodeContentOptions) {
    const controller = options.dataViewController;
    const offset = controller.getOffset();
    const view = await controller.read(offset, this.contentLength, true);
    const track = readVint(view)!;
    this.track = track.value;
    this.value = Number(
      readSigned(dataViewSlice(view, track.length, track.length + 2))
    );
    const flags: number = view.getUint8(track.length + 2);
    this.invisible = Boolean(flags & 0x10);
    this.payload = dataViewSliceToBuf(view, track.length + 3, undefined);
    switch (flags & 0x0c) {
      case 0x00:
        this.lacing = EbmlBlockLacing.None;
        break;

      case 0x04:
        this.lacing = EbmlBlockLacing.Xiph;
        break;

      case 0x08:
        this.lacing = EbmlBlockLacing.EBML;
        break;

      case 0x0c:
        this.lacing = EbmlBlockLacing.FixedSize;
        break;
      default:
    }
    this.decodeFrames();
    await controller.seek(offset + view.byteLength);
  }

  private readXiphSizes(frames: number): number[] {
    let prefixes = 0;
    let i = 1;
    const sizes: number[] = [];
    while (sizes.length < frames) {
      const byte = this.payload[i];
      if (byte === 255) {
        prefixes += 1;
      } else {
        const size = prefixes * 255 + byte;
        prefixes = 0;
        sizes.push(size);
      }
      i += 1;
    }
    this.lacingLength = i;
    return sizes;
  }

  private readEbmlSizes(frames: number): number[] {
    const sizes: number[] = [];
    let size = 0;
    let offset = 1;
    for (let i = 0; i < frames; i += 1) {
      const vintView = new DataView(this.payload.buffer, offset);
      if (i === 0) {
        const vint = readVint(vintView)!;
        size = Number(vint.value);
        sizes.push(size);
        offset += vint.length;
      } else {
        const vint = readSignedVint(vintView)!;
        const delta = vint.value;
        size += Number(delta);
        sizes.push(size);
        offset += vint.length;
      }
    }
    this.lacingLength = size;

    return sizes;
  }

  private decodeFrames(): DataView[] {
    if (this.lacing === EbmlBlockLacing.EBML) {
      const framesNumMinus = this.payload[0];
      const sizes = this.readEbmlSizes(framesNumMinus);
      const frames: DataView[] = [];
      let acc = this.lacingLength!;
      for (const size of sizes) {
        frames.push(new DataView(this.payload.buffer, acc, size));
        acc += size;
      }
      return frames;
    }
    if (this.lacing === EbmlBlockLacing.Xiph) {
      const framesNumMinus = this.payload[0];
      const sizes = this.readXiphSizes(framesNumMinus);
      const frames: DataView[] = [];
      let acc = this.lacingLength!;
      for (const size of sizes) {
        frames.push(new DataView(this.payload.buffer, acc, size));
        acc += size;
      }
      return frames;
    }
    if (this.lacing === EbmlBlockLacing.FixedSize) {
      const frameNum = this.payload[0] + 1;
      this.lacingLength = 1;
      const size = (this.payload.length - 1) / frameNum;
      let offset = 1;
      const frames: DataView[] = [];
      for (let i = 0; i < frameNum; i++) {
        frames.push(new DataView(this.payload.buffer, offset, size));
        offset += size;
      }
      return frames;
    }
    return [new DataView(this.payload.buffer)];
  }

  override toDebugRecord() {
    const s = super.toDebugRecord();
    return {
      ...s,
      payload: this.payload,
      track: this.track,
      value: this.value,
      invisible: this.invisible,
      lacing: EbmlBlockLacing[this.lacing!] || this.lacing,
    };
  }
}
