import { EbmlTagPosition } from './enums';
import { EbmlTagIdEnum, type EbmlTagIdType } from './enums';
import type { EbmlElementType } from './enums';
import { hexStringToBuf, UNKNOWN_SIZE_VINT_BUF, writeVint } from '../tools';
import type { FileDataViewController } from '../adapters';
import { InconsistentOffsetOnDecodingContentError } from '../errors';
import type { EbmlMasterTag } from './tag-master';

export interface CreateEbmlTagOptions {
  id: EbmlTagIdType;
  type?: EbmlElementType;
  position?: EbmlTagPosition;
  headerLength: number;
  contentLength: number;
  startOffset: number;
  endOffset?: number;
  parent?: EbmlTagTrait;
}

export type DecodeContentCollectChildPredicate =
  | boolean
  | ((child: EbmlTagTrait, parent: EbmlMasterTag) => boolean);

export interface DecodeContentOptions {
  collectChild?: DecodeContentCollectChildPredicate;
  dataViewController: FileDataViewController;
}

export abstract class EbmlTagTrait {
  /**
   * The id of the EBML tag.
   * In most documentation this number is in hexadecimal format
   */
  id: EbmlTagIdType;
  /**
   * The data type of the EBML tag
   */
  type?: EbmlElementType;
  /**
   * The position of this EBML tag.
   * Currently, one of "Start", "Content", or "End".
   * "Start" and "End" only for Master type
   */
  position: EbmlTagPosition;
  /**
   * Size vint length + tag vint length
   */
  headerLength: number;
  /**
   * Start offset relative to context (stream or file) start
   */
  startOffset: number;
  /**
   * Parent node
   */
  parent?: EbmlTagTrait;

  /**
   * Content length in ebml data
   * Return Number.POSITIVE_INFINITY as "unknown"
   */
  private _contentLength: number;
  /**
   * Caculated end offset when
   */
  private _endOffset?: number;

  constructor(options: CreateEbmlTagOptions) {
    this.id = options.id;
    this.type = options.type;
    this.position = options.position ?? EbmlTagPosition.Content;
    this.parent = options.parent;
    this.startOffset = options.startOffset;
    this.headerLength = options.headerLength;
    this._contentLength = options.contentLength;
    this._endOffset = options.endOffset;
  }

  public set contentLength(value: number) {
    this._contentLength = value;
  }

  /**
   * After caculated or known, manually set endOffset
   */
  public set endOffset(offset: number) {
    this._endOffset = offset;
  }

  /**
   * End offset relative to context (stream or file) start
   * Calcalate from self _contentLength and parent end offset
   * Return Number.POSITIVE_INFINITY as "unknown"
   */
  public get endOffset(): number {
    if (this._endOffset) {
      return this._endOffset;
    }
    if (this._contentLength === Number.POSITIVE_INFINITY) {
      return this.parent?.endOffset ?? Number.POSITIVE_INFINITY;
    }
    return this.startOffset + this.headerLength + this._contentLength;
  }

  /**
   * Header length + Content Length
   * Calcalate from self _contentLength and parent end offset
   * Return Number.POSITIVE_INFINITY as "unknown"
   */
  public get totalLength(): number {
    return this.endOffset - this.startOffset;
  }

  /**
   * Content Length
   * Calcalate from self _contentLength and parent end offset
   * Return Number.POSITIVE_INFINITY as "unknown"
   */
  public get contentLength(): number {
    return this.totalLength - this.headerLength;
  }

  protected abstract encodeContent(): Generator<Uint8Array, void, unknown>;

  /**
   * Deep traversal and parse all descendants then yield as AsyncGenerator
   * @param controller DataView controller, simulate async filesystem file
   */
  protected abstract decodeContentImpl(
    options: DecodeContentOptions
  ): AsyncGenerator<EbmlTagTrait, void, unknown>;

  /**
   * Wrap of abstract decode content impl function, add before and after lifecircle check
   * @param controller DataView controller, simulate async filesystem file
   * @returns Deep traversal async iterators of all descendants
   */
  public async *decodeContent(
    options: DecodeContentOptions
  ): AsyncGenerator<EbmlTagTrait, void, unknown> {
    const controller = options.dataViewController;
    if (this.contentLength === 0 || this.position === EbmlTagPosition.Start) {
      return;
    }
    const startOffset = controller.getOffset();
    for await (const tag of this.decodeContentImpl(options)) {
      yield tag;
    }
    const endOffset = controller.getOffset();
    if (
      startOffset + this.contentLength !== endOffset &&
      this.contentLength !== Number.POSITIVE_INFINITY
    ) {
      throw new InconsistentOffsetOnDecodingContentError(this, endOffset);
    }
  }

  private getTagDeclaration(): Uint8Array {
    let tagHex = this.id.toString(16);
    if (tagHex.length % 2 !== 0) {
      tagHex = `0${tagHex}`;
    }
    return hexStringToBuf(tagHex);
  }

  public *encodeHeader(): Generator<Uint8Array, void, unknown> {
    const tagEncoded = this.getTagDeclaration();
    yield tagEncoded;
    if (this._contentLength === Number.POSITIVE_INFINITY) {
      const mayBeSizeLength = this.headerLength - tagEncoded.byteLength;
      if (mayBeSizeLength > 0 && mayBeSizeLength <= 8) {
        yield UNKNOWN_SIZE_VINT_BUF[mayBeSizeLength];
      } else {
        yield UNKNOWN_SIZE_VINT_BUF[2];
      }
    } else {
      yield writeVint(this._contentLength);
    }
  }

  public *encode(): Generator<Uint8Array, void, unknown> {
    if (this._contentLength === Number.POSITIVE_INFINITY) {
      yield* this.encodeHeader();
      for (const part of this.encodeContent()) {
        yield part;
      }
    } else {
      let size = 0;
      const parts: Uint8Array[] = [];
      for (const part of this.encodeContent()) {
        parts.push(part);
        size += part.byteLength;
      }
      this._contentLength = size;
      yield* this.encodeHeader();
      for (const part of parts) {
        yield part;
      }
    }
  }

  public toDebugRecord(): Record<string, any> {
    return {
      id: EbmlTagIdEnum[this.id as any] || this.id,
      type: this.type,
      position: EbmlTagPosition[this.position],
      contentLength: this.contentLength,
      headerLength: this.headerLength,
      startOffset: this.startOffset,
      endOffset: this.endOffset,
    };
  }
}
