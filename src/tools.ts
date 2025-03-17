import {
  ElementIdVintDataAllOnesError,
  ElementIdVintDataAllZerosError,
  ElementIdVintDataNotShortestError,
  OutOfRangeForElementTypeError,
  SizeUnitOutOfSafeIntegerRangeError,
  UnreachableOrLogicError,
  UnsupportLengthForElementTypeError,
  VintLengthOutOfRangeError,
  VintOutOfRangeError,
} from './errors';
import {
  EbmlElementType,
  type EbmlTagIdType,
  isEbmlMasterTagId,
} from './models/enums';

export const UTF8_DECODER = new TextDecoder('utf-8');
export const ASCII_DECODER = new TextDecoder('ascii');
export const UTF8_ENCODER = new TextEncoder();
export const MAX_SAFE_INTEGER_BIGINT = BigInt(Number.MAX_SAFE_INTEGER);
export const VINT_WIDTH_MARKER_VALUE_TABLE = [
  0,
  128,
  16384,
  2097152,
  268435456,
  34359738368,
  4398046511104,
  562949953421312,
  72057594037927936n,
] as [number, number, number, number, number, number, number, number, bigint];

export const ELEM_ID_VINT_DATA_UP_LIMIT = [
  0,
  127,
  16383,
  2097151,
  268435455,
  34359738367,
  4398046511103,
  562949953421311,
  72057594037927935n,
] as [number, number, number, number, number, number, number, number, bigint];
export const MAX_UINT_TABLE = [
  0,
  255,
  65535,
  16777215,
  4294967295,
  1099511627775,
  281474976710655,
  72057594037927935n,
  18446744073709551615n,
];
export const MIN_INT_TABLE = [
  0,
  -128,
  -32768,
  -8388608,
  -2147483648,
  -549755813888,
  -140737488355328,
  -36028797018963968n,
  -9223372036854775808n,
];
export const MAX_INT_TABLE = [
  127,
  32767,
  8388607,
  2147483647,
  549755813887,
  140737488355327,
  36028797018963967n,
  9223372036854775807n,
];
export const MAX_UINT32 = 4294967295;
export const MAX_UINT64 = 18446744073709551615n;
export const MIN_INT32 = -2147483648;
export const MAX_INT32 = 2147483647;
export const MIN_INT64 = -9223372036854775808n;
export const MAX_INT64 = 9223372036854775807n;
export const UNKNOWN_SIZE_VINT_BUF = [
  new Uint8Array(0),
  new Uint8Array([0xff]),
  new Uint8Array([0x7f, 0xff]),
  new Uint8Array([0x3f, 0xff, 0xff]),
  new Uint8Array([0x1f, 0xff, 0xff, 0xff]),
  new Uint8Array([0x0f, 0xff, 0xff, 0xff, 0xff]),
  new Uint8Array([0x07, 0xff, 0xff, 0xff, 0xff, 0xff]),
  new Uint8Array([0x03, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff]),
  new Uint8Array([0x01, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff]),
];
export const UNKNOWN_SIZE_VINT_VALUE = [
  0,
  127,
  16383,
  2097151,
  268435455,
  34359738367,
  4398046511103,
  562949953421311,
  72057594037927935n,
] as [number, number, number, number, number, number, number, number, bigint];

export interface Vint {
  length: number;
  value: number | bigint;
}

export interface SafeSizeVint extends Vint {
  length: number;
  value: number;
}

