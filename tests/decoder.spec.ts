import { assert, describe, it } from 'vitest';
import {
  EbmlTagPosition,
  EbmlElementType,
  EbmlStreamDecoder as Decoder,
  EbmlDataTag,
  type EbmlTagType,
} from 'konoebml';

const bufFrom = (data: Uint8Array | readonly number[]): ArrayBuffer =>
  new Uint8Array(data).buffer;

const getDecoderWithNullSink = () => {
  const decoder = new Decoder();
  decoder.readable.pipeTo(new WritableStream({}));
  return decoder;
};

async function collectTags(decoder: Decoder): Promise<EbmlTagType[]> {
  const tags: EbmlTagType[] = [];
  await decoder.readable.pipeTo(
    new WritableStream({
      write: (tag) => {
        tags.push(tag);
      },
    })
  );
  return tags;
}

describe('EbmlStreamDecoder', () => {
  it('should wait for more data if a tag is longer than the buffer', async () => {
    const decoder = getDecoderWithNullSink();
    const writer = decoder.writable.getWriter();
    await writer.write(bufFrom([0x1a, 0x45]));

    assert.strictEqual(decoder.transformer.getBuffer().byteLength, 2);
  });

  it('should clear the buffer after a full tag is written in one chunk', async () => {
    const decoder = getDecoderWithNullSink();
    const writer = decoder.writable.getWriter();
    await writer.write(bufFrom([0x42, 0x86, 0x81, 0x01]));

    assert.strictEqual(decoder.transformer.getBuffer().byteLength, 0);
  });

  it('should clear the buffer after a full tag is written in multiple chunks', async () => {
    const decoder = getDecoderWithNullSink();
    const writer = decoder.writable.getWriter();

    await writer.write(bufFrom([0x42, 0x86]));
    await writer.write(bufFrom([0x81, 0x01]));

    assert.strictEqual(decoder.transformer.getBuffer().byteLength, 0);
  });

  it('should increment the cursor on each step', async () => {
    const decoder = getDecoderWithNullSink();
    const writer = decoder.writable.getWriter();

    await writer.write(bufFrom([0x42])); // 4

    assert.strictEqual(decoder.transformer.getBuffer().byteLength, 1);

    await writer.write(bufFrom([0x86])); // 5

    assert.strictEqual(decoder.transformer.getBuffer().byteLength, 2);

    await writer.write(bufFrom([0x81])); // 6 & 7

    assert.strictEqual(decoder.transformer.getBuffer().byteLength, 0);

    await writer.write(bufFrom([0x01])); // 6 & 7

    assert.strictEqual(decoder.transformer.getBuffer().byteLength, 0);
  });

  it('should emit correct tag events for simple data', async () => {
    const decoder = new Decoder();
    const writer = decoder.writable.getWriter();

    const tags = collectTags(decoder);

    await writer.write(bufFrom([0x42, 0x86, 0x81, 0x01]));
    await writer.close();

    const [tag] = await tags;

    assert.strictEqual(tag.position, EbmlTagPosition.Content);
    assert.strictEqual(tag.id.toString(16), '4286');
    assert.strictEqual(tag.contentLength, 0x01);
    assert.strictEqual(tag.type, EbmlElementType.UnsignedInt);
    assert.ok(tag instanceof EbmlDataTag);
    assert.deepStrictEqual(tag.data, 1);
  });

  it('should emit correct EBML tag events for master tags', async () => {
    const decoder = new Decoder();
    const writer = decoder.writable.getWriter();

    writer.write(bufFrom([0x1a, 0x45, 0xdf, 0xa3, 0x80]));
    writer.close();

    const [tag] = await collectTags(decoder);

    assert.strictEqual(tag.position, EbmlTagPosition.Start);
    assert.strictEqual(tag.id.toString(16), '1a45dfa3');
    assert.strictEqual(tag.contentLength, 0);
    assert.strictEqual(tag.type, EbmlElementType.Master);
    assert.ok(!(tag instanceof EbmlDataTag));
    assert.ok(!('data' in tag));
  });

  it('should emit correct EBML:end events for master tags', async () => {
    const decoder = new Decoder();
    const writer = decoder.writable.getWriter();

    writer.write(bufFrom([0x1a, 0x45, 0xdf, 0xa3]));
    writer.write(bufFrom([0x84, 0x42, 0x86, 0x81, 0x00]));
    writer.close();

    const tags = await collectTags(decoder);

    assert.strictEqual(tags.length, 3);

    const firstEndTag = tags.find((t) => t.position === EbmlTagPosition.End)!;

    assert.strictEqual(firstEndTag.id.toString(16), '1a45dfa3');
    assert.strictEqual(firstEndTag.contentLength, 4);
    assert.strictEqual(firstEndTag.type, EbmlElementType.Master);
    assert.ok(!(firstEndTag instanceof EbmlDataTag));
    assert.ok(!('data' in firstEndTag));
  });
});
