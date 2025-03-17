import {
  type EbmlBlockTag,
  EbmlStreamDecoder,
  EbmlStreamEncoder,
  EbmlTagIdEnum,
  type EbmlTagTrait,
  type EbmlTagType,
  createEbmlTagForManuallyBuild,
} from 'konoebml';
import { concatArrayBuffers } from 'konoebml/tools';
import { assert, describe, expect, it } from 'vitest';

describe('EBML Pipeline', () => {
  async function assertPipelineOutputEquals(
    input: number[],
    expected: number[]
  ) {
    const buffer = new Uint8Array(input);

    const source = new ReadableStream<ArrayBuffer>({
      pull(controller) {
        controller.enqueue(buffer.buffer);
        controller.close();
      },
    });

    const chunks: ArrayBuffer[] = [];
    await new Promise<void>((resolve, reject) => {
      const sink = new WritableStream<ArrayBuffer>({
        write(chunk) {
          chunks.push(chunk);
        },
        close() {
          resolve();
        },
      });

      source
        .pipeThrough(new EbmlStreamDecoder())
        .pipeThrough(new EbmlStreamEncoder())
        .pipeTo(sink)
        .catch(reject);
    });

    expect(concatArrayBuffers(...chunks)).toEqual(new Uint8Array(expected));
  }

  it('should not immediately output with not unknown sized and not paired master tag', async () => {
    await assertPipelineOutputEquals(
      [0x1a, 0x45, 0xdf, 0xa3, 0x83, 0x42, 0x86, 0x81],
      []
    );
  });

  it('should immediately output with unknown sized master tag', async () => {
    await assertPipelineOutputEquals(
      [0x1a, 0x45, 0xdf, 0xa3, 0xff, 0x42, 0x86, 0x81],
      [0x1a, 0x45, 0xdf, 0xa3, 0xff]
    );
  });

  it('should encode and decode Blocks correctly', async () => {
    const block = createEbmlTagForManuallyBuild(EbmlTagIdEnum.Block, {});
    block.track = 5;
    block.invisible = true;
    const payload = new Uint8Array(50);
    for (let i = 0; i < payload.byteLength; i++) {
      payload[i] = Math.floor(Math.random() * 255);
    }
    block.payload = payload;
    const encoder = new EbmlStreamEncoder();
    const decoder = new EbmlStreamDecoder();
    const tags: EbmlTagType[] = [];
    await new Promise<void>((resolve, reject) => {
      const source = new ReadableStream<EbmlTagTrait>({
        pull(controller) {
          controller.enqueue(block);
          controller.close();
        },
      });
      source
        .pipeThrough(encoder)
        .pipeThrough(decoder)
        .pipeTo(
          new WritableStream({
            write(tag) {
              tags.push(tag);
            },
            close: () => resolve(),
          })
        )
        .catch(reject);
    });
    const tag = tags[0] as EbmlBlockTag;
    assert.strictEqual(tag.id, EbmlTagIdEnum.Block);
    assert.strictEqual(tag.track, block.track);
    assert.strictEqual(tag.invisible, block.invisible);
    assert.deepEqual(tag.payload, block.payload);
  });
});
