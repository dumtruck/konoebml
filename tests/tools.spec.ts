import { assert, describe, it } from 'vitest';
import {
  readAscii,
  readElementIdVint,
  readFloat,
  readSigned,
  readUnsigned,
  readUtf8,
  readVint,
  writeVint,
} from 'konoebml/tools';

function bufFrom(data: Uint8Array | readonly number[]): Uint8Array {
  return new Uint8Array(data);
}

function viewFrom(
  data: Uint8Array | readonly number[],
  start?: number,
  length?: number
): DataView {
  const buf = bufFrom(data);
  return new DataView(buf.buffer, start, length);
}

describe('EBML Tools', () => {
  describe('#readVint()', () => {
    function assertReadVint(
      data: Uint8Array | readonly number[],
      expect: number | bigint | [number | bigint, number | undefined],
      start?: number,
      length?: number
    ) {
      const view = viewFrom(data, start, length);
      const vint = readVint(view)!;

      const expectValue = Array.isArray(expect) ? expect[0] : expect;
      const expectLength =
        (Array.isArray(expect) ? expect[1] : undefined) ??
        view.byteLength - view.byteOffset;
      assert.strictEqual(vint.value, expectValue);
      assert.strictEqual(vint.length, expectLength);
    }

    function assertReadElementIdVint(
      data: Uint8Array | readonly number[],
      expect: number | bigint | [number | bigint, number | undefined],
      start?: number,
      length?: number
    ) {
      const view = viewFrom(data, start, length);
      const vint = readElementIdVint(view)!;

      const expectValue = Array.isArray(expect) ? expect[0] : expect;
      const expectLength =
        (Array.isArray(expect) ? expect[1] : undefined) ??
        view.byteLength - view.byteOffset;
      assert.strictEqual(vint.value, expectValue);
      assert.strictEqual(vint.length, expectLength);
    }

    it('should read the correct value for all 1 byte ints', () => {
      assertReadVint([0x80], 0);
      assert.throws(() => {
        readElementIdVint(viewFrom([0x80]));
      }, /Element ID VINT_DATA can not be all zeros/);

      for (let i = 1; i < 0x80 - 1; i += 1) {
        assertReadElementIdVint([i | 0x80], i);
        assertReadVint([i | 0x80], i);
      }

      assertReadVint([0xff], 127);
      assert.throws(() => {
        readElementIdVint(viewFrom([0xff]));
      }, /Element ID VINT_DATA can not be all ones/);
    });

    it('should read the correct value for 1 byte int with non-zero start', () => {
      assertReadVint([0x00, 0x81], [1, 1], 1);
    });

    it('should read the correct value for all 2 byte ints', () => {
      for (let i = 0; i < 0x40; i += 1) {
        for (let j = 0; j < 0xff; j += 1) {
          assertReadVint([i | 0x40, j], (i << 8) + j);
        }
      }
    });

    it('should read the correct value for all 3 byte ints', () => {
      for (let i = 0; i < 0x20; i += 1) {
        for (let j = 0; j < 0xff; j += 2) {
          for (let k = 0; k < 0xff; k += 3) {
            assertReadVint([i | 0x20, j, k], (i << 16) + (j << 8) + k);
          }
        }
      }
    });
    // not brute forcing any more bytes, takes sooo long

    it('should read the correct value for 4 byte int min/max values', () => {
      assertReadVint([0x10, 0x20, 0x00, 0x00], 2 ** 21);
      assertReadVint([0x1f, 0xff, 0xff, 0xfe], 2 ** 28 - 2);
    });

    it('should read the correct value for 5 byte int min/max values', () => {
      assertReadVint([0x08, 0x10, 0x00, 0x00, 0x00], 2 ** 28);
      assertReadVint([0x0f, 0xff, 0xff, 0xff, 0xfe], 2 ** 35 - 2);
    });

    it('should read the correct value for 6 byte int min/max values', () => {
      assertReadVint([0x04, 0x08, 0x00, 0x00, 0x00, 0x00], 2 ** 35);
      assertReadVint([0x07, 0xff, 0xff, 0xff, 0xff, 0xfe], 2 ** 42 - 2);
    });

    it('should read the correct value for 7 byte int min/max values', () => {
      assertReadVint([0x02, 0x04, 0x00, 0x00, 0x00, 0x00, 0x00], 2 ** 42);
      assertReadVint([0x03, 0xff, 0xff, 0xff, 0xff, 0xff, 0xfe], 2 ** 49 - 2);
    });

    it('should read the correct value for 8 byte int min value', () => {
      assertReadVint([0x01, 0x02, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00], 2 ** 49);
    });

    it('should read the correct value for the max representable JS number (2^53 - 1)', () => {
      assertReadVint(
        [0x01, 0x1f, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff],
        Number.MAX_SAFE_INTEGER
      );
    });

    it('should return bigint for more than max representable JS number (2^53)', () => {
      assertReadVint(
        [0x01, 0x20, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00],
        BigInt(Number.MAX_SAFE_INTEGER) + 1n
      );
    });

    it('should return bigint for more than max representable JS number (8 byte int max value)', () => {
      assertReadVint(
        [0x01, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff],
        2n ** 56n - 1n
      );
    });

    it('should throw for 9+ byte int values', () => {
      assert.throws(() => {
        readVint(
          viewFrom([0x00, 0x80, 0x00, 0x00, 0x00, 0x00, 0x00, 0xff, 0xff])
        );
      }, /Vint length out of range/);
    });

    it('should throw for not shortest element id', () => {
      assert.throws(() => {
        readElementIdVint(viewFrom([0x40, 0x3f]));
      }, /Element ID VINT_DATA should be shortest/);
    });
  });

  describe('#writeVint()', () => {
    function assertWriteVint(
      value: number | bigint,
      expected: Uint8Array | readonly number[]
    ): void {
      const actual = writeVint(value);
      assert.strictEqual(
        Buffer.from(expected).toString('hex'),
        Buffer.from(actual).toString('hex')
      );
    }

    it('should throw when writing -1', () => {
      assert.throws(() => {
        writeVint(-1);
      }, /VINT_DATA out of range/);
    });

    it('should write all 1 byte ints', () => {
      for (let i = 0; i < 0x80 - 1; i += 1) {
        assertWriteVint(i, [i | 0x80]);
      }
    });

    it('should write 2 byte int min/max values', () => {
      assertWriteVint(2 ** 7 - 1, [0x40, 0x7f]);
      assertWriteVint(2 ** 14 - 2, [0x7f, 0xfe]);
    });

    it('should write 3 byte int min/max values', () => {
      assertWriteVint(2 ** 14 - 1, [0x20, 0x3f, 0xff]);
      assertWriteVint(2 ** 21 - 2, [0x3f, 0xff, 0xfe]);
    });

    it('should write 4 byte int min/max values', () => {
      assertWriteVint(2 ** 21 - 1, [0x10, 0x1f, 0xff, 0xff]);
      assertWriteVint(2 ** 28 - 2, [0x1f, 0xff, 0xff, 0xfe]);
    });

    it('should write 5 byte int min/max value', () => {
      assertWriteVint(2 ** 28 - 1, [0x08, 0x0f, 0xff, 0xff, 0xff]);
      assertWriteVint(2 ** 35 - 2, [0x0f, 0xff, 0xff, 0xff, 0xfe]);
    });

    it('should write 6 byte int min/max value', () => {
      assertWriteVint(2 ** 35 - 1, [0x04, 0x07, 0xff, 0xff, 0xff, 0xff]);
      assertWriteVint(2 ** 42 - 2, [0x07, 0xff, 0xff, 0xff, 0xff, 0xfe]);
    });

    it('should write 7 byte int min/max value', () => {
      assertWriteVint(2 ** 42 - 1, [0x02, 0x03, 0xff, 0xff, 0xff, 0xff, 0xff]);
      assertWriteVint(2 ** 49 - 2, [0x03, 0xff, 0xff, 0xff, 0xff, 0xff, 0xfe]);
    });

    it('should write 8 byte int min/max value', () => {
      assertWriteVint(
        2 ** 49 - 1,
        [0x01, 0x01, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff]
      );
      assertWriteVint(
        2n ** 56n - 2n,
        [0x01, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xfe]
      );
    });

    it('should write the correct value for the max representable JS number (2^53 - 1)', () => {
      assertWriteVint(
        Number.MAX_SAFE_INTEGER,
        [0x01, 0x1f, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff]
      );
    });

    it('should throw for more than max representable JS number (8 byte int max value)', () => {
      assert.throws(() => {
        writeVint(2n ** 56n + 1n);
      }, /VINT_DATA out of range/);
    });

    it('should throw for 9+ byte int values', () => {
      assert.throws(() => {
        writeVint(2n ** 56n + 1n);
      }, /VINT_DATA out of range/);
    });
  });

  describe('#readUnsigned', () => {
    it('handles 8-bit ints', () => {
      assert.strictEqual(readUnsigned(viewFrom([0x07])), 7);
    });
    it('handles 16-bit ints', () => {
      assert.strictEqual(readUnsigned(viewFrom([0x07, 0x07])), 1799);
    });
    it('handles 32-bit ints', () => {
      assert.strictEqual(
        readUnsigned(viewFrom([0x07, 0x07, 0x07, 0x07])),
        117901063
      );
    });
    it('handles ints smaller than 49 bits as numbers', () => {
      assert.strictEqual(
        readUnsigned(viewFrom([0x07, 0x07, 0x07, 0x07, 0x07])),
        30182672135
      );
      assert.strictEqual(
        readUnsigned(viewFrom([0x07, 0x07, 0x07, 0x07, 0x07, 0x07])),
        7726764066567
      );
    });
    it('returns ints larger than the max safe number size as bigint', () => {
      assert.strictEqual(
        readUnsigned(viewFrom([0x1, 0x07, 0x07, 0x07, 0x07, 0x07, 0x07, 0x07])),
        74035645638969095n
      );
      assert.strictEqual(
        typeof readUnsigned(
          viewFrom([0x1, 0x07, 0x07, 0x07, 0x07, 0x07, 0x07, 0x07])
        ),
        'bigint'
      );
    });
  });

  describe('#readSigned', () => {
    it('handles 8-bit ints', () => {
      assert.strictEqual(readSigned(viewFrom([0x07])), 7);
    });
    it('handles 16-bit ints', () => {
      assert.strictEqual(readSigned(viewFrom([0x07, 0x07])), 1799);
    });
    it('handles 32-bit ints', () => {
      assert.strictEqual(
        readSigned(viewFrom([0x07, 0x07, 0x07, 0x07])),
        117901063
      );
    });
    it('handles 32 ~ 64bit ints', () => {
      assert.strictEqual(readSigned(viewFrom([0x40, 0x20, 0x00])), 4202496);
    });
  });

  describe('#readFloat', () => {
    it('can read 32-bit floats', () => {
      assert.strictEqual(readFloat(viewFrom([0x40, 0x20, 0x00, 0x00])), 2.5);
    });
    it('can read 64-bit floats', () => {
      assert.strictEqual(
        readFloat(viewFrom([0x40, 0x04, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00])),
        2.5
      );
    });
    it('should throw for invalid sized float arrays', () => {
      assert.throws(() => {
        readFloat(viewFrom([0x40, 0x20, 0x00]));
      }, /length should be/);
    });
  });
  describe('#readUtf8', () => {
    it('can read valid utf-8 strings', () => {
      assert.strictEqual(readUtf8(viewFrom([97, 98, 99])), 'abc');
      assert.strictEqual(
        readUtf8(viewFrom([240, 159, 164, 163, 240, 159, 152, 133])),
        '🤣😅'
      );
    });
  });

  describe('#readAscii', () => {
    it('can read valid ascii strings', () => {
      assert.strictEqual(readAscii(viewFrom([97, 98, 99])), 'abc');
    });

    it('can not read valid ascii strings', () => {
      assert.notStrictEqual(
        readAscii(viewFrom([240, 159, 164, 163, 240, 159, 152, 133])),
        '🤣😅'
      );
    });
  });
});