export function checkVintSafeSize(
  vint: Vint,
  tagId: EbmlTagIdType
): SafeSizeVint {
  const n = vint.value;
  if (typeof n === 'bigint') {
    if (vint.length === 8 && UNKNOWN_SIZE_VINT_VALUE[8] === n) {
      if (!isEbmlMasterTagId(tagId)) {
        throw new UnreachableOrLogicError(
          'only master tag size can be unknown (vint_data be all ones)'
        );
      }
      return {
        length: vint.length,
        value: Number.POSITIVE_INFINITY,
      };
    }
    throw new SizeUnitOutOfSafeIntegerRangeError(vint.value);
  }
  if (n === 0) {
    return vint as SafeSizeVint;
  }
  if (n === (UNKNOWN_SIZE_VINT_VALUE[vint.length] as number)) {
    if (!isEbmlMasterTagId(tagId)) {
      throw new UnreachableOrLogicError(
        'only master tag size can be unknown (vint_data be all ones)'
      );
    }
    return {
      length: vint.length,
      value: Number.POSITIVE_INFINITY,
    };
  }
  return vint as SafeSizeVint;
}

export function readVintLength(view: DataView) {
  if (view.byteLength < 1) {
    throw new VintLengthOutOfRangeError(0);
  }
  const length = 8 - Math.floor(Math.log2(view.getUint8(0)));

  if (length > 8 || length < 0 || Number.isNaN(length)) {
    throw new VintLengthOutOfRangeError(length);
  }

  return length;
}

export function readVint(view: DataView): Vint | null {
  if (view.byteLength < 1) {
    return null;
  }

  const length = readVintLength(view);

  if (length > view.byteLength) {
    return null;
  }

  let value: number | bigint;
  if (length === 8) {
    value = view.getBigUint64(0, false) - VINT_WIDTH_MARKER_VALUE_TABLE[8];
    if (value <= MAX_SAFE_INTEGER_BIGINT) {
      value = Number(value);
    }
  } else if (length === 4) {
    value = view.getUint32(0, false) - VINT_WIDTH_MARKER_VALUE_TABLE[4];
  } else if (length === 2) {
    value = view.getUint16(0, false) - VINT_WIDTH_MARKER_VALUE_TABLE[2];
  } else if (length === 1) {
    value = view.getUint8(0) - VINT_WIDTH_MARKER_VALUE_TABLE[1];
  } else {
    value = 0;
    for (let i = 0; i < length; i++) {
      value = value * 256 + view.getUint8(i);
    }
    value -= VINT_WIDTH_MARKER_VALUE_TABLE[length] as number;
  }

  return {
    length,
    value,
  };
}

export function readElementIdVint(view: DataView): Vint | null {
  const vint = readVint(view);
  if (!vint) {
    return null;
  }
  const length = vint.length;
  const value = vint.value;
  if (value <= 0) {
    throw new ElementIdVintDataAllZerosError(value);
  }
  if (value === ELEM_ID_VINT_DATA_UP_LIMIT[length]) {
    throw new ElementIdVintDataAllOnesError(value);
  }
  if (value < ELEM_ID_VINT_DATA_UP_LIMIT[length - 1]) {
    throw new ElementIdVintDataNotShortestError(
      ((value as any) + VINT_WIDTH_MARKER_VALUE_TABLE[length]) as any
    );
  }
  return vint;
}

export function writeVint(
  value: number | bigint,
  desiredLength?: number
): Uint8Array {
  if (value < 0 || value >= VINT_WIDTH_MARKER_VALUE_TABLE[8]) {
    throw new VintOutOfRangeError(value);
  }
  if (desiredLength! > 8 || desiredLength! < 1) {
    throw new VintLengthOutOfRangeError(desiredLength!);
  }

  let length = desiredLength;

  if (!length) {
    length = 1;
    while (value >= ELEM_ID_VINT_DATA_UP_LIMIT[length]) {
      length++;
    }
  }

  if (length === 8) {
    value = BigInt(value);
  } else {
    value = Number(value);
  }

  if (typeof value === 'bigint') {
    value = BigInt(value);
    const buf = new Uint8Array(8);
    new DataView(buf.buffer).setBigUint64(
      0,
      value + VINT_WIDTH_MARKER_VALUE_TABLE[8],
      false
    );
    return buf;
  }

  value += VINT_WIDTH_MARKER_VALUE_TABLE[length] as number;

  const buffer = new Uint8Array(length);
  for (let i = length - 1; i >= 0; i -= 1) {
    buffer[i] = value % 256;
    value = Math.floor(value / 256);
  }

  return buffer;
}

