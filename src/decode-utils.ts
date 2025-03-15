import { type EbmlTagIdType, isEbmlMasterTagId } from './models/enums';
import type { EbmlTagTrait } from './models/tag-trait';
import type { FileDataViewController } from './adapters';
import {
  checkVintSafeSize,
  dataViewSlice,
  readUnsigned,
  readVint,
  readVintLength,
  type SafeSizeVint,
} from './tools';
import { EbmlTagPosition } from './models/enums';
import { createEbmlTag } from './factory';
import { UnreachableOrLogicError } from './errors';

export async function decodeEbmlTagHeader(
  controller: FileDataViewController
): Promise<{
  sizeVint: SafeSizeVint;
  tagVint: { length: number };
  tagId: EbmlTagIdType;
}> {
  const offset = controller.getOffset();

  let view = await controller.read(offset, 1);

  const tagVintLength = readVintLength(view);

  view =
    tagVintLength > view.byteLength
      ? await controller.read(offset, tagVintLength)
      : view;

  const tagIdView = dataViewSlice(view, 0, tagVintLength);

  view =
    tagVintLength + 1 > view.byteLength
      ? await controller.read(offset, tagVintLength + 1)
      : view;

  const sizeVintLength = readVintLength(
    dataViewSlice(view, tagVintLength, tagVintLength + 1)
  );

  view =
    tagVintLength + sizeVintLength > view.byteLength
      ? await controller.read(offset, tagVintLength + sizeVintLength)
      : view;

  const sizeVint = readVint(
    dataViewSlice(view, tagVintLength, tagVintLength + sizeVintLength)
  )!;

  if (!sizeVint) {
    throw new UnreachableOrLogicError(
      'size vint dataView length is invalid, check code logic!'
    );
  }

  const tagId = readUnsigned(tagIdView);

  const safeSizeVint = checkVintSafeSize(sizeVint, tagId);

  return {
    sizeVint: safeSizeVint,
    tagVint: {
      length: tagVintLength,
    },
    tagId,
  };
}

export async function* decodeEbmlContent(
  controller: FileDataViewController
): AsyncGenerator<EbmlTagTrait, void, unknown> {
  while (true) {
    const offset = controller.getOffset();

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
        parent: undefined,
      });
      yield tag;
    }

    await controller.seek(offset + headerLength);

    const tag: EbmlTagTrait = createEbmlTag(tagId, {
      headerLength,
      contentLength,
      startOffset: offset,
      position: isMaster ? EbmlTagPosition.End : EbmlTagPosition.Content,
      parent: undefined,
    });

    for await (const item of tag.decodeContent(controller)) {
      yield item;
    }

    tag.endOffset = controller.getOffset();

    yield tag;
  }
}
