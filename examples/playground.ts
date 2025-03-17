import fs from 'node:fs/promises';
import {
  ReadableStream,
  type TransformStream,
  WritableStream,
} from 'node:stream/web';
import { EbmlStreamDecoder } from 'konoebml';

async function main() {
  const fileBuffer = await fs.readFile('media/test.webm');
  await new ReadableStream({
    pull(controller) {
      controller.enqueue(fileBuffer);
      controller.close();
    },
  })
    .pipeThrough(new EbmlStreamDecoder() as unknown as TransformStream)
    .pipeTo(new WritableStream({ write: console.log }));
}

main();
