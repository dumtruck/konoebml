import {
  EbmlStreamEncoder,
  EbmlTagIdEnum,
  EbmlTagPosition,
  type EbmlTagTrait,
  createEbmlTagForManuallyBuild,
} from 'konoebml';
import { assert, describe, expect, it } from 'vitest';

const invalidTag: EbmlTagTrait = <EbmlTagTrait>(<any>{
  id: undefined,
  type: <any>'404NotFound',
  position: undefined,
  size: -1,
  data: null,
});

const incompleteTag: EbmlTagTrait = undefined!;

const ebmlStartTag = createEbmlTagForManuallyBuild(EbmlTagIdEnum.EBML, {
  position: EbmlTagPosition.Start,
});

const ebmlEndTag: EbmlTagTrait = createEbmlTagForManuallyBuild(
  EbmlTagIdEnum.EBML,
  {
    contentLength: 10,
    position: EbmlTagPosition.End,
  }
);

const ebmlVersion1Tag = Object.assign(
  createEbmlTagForManuallyBuild(EbmlTagIdEnum.EBMLVersion, {
    position: EbmlTagPosition.Content,
  }),
  {
    data: 1,
  }
);

const ebmlVersion0Tag: EbmlTagTrait = Object.assign(
  createEbmlTagForManuallyBuild(EbmlTagIdEnum.EBMLVersion, {
    position: EbmlTagPosition.Content,
  }),
  {
    data: 0,
  }
);

const makeEncoderTest = async (tags: EbmlTagTrait[]) => {
  const source = new ReadableStream({
    pull(controller) {
      for (const tag of tags) {
        controller.enqueue(tag);
      }
      controller.close();
    },
  });

  const encoder = new EbmlStreamEncoder();

  const chunks: ArrayBuffer[] = [];

  await new Promise<void>((resolve, reject) => {
    source
      .pipeThrough(encoder)
      .pipeTo(
        new WritableStream({
          write(chunk) {
            chunks.push(chunk);
          },
          close() {
            resolve();
          },
          abort: (e) => {
            reject(e);
          },
        })
      )
      .catch(reject);
  });
  return {
    encoder,
    chunks,
  };
};

describe('EBML Encoder', () => {
  it('should write a single tag', async () => {
    const { chunks } = await makeEncoderTest([ebmlVersion1Tag]);

    assert.deepEqual(chunks, [
      new Uint8Array([0x42, 0x86]),
      new Uint8Array([0x81]),
      new Uint8Array([0x01]),
    ]);
  });
  it('should write a tag with a single child', async () => {
    const { chunks } = await makeEncoderTest([
      ebmlStartTag,
      ebmlVersion0Tag,
      ebmlEndTag,
    ]);

    assert.deepEqual(chunks, [
      new Uint8Array([0x1a, 0x45, 0xdf, 0xa3]),
      new Uint8Array([0x83]),
      new Uint8Array([0x42, 0x86]),
      new Uint8Array([0x80]),
      new Uint8Array([]),
    ]);
  });

  it('throws with an incomplete tag data', async () => {
    await expect(() => makeEncoderTest([incompleteTag])).rejects.toThrow(
      /should only accept embl tag but not/
    );
  });

  it('throws with an invalid tag id', async () => {
    await expect(() => makeEncoderTest([invalidTag])).rejects.toThrow(
      /should only accept embl tag but not/
    );
  });
});
