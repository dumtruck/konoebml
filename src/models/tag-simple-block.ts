import { readVint } from '../tools';
import { EbmlTagIdEnum, type EbmlSimpleBlockTagIdType } from './enums';
import { type CreateEbmlBlockTagOptions, EbmlBlockTag } from './tag-block';
import type { DecodeContentOptions } from './tag-trait';

export interface CreateEbmlSimpleBlockTagOptions
  extends Omit<CreateEbmlBlockTagOptions, 'id'> {
  id?: EbmlSimpleBlockTagIdType;
}

export class EbmlSimpleBlockTag extends EbmlBlockTag {
  discardable: boolean | undefined;
  keyframe: boolean | undefined;

  constructor(options: CreateEbmlSimpleBlockTagOptions) {
    super({
      id: EbmlTagIdEnum.SimpleBlock,
      ...options,
    });
  }

  *encodeContent(): Generator<Uint8Array, void, unknown> {
    const flags = this.writeFlagsBuffer();

    if (this.keyframe) {
      flags[0] |= 0x80;
    }
    if (this.discardable) {
      flags[0] |= 0x01;
    }

    yield this.writeTrackBuffer();
    yield this.writeValueBuffer();
    yield flags;
    yield this.payload;
  }

  async *decodeContentImpl(options: DecodeContentOptions) {
    const controller = options.dataViewController;
    const offset = controller.getOffset();

    const view = await controller.read(offset, this.contentLength, true);

    for await (const item of super.decodeContentImpl(options)) {
      yield item;
    }

    const trackVint = readVint(view)!;

    const flags: number = view.getUint8(trackVint.length + 2);
    this.keyframe = Boolean(flags & 0x80);
    this.discardable = Boolean(flags & 0x01);

    // seeked by block tag
    // await controller.seek(offset + this.contentLength);
  }
}
