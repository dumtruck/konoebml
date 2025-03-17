import { createEbmlTag } from 'src/factory';
import { decodeEbmlTagHeader } from '../decode-utils';
import { EbmlElementType, EbmlTagPosition, isEbmlMasterTagId } from './enums';
import type { EbmlMasterTagIdType } from './enums';
import {
  type CreateEbmlTagOptions,
  type DecodeContentOptions,
  EbmlTagTrait,
} from './tag-trait';

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

  async *decodeContentImpl(options: DecodeContentOptions) {
    const controller = options.dataViewController;
    const collectChild = options.collectChild;
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

      for await (const item of tag.decodeContent(options)) {
        yield item;
      }

      tag.endOffset = controller.getOffset();

      let shouldCollectChild: boolean;
      if (typeof collectChild === 'function') {
        shouldCollectChild = !!collectChild(tag, this);
      } else {
        shouldCollectChild = !!collectChild;
      }

      if (shouldCollectChild) {
        this._children.push(tag);
      }

      yield tag;
    }
  }
}
