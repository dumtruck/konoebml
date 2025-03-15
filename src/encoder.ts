import { Queue, Stack } from 'mnemonist';
import { EbmlTagTrait } from './models/tag-trait';
import { EbmlTagPosition } from './models/enums';
import { EbmlMasterTag } from './models/tag-master';
import { EbmlTreeMasterNotMatchError, UnreachableOrLogicError } from './errors';

export class EbmlEncodeStreamTransformer
  implements Transformer<EbmlTagTrait, ArrayBuffer>
{
  stack = new Stack<[EbmlMasterTag, ArrayBuffer[]]>();
  _writeBuffer = new Queue<ArrayBuffer>();
  _writeBufferTask: Promise<void> | undefined;
  closed = false;

  tryEnqueueToBuffer(...frag: ArrayBuffer[]) {
    const top = this.stack.peek();
    if (top) {
      top[1].push(...frag);
    } else {
      for (const f of frag) {
        this._writeBuffer.enqueue(f);
      }
    }
  }

  waitBufferRelease(
    ctrl: TransformStreamDefaultController<ArrayBuffer>,
    isFlush: boolean
  ) {
    while (this._writeBuffer.size) {
      if (ctrl.desiredSize! <= 0 && !isFlush) {
        break;
      }
      ctrl.enqueue(this._writeBuffer.dequeue());
    }
  }

  // biome-ignore lint/complexity/noExcessiveCognitiveComplexity: <explanation>
  async transform(
    tag: EbmlTagTrait,
    ctrl: TransformStreamDefaultController<ArrayBuffer>
  ) {
    if (!(tag instanceof EbmlTagTrait)) {
      throw new UnreachableOrLogicError('should only accept embl tag but not');
    }

    if (tag instanceof EbmlMasterTag) {
      if (tag.contentLength === Number.POSITIVE_INFINITY) {
        if (tag.position === EbmlTagPosition.Start) {
          this.tryEnqueueToBuffer(...tag.encodeHeader());
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
          this.tryEnqueueToBuffer(...startTag.encodeHeader());
          this.tryEnqueueToBuffer(...fragments);
        }
      }
    } else {
      this.tryEnqueueToBuffer(...tag.encode());
    }
    this.waitBufferRelease(ctrl, false);
  }

  flush(ctrl: TransformStreamDefaultController<ArrayBuffer>) {
    this.waitBufferRelease(ctrl, true);
  }
}

export class EbmlStreamEncoder extends TransformStream<
  EbmlTagTrait,
  ArrayBuffer
> {
  public readonly transformer: EbmlEncodeStreamTransformer;

  constructor() {
    const transformer = new EbmlEncodeStreamTransformer();
    super(transformer);
    this.transformer = transformer;
  }
}
