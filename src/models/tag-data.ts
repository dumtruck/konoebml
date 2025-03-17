import {
  type CreateEbmlTagOptions,
  type DecodeContentOptions,
  EbmlTagTrait,
} from './tag-trait';
import { EbmlElementType } from './enums';
import {
  dataViewSliceToBuf,
  readAscii,
  readFloat,
  readSigned,
  readUnsigned,
  readUtf8,
  writeAscii,
  writeFloat,
  writeSigned,
  writeUnsigned,
  writeUtf8,
} from '../tools';
import { EbmlTagPosition } from './enums';

export type CreateEbmlDataTagOptions = Omit<CreateEbmlTagOptions, 'position'>;

export class EbmlDataTag extends EbmlTagTrait {
  data: number | string | bigint | null | Uint8Array | undefined;

  constructor(options: CreateEbmlDataTagOptions) {
    super({
      ...options,
      position: EbmlTagPosition.Content,
    });
  }

  // biome-ignore lint/correctness/useYield: <explanation>
  override async *decodeContentImpl(options: DecodeContentOptions) {
    const controller = options.dataViewController;
    const offset = controller.getOffset();
    const view = await controller.read(offset, this.contentLength, true);
    switch (this.type) {
      case EbmlElementType.UnsignedInt:
        this.data = readUnsigned(view);
        break;
      case EbmlElementType.Float:
        this.data = readFloat(view);
        break;
      case EbmlElementType.Integer:
        this.data = readSigned(view);
        break;
      case EbmlElementType.Ascii:
        this.data = readAscii(view);
        break;
      case EbmlElementType.UTF8:
        this.data = readUtf8(view);
        break;
      default:
        this.data = dataViewSliceToBuf(view, undefined, undefined);
        break;
    }
    await controller.seek(offset + view.byteLength);
  }

  *encodeContent(): Generator<Uint8Array, void, unknown> {
    switch (this.type) {
      case EbmlElementType.UnsignedInt:
        yield writeUnsigned(this.data as any);
        break;
      case EbmlElementType.Float:
        yield writeFloat(this.data as any);
        break;
      case EbmlElementType.Integer:
        yield writeSigned(this.data as any);
        break;
      case EbmlElementType.Ascii:
        yield writeAscii(this.data as any);
        break;
      case EbmlElementType.UTF8:
        yield writeUtf8(this.data as any);
        break;
      default:
        yield this.data as Uint8Array;
        break;
    }
  }

  override toDebugRecord() {
    return {
      ...super.toDebugRecord(),
      data: this.data,
    };
  }

  toJSON() {
    return JSON.stringify(this.toDebugRecord(), null, 2);
  }
}