export function writeElementIdVint(value: number | bigint): Uint8Array {
  if (value >= ELEM_ID_VINT_DATA_UP_LIMIT[8]) {
    throw new VintLengthOutOfRangeError(9);
  }
  if (value <= 0) {
    throw new ElementIdVintDataAllZerosError(value);
  }
  return writeVint(value);
}

export function readUnsigned(view: DataView): number | bigint {
  const byteLength = view.byteLength;
  let value: bigint | number;
  switch (byteLength) {
    case 0:
      return 0;
    case 1:
      return view.getUint8(0);
    case 2:
      return view.getUint16(0, false);
    case 3:
      return view.getUint8(0) * 2 ** 16 + view.getUint16(1, false);
    case 4:
      return view.getUint32(0, false);
    case 5:
      return view.getUint8(0) * 2 ** 32 + view.getUint32(1, false);
    case 6:
      return view.getUint16(0, false) * 2 ** 32 + view.getUint32(2, false);
    case 7:
      value =
        (BigInt(view.getUint8(0)) << 48n) +
        (BigInt(view.getUint16(1, false)) << 32n) +
        BigInt(view.getUint32(3, false));
      break;
    case 8:
      value = view.getBigUint64(0, false);
      break;
    default:
      throw new UnsupportLengthForElementTypeError(
        EbmlElementType.UnsignedInt,
        '0~8',
        byteLength
      );
  }
  if (value <= MAX_SAFE_INTEGER_BIGINT) {
    return Number(value);
  }
  return value;
}

export function writeUnsigned(
  num: bigint | number,
  preferredLength?: number
): Uint8Array {
  if (num < 0 || num > MAX_UINT64) {
    throw new OutOfRangeForElementTypeError(
      EbmlElementType.UnsignedInt,
      `0-${MAX_UINT64}`,
      num
    );
  }
  let length = preferredLength;
  if (!length) {
    length = 0;
    while (num > MAX_UINT_TABLE[length]) {
      length++;
    }
  }
  if (length === 0) {
    return new Uint8Array(0);
  }
  switch (length) {
    case 1: {
      num = Number(num);
      const buf = new Uint8Array(1);
      const view = new DataView(buf.buffer);
      view.setUint8(0, Number(num));
      return buf;
    }
    case 2: {
      num = Number(num);
      const buf = new Uint8Array(2);
      const view = new DataView(buf.buffer);
      view.setUint16(0, Number(num), false);
      return buf;
    }
    case 3: {
      num = Number(num);
      const buf = new Uint8Array(3);
      const view = new DataView(buf.buffer);

      const d1 = num % 2 ** 16;
      num -= d1;
      view.setUint16(1, d1, false);
      view.setUint8(0, Math.floor(num / 2 ** 16));
      return buf;
    }
    case 4: {
      num = Number(num);

      const buf = new Uint8Array(4);
      const view = new DataView(buf.buffer);
      view.setUint32(0, Number(num), false);
      return buf;
    }
    case 5: {
      num = Number(num);

      const buf = new Uint8Array(5);
      const view = new DataView(buf.buffer);

      const d1 = num % 2 ** 32;
      num -= d1;
      view.setUint32(1, d1, false);
      view.setUint8(0, Math.floor(num / 2 ** 32));
      return buf;
    }
    case 6: {
      num = BigInt(num);
      const buf = new Uint8Array(6);
      const view = new DataView(buf.buffer);

      const d1 = num % (1n << 32n);
      num -= d1;
      view.setUint32(2, Number(d1), false);
      view.setUint16(0, Number(num >> 32n), false);
      return buf;
    }
    case 7: {
      num = BigInt(num);
      const buf = new Uint8Array(7);
      const view = new DataView(buf.buffer);

      const d1 = num % (1n << 32n);
      num -= d1;
      view.setUint32(3, Number(d1), false);
      const d2 = num % (1n << 48n);
      num -= d2;
      view.setUint16(1, Number(d2), false);
      view.setUint8(0, Number(num >> 48n));
      return buf;
    }
    case 8: {
      const buf = new Uint8Array(8);
      const view = new DataView(buf.buffer);
      view.setBigUint64(0, BigInt(num), false);
      return buf;
    }
    default:
      throw new UnsupportLengthForElementTypeError(
        EbmlElementType.UnsignedInt,
        '0~8',
        length
      );
  }
}

// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: <explanation>
export function readSigned(view: DataView): number | bigint {
  const byteLength = view.byteLength;
  if (byteLength < 0 || byteLength > 8) {
    throw new UnsupportLengthForElementTypeError(
      EbmlElementType.Integer,
      '0~8',
      byteLength
    );
  }
  if (byteLength === 0) {
    return 0;
  }
  if (byteLength === 1) {
    return view.getInt8(0);
  }
  if (byteLength === 2) {
    return view.getInt16(0, false);
  }
  if (byteLength === 4) {
    return view.getInt32(0, false);
  }
  if (byteLength <= 6) {
    let n = 0;
    const signBit = view.getUint8(0) & 0x80;
    let unignedValue = 0;
    for (let i = 0; i < byteLength; i++) {
      unignedValue = unignedValue * 256 + view.getUint8(i);
    }
    if (signBit) {
      const bitLength = byteLength * 8;
      const maxUnsignedValue = 1 * 2 ** bitLength;
      n = unignedValue - maxUnsignedValue;
    } else {
      n = unignedValue;
    }
    return n;
  }
  let n = 0n;
  if (byteLength === 8) {
    n = view.getBigInt64(0, false);
  } else {
    const signBit = view.getUint8(0) & 0x80;
    let unignedValue = 0n;
    for (let i = 0; i < byteLength; i++) {
      unignedValue = (unignedValue << 8n) + BigInt(view.getUint8(i));
    }
    if (signBit) {
      n = unignedValue;
    } else {
      const bitLength = BigInt(byteLength * 8);
      const maxUnsignedValue = 1n << bitLength;
      n = unignedValue - maxUnsignedValue;
    }
  }
  if (n <= MAX_SAFE_INTEGER_BIGINT) {
    return Number(n);
  }
  return n;
}

// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: <explanation>
export function writeSigned(
  num: number | bigint,
  preferredLength?: number
): Uint8Array {
  if (num < MIN_INT64 || num > MAX_INT64) {
    throw new OutOfRangeForElementTypeError(
      EbmlElementType.Integer,
      `${MIN_INT64}~${MAX_INT64}`,
      num
    );
  }
  let length = preferredLength;
  if (!length) {
    length = 0;
    if (num > 0) {
      while (num > MAX_INT_TABLE[length]) {
        length++;
      }
    } else {
      while (num < MIN_INT_TABLE[length]) {
        length++;
      }
    }
  }

  if (length === 0) {
    return new Uint8Array(0);
  }

  if (length > 8) {
    throw new UnsupportLengthForElementTypeError(
      EbmlElementType.Integer,
      '0~8',
      length
    );
  }

  if (num < 0) {
    if (length >= 6) {
      num = BigInt(num) + BigInt(MAX_UINT_TABLE[length]) + 1n;
    } else {
      num = Number(num) + Number(MAX_UINT_TABLE[length]) + 1;
    }
  }
  return writeUnsigned(num, length);
}

export function readFloat(view: DataView): number {
  const byteLength = view.byteLength;
  switch (byteLength) {
    case 0:
      return 0;
    case 4:
      return view.getFloat32(0, false);
    case 8:
      return view.getFloat64(0, false);
    default:
      throw new UnsupportLengthForElementTypeError(
        EbmlElementType.Float,
        '0,4,8',
        byteLength
      );
  }
}

