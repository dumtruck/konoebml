<h1 align="center">
  <img src="./assets/konoebml-512x512.webp" alt="logo" height=180 />
  <br />
  <b>Konoebml</b>
  <div align="center">
    <img src="https://img.shields.io/npm/v/konoebml" alt="version-badge" />
    <img src="https://img.shields.io/badge/status-beta-blue" alt="status-badge" /></div>
</h1>

<p align="center"><b>A modern JavaScript implementation of RFC8794 (EBML). </b></p>

## Note

[EBML][EBML] stands for Extensible Binary Meta-Language and is somewhat of a binary version of XML. It's used for container formats like [WebM][webm] or [MKV][mkv].

This package is serving as a fork with extensive rewrites and enhancements to [ebml-web-stream][ebml-web-stream] and [ebml-stream][ebml-stream], providing:

- support new [ebml_matroska(v4)](https://github.com/cellar-wg/matroska-specification/blob/master/ebml_matroska.xml) while also support [legacy version](https://github.com/pymedusa/Medusa/blob/d99638720355ef047857735876ec37adcb6a94a5/ext/enzyme/parsers/ebml/specs/matroska.xml).
- better [unknown size vint][unknown size vint] support
- bigint support for vint, unsigned and signed int data type
- better type system and type hints that depend on it
- better error types

# Install

Install via NPM:

```bash
npm install konoebml
```

# Usage and Examples

This example reads a media file into memory and decodes it.

```js
import fs from 'node:fs/promises';
import {
  ReadableStream,
  WritableStream,
  type TransformStream,
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
```

**Todo: add more docs and tests**

# State of this project

Parsing and writing should both work. If something is broken, please create [an issue][new-issue].

Any additional feature requests can also be submitted as [an issue][new-issue].

If any well-known tags have special parsing/encoding rules or data structures that aren't implemented, pull requests are welcome!

# License

[MIT](./LICENSE)

# Other Contributors

(in alphabetical order)

* [Austin Blake](https://github.com/austinleroy)
* [Chris Price](https://github.com/chrisprice)
* [Davy Van Deursen](https://github.com/dvdeurse)
* [Ed Markowski](https://github.com/siphontv)
* [Jonathan Sifuentes](https://github.com/jayands)
* [Liam Dyer](https://github.com/Saghen)
* [Manuel Wiedenmann](https://github.com/fsmanuel)
* [Mark Schmale](https://github.com/themasch)
* [Mathias Buus](https://github.com/mafintosh)
* [Max Ogden](https://github.com/maxogden)
* [Oliver Jones](https://github.com/OllieJones)
* [Oliver Walzer](https://github.com/owcd)

[EBML]: http://ebml.sourceforge.net/
[mkv]: http://www.matroska.org/technical/specs/index.html
[webm]: https://www.webmproject.org/
[new-issue]: https://github.com/dumtruck/konoebml/issues/new
[unknown size vint]: https://www.rfc-editor.org/rfc/rfc8794.html#name-unknown-data-size
[ebml-web-stream]: https://github.com/Saghen/ebml-web-stream
[ebml-stream]: https://github.com/austinleroy/node-ebml