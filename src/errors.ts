import type { EbmlElementType, EbmlTagIdType } from './models/enums';
import type { EbmlTagTrait } from './models/tag-trait';

export class ElementIdVintDataAllZerosError extends Error {
  constructor(value: number | bigint) {
    super(
      `RFC8794 Element ID VINT_DATA can not be all zeros, but got ${value.toString(16)}`
    );
  }
}

export class ElementIdVintDataAllOnesError extends Error {
  constructor(value: number | bigint) {
    super(
      `RFC8794 Element ID VINT_DATA can not be all ones, but got ${value.toString(16)}`
    );
  }
}

export class ElementIdVintDataNotShortestError extends Error {
  constructor(value: number | bigint) {
    super(
      `RFC8794 Element ID VINT_DATA should be shortest, but ${value.toString(16)} is not`
    );
  }
}

export class VintOutOfRangeError extends Error {
  constructor(value: number | bigint) {
    super(
      `RFC8794 VINT_DATA out of range 0 ~ 2^56-1, but got ${value.toString(16)}`
    );
  }
}

export class VintLengthOutOfRangeError extends Error {
  constructor(length: number) {
    super(
      `RFC8794 Vint length out of range, valid vint range is 1 ~ 8 octet, but got ${length}`
    );
  }
}

export class UnsupportLengthForElementTypeError extends Error {
  constructor(type: EbmlElementType, expected: string, found: string | number) {
    super(
      `RFC8794 type ${type} length should be ${expected}, but found ${found}`
    );
  }
}

export class OutOfRangeForElementTypeError extends Error {
  constructor(
    type: EbmlElementType,
    expected: string,
    found: string | number | bigint
  ) {
    super(
      `RFC8794 type ${type} value range should be ${expected}, but found ${found}`
    );
  }
}

export class InconsistentWellKnownEbmlTagTypeError extends Error {
  constructor(id: EbmlTagIdType, type: EbmlElementType) {
    super(
      `Trying to create tag of well-known type "${id.toString(16)}" using content type "${type}" (which is incorrect).  Either pass the correct type or ignore the type parameter to EbmlTag.create()`
    );
  }
}

export class InconsistentOffsetOnDecodingContentError extends Error {
  constructor(tag: EbmlTagTrait, endOffset: number) {
    super(
      `Inconsistent offset on decoding content, startOffset(${tag.startOffset + tag.headerLength}) + contentLength(${tag.contentLength}) != endOffset(${endOffset}) of tag(${JSON.stringify(tag.toDebugRecord())})`
    );
  }
}

export class SizeUnitOutOfSafeIntegerRangeError extends Error {
  constructor(size: number | bigint) {
    super(
      `Size unit ${size.toString(16)} is a valid vint, but out of ecmascript safe integer range`
    );
  }
}

export class UnreachableOrLogicError extends Error {
  constructor(detail: string) {
    super(`Unreachable or Logic Error: ${detail}`);
  }
}

export class AbortReason extends Error {
  isAbortReason = true;

  constructor(reason: string) {
    super(`Aborted: ${reason}`);
  }
}

export class StreamFlushReason extends AbortReason {
  constructor() {
    super('stream flushed');
  }
}

export class EbmlTreeMasterNotMatchError extends Error {
  constructor(tag: EbmlTagTrait) {
    super(
      `start and end of master tag does not match in ebml tree at ${JSON.stringify(tag)}`
    );
  }
}
