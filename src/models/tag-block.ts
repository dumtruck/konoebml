import { type CreateEbmlDataTagOptions, EbmlDataTag } from './tag-data';
import { EbmlBlockLacing } from './enums';
import {
  dataViewSlice,
  dataViewSliceToBuf,
  readSigned,
  readVint,
  writeSigned,
  writeVint,
} from '../tools';
import {
  type EbmlBlockTagIdType,
  type EbmlSimpleBlockTagIdType,
  EbmlTagIdEnum,
} from './enums';
import { EbmlElementType } from './enums';
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

  constructor(options: CreateEbmlBlockTagOptions) {
    super({
      ...options,
      id: options.id ?? EbmlTagIdEnum.Block,
      type: EbmlElementType.Binary,
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
    this.payload = dataViewSliceToBuf(view, track.length + 3, undefined);
    await controller.seek(offset + view.byteLength);
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