export function writeFloat(num: number): Uint8Array {
  if (num === 0) {
    return new Uint8Array(0);
  }
  const buf = new Uint8Array(4);
  const view = new DataView(buf.buffer);
  view.setFloat32(0, num, false);
  return buf;
}

export function readUtf8(view: ArrayBufferView): string {
  return UTF8_DECODER.decode(view);
}

export function readAscii(view: ArrayBufferView): string {
  return ASCII_DECODER.decode(view);
}

export function writeUtf8(str: string): Uint8Array {
  return UTF8_ENCODER.encode(str);
}

export function writeAscii(str: string): Uint8Array {
  return writeUtf8(str);
}

export function readHexString(view: DataView): string {
  const n = readUnsigned(view);
  return n.toString(16);
}

export function hexStringToBuf(hex: string): Uint8Array {
  // @ts-ignore
  if (typeof Uint8Array.fromHex === 'function') {
    // @ts-ignore
    return Uint8Array.fromHex(hex);
  }
  return new Uint8Array(
    hex.match(/[\da-fA-F]{2}/gi)!.map((h) => Number.parseInt(h, 16))
  );
}

export function vintToHexString(num: number, litterEnd = false) {
  const buf = writeVint(num);
  const bytes = [...buf];
  if (litterEnd) {
    bytes.reverse();
  }
  return bytes.map((b) => b.toString(16).padStart(2, '0')).join(' ');
}

export function concatBufs(...bufs: Uint8Array[]): Uint8Array {
  const tmp = new Uint8Array(
    bufs.reduce((byteLength, buf) => byteLength + buf.byteLength, 0)
  );
  let byteOffset = 0;
  for (const buf of bufs) {
    tmp.set(buf, byteOffset);
    byteOffset += buf.byteLength;
  }
  return tmp;
}

export function concatArrayBuffers(...bufs: ArrayBuffer[]): Uint8Array {
  return concatBufs(...bufs.map((b) => new Uint8Array(b)));
}

export function dataViewSliceToBuf(
  view: DataView,
  start: number | undefined,
  end: number | undefined
): Uint8Array {
  const viewBufferEnd = view.byteOffset + view.byteLength;
  const viewBufferStart = view.byteOffset;

  let newBufferStart = viewBufferStart;
  if (start! >= 0) {
    newBufferStart = viewBufferStart + start!;
  } else if (start! < 0) {
    newBufferStart = viewBufferEnd + start!;
  }
  let newBufferEnd = viewBufferEnd;
  if (end! >= 0) {
    newBufferEnd = viewBufferStart + end!;
  } else if (end! < 0) {
    newBufferEnd = viewBufferEnd + end!;
  }

  return new Uint8Array(view.buffer.slice(newBufferStart, newBufferEnd));
}

export function dataViewSlice(
  view: DataView,
  start: number | undefined,
  end: number | undefined
) {
  const viewBufferEnd = view.byteOffset + view.byteLength;
  const viewBufferStart = view.byteOffset;

  let newBufferStart = viewBufferStart;
  if (start! >= 0) {
    newBufferStart = viewBufferStart + start!;
  } else if (start! < 0) {
    newBufferStart = viewBufferEnd + start!;
  }
  let newBufferEnd = viewBufferEnd;
  if (end! >= 0) {
    newBufferEnd = viewBufferStart + end!;
  } else if (end! < 0) {
    newBufferEnd = viewBufferEnd + end!;
  }
  if (newBufferStart === viewBufferStart && newBufferEnd === viewBufferEnd) {
    return view;
  }
  const newBufferLength = Math.max(newBufferEnd - newBufferStart, 0);
  return new DataView(view.buffer, newBufferStart, newBufferLength);
}
