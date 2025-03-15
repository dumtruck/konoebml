import { readVint } from '../tools';
import { type CreateEbmlBlockTagOptions, EbmlBlockTag } from './tag-block';
import type { EbmlSimpleBlockTagIdType } from './enums';
import type { FileDataViewController } from '../adapters';

export interface CreateEbmlSimpleBlockTagOptions
  extends Omit<CreateEbmlBlockTagOptions, 'id'> {
  id?: EbmlSimpleBlockTagIdType;
}

export class EbmlSimpleBlockTag extends EbmlBlockTag {
  discardable: boolean | undefined;
  keyframe: boolean | undefined;

  // biome-ignore lint/complexity/noUselessConstructor: <explanation>
  constructor(options: CreateEbmlSimpleBlockTagOptions) {
    super(options);
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

  async *decodeContentImpl(controller: FileDataViewController) {
    const offset = controller.getOffset();

    const view = await controller.read(offset, this.contentLength, true);

    for await (const item of super.decodeContentImpl(controller)) {
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
