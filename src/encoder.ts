import { Stack } from 'mnemonist';
import { EbmlTreeMasterNotMatchError, UnreachableOrLogicError } from './errors';
import { EbmlTagPosition } from './models/enums';
import type { EbmlTagType } from './models/tag';
import { EbmlMasterTag } from './models/tag-master';
import { EbmlTagTrait } from './models/tag-trait';

export interface EbmlEncodeStreamTransformerBackpressure {
  /**
   * @default true
   */
  enabled?: boolean;
  /**
   * @default () => Promise.resolve()
   */
  eventLoop?: () => Promise<void>;
  /**
   * @default 'byte-length'
   */
  queuingStrategy?: 'byte-length' | 'count';
}

export interface EbmlEncodeStreamTransformerOptions {
  backpressure?: EbmlEncodeStreamTransformerBackpressure;
}

export class EbmlEncodeStreamTransformer
  implements Transformer<EbmlTagTrait | EbmlTagType, Uint8Array>
{
  stack = new Stack<[EbmlMasterTag, Uint8Array[]]>();
  closed = false;
  private _initWatermark = 0;
  public backpressure: Required<EbmlEncodeStreamTransformerBackpressure>;
  public readonly options: EbmlEncodeStreamTransformerOptions;

  constructor(options: EbmlEncodeStreamTransformerOptions = {}) {
    this.options = options;
    this.backpressure = Object.assign(
      {
        enabled: true,
        eventLoop: () => Promise.resolve(),
        queuingStrategy: 'byte-length',
      },
      options.backpressure ?? {}
    );
  }

  async tryEnqueueToController(
    ctrl: TransformStreamDefaultController<Uint8Array>,
    ...frag: Uint8Array[]
  ) {
    const top = this.stack.peek();
    if (top) {
      top[1].push(...frag);
    } else if (this.backpressure.enabled) {
      const eventLoop = this.backpressure.eventLoop;
      let i = 0;
      while (i < frag.length) {
        if (ctrl.desiredSize! < this._initWatermark) {
          await eventLoop();
        } else {
          ctrl.enqueue(frag[i]);
          i++;
        }
      }
    } else {
      let i = 0;
      while (i < frag.length) {
        ctrl.enqueue(frag[i]);
        i++;
      }
    }
  }

  start(ctrl: TransformStreamDefaultController<Uint8Array>) {
    this._initWatermark = ctrl.desiredSize ?? 0;
  }

  // biome-ignore lint/complexity/noExcessiveCognitiveComplexity: <explanation>
  async transform(
    tag: EbmlTagTrait | EbmlTagType,
    ctrl: TransformStreamDefaultController<Uint8Array>
  ) {
    if (!(tag instanceof EbmlTagTrait)) {
      throw new UnreachableOrLogicError('should only accept embl tag but not');
    }

    if (tag instanceof EbmlMasterTag) {
      if (tag.contentLength === Number.POSITIVE_INFINITY) {
        if (tag.position === EbmlTagPosition.Start) {
          await this.tryEnqueueToController(ctrl, ...tag.encodeHeader());
        }
      } else {
        // biome-ignore lint/style/useCollapsedElseIf: <explanation>
        if (tag.position === EbmlTagPosition.Start) {
          this.stack.push([tag, []]);
        } else {
          const pop = this.stack.pop();
          if (!pop) {
            throw new EbmlTreeMasterNotMatchError(tag);
          }
          const [startTag, fragments] = pop;
          const size = fragments.reduce(
            (acc, curr) => acc + curr.byteLength,
            0
          );
          startTag.contentLength = size;
          await this.tryEnqueueToController(ctrl, ...startTag.encodeHeader());
          await this.tryEnqueueToController(ctrl, ...fragments);
        }
      }
    } else {
      await this.tryEnqueueToController(ctrl, ...tag.encode());
    }
  }
}

export interface EbmlStreamEncoderOptions
  extends EbmlEncodeStreamTransformerOptions {}

export class EbmlStreamEncoder extends TransformStream<
  EbmlTagTrait | EbmlTagType,
  Uint8Array
> {
  public readonly transformer: EbmlEncodeStreamTransformer;

  constructor(options: EbmlStreamEncoderOptions = {}) {
    const transformer = new EbmlEncodeStreamTransformer(options);
    const queuingStrategy = transformer.backpressure.queuingStrategy;
    const inputQueuingStrategySize =
      queuingStrategy === 'count'
        ? (a: EbmlTagTrait | EbmlTagType) =>
            a?.countQueuingSize >= 0 ? a.countQueuingSize : 1
        : (a: EbmlTagTrait | EbmlTagType) =>
            a?.byteLengthQueuingSize >= 0 ? a.byteLengthQueuingSize : 1;
    super(transformer, { size: inputQueuingStrategySize });
    this.transformer = transformer;
  }
}
