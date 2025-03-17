import { Queue } from 'mnemonist';
import type { FileDataViewController } from './adapters';
import type {
  DecodeContentCollectChildPredicate,
  EbmlTagTrait,
} from './models/tag-trait';
import { decodeEbmlContent } from './decode-utils';
import { StreamFlushReason, UnreachableOrLogicError } from './errors';
import { dataViewSlice } from './tools';
import type { EbmlTagType } from './models/tag';

export type EbmlStreamDecoderChunkType =
  | Uint8Array
  | ArrayBuffer
  | ArrayBufferLike;

export interface EbmlDecodeStreamTransformerOptions {
  collectChild?: DecodeContentCollectChildPredicate;
  streamStartOffset?: number;
}

export class EbmlDecodeStreamTransformer<
  E extends EbmlTagType | EbmlTagTrait = EbmlTagType,
> implements Transformer<EbmlStreamDecoderChunkType, E>, FileDataViewController
{
  private _offset = 0;
  private _buffer: Uint8Array = new Uint8Array(0);
  private _requests: Queue<
    [number, number, (view: DataView) => void, (err: Error) => void]
  > = new Queue();
  private _tickIdleCallback: VoidFunction | undefined;
  private _currentTask: Promise<void> | undefined;
  private _writeBuffer = new Queue<EbmlTagTrait>();
  public readonly options: EbmlDecodeStreamTransformerOptions;

  constructor(options: EbmlDecodeStreamTransformerOptions = {}) {
    this.options = options;
  }

  public getBuffer(): Uint8Array {
    return this._buffer;
  }

  public getOffset(): number {
    return this._offset;
  }

  public seek(nextOffset: number): number {
    const oldOffset = this._offset;

    if (this._requests.size > 0) {
      throw new UnreachableOrLogicError(
        'sequential transformer should not seek before all read requests done'
      );
    }
    if (nextOffset < oldOffset) {
      throw new UnreachableOrLogicError(
        'sequential transformer should not seek to previous offset'
      );
    }

    this._buffer = this._buffer.slice(nextOffset - oldOffset);
    this._offset = nextOffset;

    return nextOffset;
  }

  public async read(
    reqStart: number,
    reqLength = 0,
    exactLength = false
  ): Promise<DataView> {
    const bufferStart = this._offset;
    const bufferEnd = bufferStart + this._buffer.byteLength;
    const reqEnd = reqStart + reqLength;

    if (reqStart < bufferStart) {
      throw new UnreachableOrLogicError(
        'sequential transformer should not read before current offset'
      );
    }
    let view: DataView;
    if (bufferEnd >= reqEnd) {
      view = new DataView(this._buffer.buffer, reqStart - bufferStart);
    } else {
      view = await new Promise<DataView>((resolve, reject) => {
        this._requests.enqueue([reqStart, reqEnd, resolve, reject]);
        this.notifyIdle();
      });
    }

    view = exactLength ? dataViewSlice(view, 0, reqLength) : view;

    return view;
  }

  public async peek(offset: number): Promise<DataView | null> {
    try {
      return await this.read(offset, 1);
    } catch (e) {
      if (e instanceof StreamFlushReason) {
        return null;
      }
      throw e;
    }
  }

  private handleRequests() {
    const bufferStart = this._offset;
    const bufferEnd = bufferStart + this._buffer.byteLength;

    let handleCounts = this._requests.size;
    while (handleCounts > 0) {
      const req = this._requests.dequeue();
      if (!req) {
        break;
      }
      const [reqStart, reqEnd, resolve, _] = req;
      if (reqStart < bufferStart) {
        throw new UnreachableOrLogicError(
          'sequential transformer should not read before current offset'
        );
      }
      if (bufferEnd >= reqEnd) {
        resolve(new DataView(this._buffer.buffer, reqStart - bufferStart));
      } else {
        this.notifyIdle();
        this._requests.enqueue(req);
      }
      handleCounts--;
    }
  }

  private cancelRequests() {
    while (true) {
      const req = this._requests.dequeue();
      if (!req) {
        break;
      }
      const [_reqStart, _reqEnd, _resolve, reject] = req;
      reject(new StreamFlushReason());
    }
  }

  private notifyIdle() {
    if (this._tickIdleCallback) {
      this._tickIdleCallback();
    }
  }

  private tryEnqueueToBuffer(item: EbmlTagTrait) {
    this._writeBuffer.enqueue(item);
  }

  private waitBufferRelease(
    ctrl: TransformStreamDefaultController<E>,
    isFlush: boolean
  ) {
    while (this._writeBuffer.size) {
      if (ctrl.desiredSize! <= 0 && !isFlush) {
        break;
      }
      ctrl.enqueue(this._writeBuffer.dequeue() as unknown as E);
    }
  }

  private async tick(
    ctrl: TransformStreamDefaultController<E>,
    isFlush: boolean
  ) {
    const waitIdle = new Promise<void>((resolve) => {
      this._tickIdleCallback = () => {
        resolve();
        this._tickIdleCallback = undefined;
      };
    });

    if (isFlush) {
      this.cancelRequests();
    } else {
      this.handleRequests();
    }

    if (!this._currentTask && !isFlush) {
      const decode = async () => {
        try {
          for await (const tag of decodeEbmlContent({
            collectChild: this.options.collectChild,
            dataViewController: this,
          })) {
            this.tryEnqueueToBuffer(tag);
          }
          this._currentTask = undefined;
        } catch (err) {
          if (!(err instanceof StreamFlushReason)) {
            ctrl.error(err);
          }
        }
      };
      this._currentTask = decode();
    }

    await Promise.race([this._currentTask, waitIdle]);
    this.waitBufferRelease(ctrl, isFlush);
  }

  async start(ctrl: TransformStreamDefaultController<E>) {
    this._offset = this.options.streamStartOffset ?? 0;
    this._buffer = new Uint8Array(0);
    this._requests.clear();
    this._tickIdleCallback = undefined;
    this._currentTask = undefined;
    await this.tick(ctrl, false);
  }

  async transform(
    chunk: EbmlStreamDecoderChunkType,
    ctrl: TransformStreamDefaultController<E>
  ): Promise<void> {
    if (chunk.byteLength === 0) {
      return;
    }
    const newBuffer = new Uint8Array(
      this._buffer.byteLength + chunk.byteLength
    );

    newBuffer.set(this._buffer, 0);
    newBuffer.set(
      chunk instanceof Uint8Array ? chunk : new Uint8Array(chunk),
      this._buffer.byteLength
    );
    this._buffer = newBuffer;

    await this.tick(ctrl, false);
  }

  async flush(ctrl: TransformStreamDefaultController<E>) {
    await this.tick(ctrl, true);
  }
}

export interface EbmlStreamDecoderOptions
  extends EbmlDecodeStreamTransformerOptions {}

export class EbmlStreamDecoder<
  E extends EbmlTagType | EbmlTagTrait = EbmlTagType,
> extends TransformStream<EbmlStreamDecoderChunkType, E> {
  public readonly transformer: EbmlDecodeStreamTransformer<E>;

  constructor(options: EbmlStreamDecoderOptions = {}) {
    const transformer = new EbmlDecodeStreamTransformer<E>(options);
    super(transformer);
    this.transformer = transformer;
  }
}
