import fs from 'node:fs';
import { assert, describe, it } from 'vitest';
import {
  EbmlStreamDecoder,
  EbmlTagIdEnum,
  EbmlSimpleBlockTag as SimpleBlock,
  EbmlDataTag,
  type EbmlTagType,
} from 'konoebml';
import { Readable } from 'node:stream';
import { WritableStream } from 'node:stream/web';

process.setMaxListeners(Number.POSITIVE_INFINITY);

const createReadStream = (file: string) =>
  Readable.toWeb(fs.createReadStream(file), {
    strategy: { highWaterMark: 100, size: (chunk) => chunk.byteLength },
  }) as ReadableStream<Uint8Array>;

const makeDataStreamTest =
  (stream: () => ReadableStream<Uint8Array>) =>
  async (cb: (tag: EbmlTagType, done: () => void) => void) => {
    await new Promise((resolve, reject) => {
      stream()
        .pipeThrough(new EbmlStreamDecoder())
        .pipeTo(
          new WritableStream({
            write: async (tag) => {
              cb(tag, () => resolve(true));
            },
            close: () => {
              reject('hit end of file without calling done');
            },
          })
        )
        .catch(reject);
    });
  };

describe('EBML Values in tags', () => {
  describe('AVC1', () => {
    const makeAVC1StreamTest = makeDataStreamTest(() =>
      createReadStream('media/video-webm-codecs-avc1-42E01E.webm')
    );

    it('should get a correct PixelWidth value from a file (2-byte unsigned int)', async () =>
      await makeAVC1StreamTest((tag, done) => {
        if (tag instanceof EbmlDataTag && tag.id === EbmlTagIdEnum.PixelWidth) {
          assert.strictEqual(tag.data, 352);
          done();
        }
      }));

    it('should get a correct EBMLVersion value from a file (one-byte unsigned int)', async () =>
      await makeAVC1StreamTest((tag, done) => {
        if (
          tag instanceof EbmlDataTag &&
          tag.id === EbmlTagIdEnum.EBMLVersion
        ) {
          assert.strictEqual(tag.data, 1);
          done();
        }
      }));

    it('should get a correct TimeCodeScale value from a file (3-byte unsigned int)', () =>
      makeAVC1StreamTest((tag, done) => {
        if (
          tag instanceof EbmlDataTag &&
          tag.id === EbmlTagIdEnum.TimecodeScale
        ) {
          assert.strictEqual(tag.data, 1000000);
          done();
        }
      }));

    it('should get a correct TrackUID value from a file (56-bit integer in hex)', () =>
      makeAVC1StreamTest((tag, done) => {
        if (tag.id === EbmlTagIdEnum.TrackUID) {
          assert.strictEqual(tag.data, 7990710658693702);
          done();
        }
      }));

    it('should get a correct DocType value from a file (ASCII text)', () =>
      makeAVC1StreamTest((tag, done) => {
        if (tag instanceof EbmlDataTag && tag.id === EbmlTagIdEnum.DocType) {
          assert.strictEqual(tag.data, 'matroska');
          done();
        }
      }));

    it('should get a correct MuxingApp value from a file (utf8 text)', () =>
      makeAVC1StreamTest((tag, done) => {
        if (tag instanceof EbmlDataTag && tag.id === EbmlTagIdEnum.MuxingApp) {
          assert.strictEqual(tag.data, 'Chrome', JSON.stringify(tag));
          done();
        }
      }));

    it('should get a correct SimpleBlock time payload from a file (binary)', () =>
      makeAVC1StreamTest((tag, done) => {
        if (!(tag instanceof SimpleBlock)) {
          return;
        }
        if (tag.value <= 0 || tag.value >= 200) {
          return;
        }

        /* look at second simpleBlock */
        assert.strictEqual(tag.track, 1, 'track');
        assert.strictEqual(tag.value, 191, 'value (timestamp)');
        assert.strictEqual(
          tag.payload.byteLength,
          169,
          JSON.stringify(tag.payload)
        );
        done();
      }));
  });

  describe('VP8', () => {
    const makeVP8StreamTest = makeDataStreamTest(() =>
      createReadStream('media/video-webm-codecs-vp8.webm')
    );

    it('should get a correct PixelWidth value from a video/webm; codecs="vp8" file (2-byte unsigned int)', () =>
      makeVP8StreamTest((tag, done) => {
        if (tag instanceof EbmlDataTag && tag.id === EbmlTagIdEnum.PixelWidth) {
          assert.strictEqual(tag.data, 352);
          done();
        }
      }));

    it('should get a correct EBMLVersion value from a video/webm; codecs="vp8" file (one-byte unsigned int)', () =>
      makeVP8StreamTest((tag, done) => {
        if (
          tag instanceof EbmlDataTag &&
          tag.id === EbmlTagIdEnum.EBMLVersion
        ) {
          assert.strictEqual(tag.data, 1);
          done();
        }
      }));

    it('should get a correct TimeCodeScale value from a video/webm; codecs="vp8" file (3-byte unsigned int)', () =>
      makeVP8StreamTest((tag, done) => {
        if (
          tag instanceof EbmlDataTag &&
          tag.id === EbmlTagIdEnum.TimecodeScale
        ) {
          assert.strictEqual(tag.data, 1000000);
          done();
        }
      }));

    it('should get a correct TrackUID value from a video/webm; codecs="vp8" file (56-bit integer in hex)', () =>
      makeVP8StreamTest((tag, done) => {
        if (tag instanceof EbmlDataTag && tag.id === EbmlTagIdEnum.TrackUID) {
          assert.strictEqual(tag.data, 13630657102564614n);
          done();
        }
      }));

    it('should get a correct DocType value from a video/webm; codecs="vp8" file (ASCII text)', () =>
      makeVP8StreamTest((tag, done) => {
        if (tag instanceof EbmlDataTag && tag.id === EbmlTagIdEnum.DocType) {
          assert.strictEqual(tag.data, 'webm');
          done();
        }
      }));

    it('should get a correct MuxingApp value from a video/webm; codecs="vp8" file (utf8 text)', () =>
      makeVP8StreamTest((tag, done) => {
        if (tag instanceof EbmlDataTag && tag.id === EbmlTagIdEnum.MuxingApp) {
          assert.strictEqual(tag.data, 'Chrome');
          done();
        }
      }));

    it('should get a correct SimpleBlock time payload from a file (binary)', () =>
      makeVP8StreamTest((tag, done) => {
        if (!(tag instanceof SimpleBlock)) {
          return;
        }
        if (tag.value <= 0 || tag.value >= 100) {
          return;
        }

        assert.strictEqual(tag.track, 1, 'track');
        assert.strictEqual(tag.value, 96, JSON.stringify(tag));
        /* look at second simpleBlock */
        assert.strictEqual(tag.payload.byteLength, 43, JSON.stringify(tag));
        assert.strictEqual(tag.discardable, false, 'discardable');
        done();
      }));
  });
});
