import { type CreateEbmlTagOptions, EbmlTagTrait } from './tag-trait';
import { EbmlElementType, EbmlTagPosition, isEbmlMasterTagId } from './enums';
import { decodeEbmlTagHeader } from '../decode-utils';
import { createEbmlTag } from 'src/factory';
import type { EbmlMasterTagIdType } from './enums';
import type { FileDataViewController } from '../adapters';

export interface CreateEbmlMasterTagOptions
  extends Omit<CreateEbmlTagOptions, 'position' | 'type' | 'id'> {
  id: EbmlMasterTagIdType;
}

export class EbmlMasterTag extends EbmlTagTrait {
  private _children: EbmlTagTrait[] = [];

  get children(): EbmlTagTrait[] {
    return this._children;
  }

  set children(value: EbmlTagTrait[]) {
    this._children = value;
  }

  constructor(options: CreateEbmlMasterTagOptions) {
    super({
      ...options,
      id: options.id,
      type: EbmlElementType.Master,
    });
  }

  *encodeContent(): Generator<Uint8Array, void, unknown> {
    for (const child of this.children) {
      yield* child.encode();
    }
  }

  async *decodeContentImpl(controller: FileDataViewController) {
    while (true) {
      const offset = controller.getOffset();

      if (offset >= this.endOffset) {
        break;
      }

      const peeked = await controller.peek(offset);

      if (!peeked) {
        break;
      }

      const vints = await decodeEbmlTagHeader(controller);

      const { tagId, tagVint, sizeVint } = vints;

      const headerLength = tagVint.length + sizeVint.length;
      const contentLength = sizeVint.value;

      const isMaster = isEbmlMasterTagId(tagId);

      if (isMaster) {
        const tag: EbmlTagTrait = createEbmlTag(tagId, {
          headerLength,
          contentLength,
          startOffset: offset,
          position: EbmlTagPosition.Start,
          parent: this,
        });
        yield tag;
      }

      await controller.seek(offset + headerLength);

      const tag: EbmlTagTrait = createEbmlTag(tagId, {
        headerLength,
        contentLength,
        startOffset: offset,
        position: isMaster ? EbmlTagPosition.End : EbmlTagPosition.Content,
        parent: this,
      });

      for await (const item of tag.decodeContent(controller)) {
        yield item;
      }

      tag.endOffset = controller.getOffset();

      this._children.push(tag);

      yield tag;
    }
  }
}
