import { type CreateEbmlTagOptions, EbmlTagTrait } from './tag-trait';
import { EbmlElementType } from './enums';
import {
  dataViewSlice,
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
import type { FileDataViewController } from 'src/adapters';

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
  override async *decodeContentImpl(controller: FileDataViewController) {
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
      case EbmlElementType.String:
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
      case EbmlElementType.String:
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
