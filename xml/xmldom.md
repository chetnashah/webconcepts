# `xmldom` (or `@xmldom/xmldom`)  
XML ↔ DOM ↔ string utility for Node.js & browsers
-------------------------------------------------

`xmldom` is a tiny implementation of the W3C DOM Level 2 Core + DOMParser + XMLSerializer that works in **pure JavaScript**.  
It lets you:

* turn an XML string/stream into a DOM tree  
* create/change DOM nodes programmatically  
* turn the DOM back into an XML string  
* run in Node, Deno, Bun, or the browser without any native bindings

Think of it as the XML-equivalent of `jsdom`, but limited to the XML side of the API.

> Since 2022 the actively-maintained package name is **`@xmldom/xmldom`**.  
> The unscoped `xmldom` package is frozen and only receives security fixes.

---

## Installation

```bash
# Modern, recommended
npm i @xmldom/xmldom

# Legacy (same API, fewer fixes)
npm i xmldom
```

```js
// common-js
const { DOMParser, XMLSerializer } = require('@xmldom/xmldom');

// ESM / TypeScript
import { DOMParser, XMLSerializer } from '@xmldom/xmldom';
```

---

## 1. Parse an XML string

```js
const xml = `
<catalog>
  <book id="bk101">
    <author>Gambardella, Matthew</author>
    <title>XML Developer's Guide</title>
  </book>
</catalog>`;

const doc = new DOMParser().parseFromString(xml, 'text/xml');

// read
const title = doc.getElementsByTagName('title')[0].textContent;
console.log(title);           // → XML Developer's Guide
```

### Error handling

```js
const broken = '<foo>';
const parsed = new DOMParser({
  errorHandler: { warning: null }  // silence warnings
}).parseFromString(broken, 'text/xml');

console.log(parsed.getElementsByTagName('parsererror')[0]?.textContent);
```

---

## 2. Create / modify nodes

```js
// add <year> element under <book>
const book = doc.getElementById('bk101');
const yearNode   = doc.createElement('year');
yearNode.appendChild(doc.createTextNode('2025'));
book.appendChild(yearNode);

// change an attribute
book.setAttribute('category', 'tech');
```

---

## 3. Serialize back to text (pretty print)

```js
const xmlText = new XMLSerializer().serializeToString(doc);
console.log(xmlText);
/*
<catalog><book id="bk101" category="tech">
  <author>Gambardella, Matthew</author>
  <title>XML Developer's Guide</title>
  <year>2025</year>
</book></catalog>
*/
```

---

## 4. Combine with XPath

`xmldom` gives you the DOM; add the `xpath` package to query it.

```bash
npm i xpath
```

```js
import xpath from 'xpath';

const select = xpath.useNamespaces({ c: 'http://example.com' }); // optional
const authors = select('//author/text()', doc);
console.log(authors.map(n => n.nodeValue));  // [ 'Gambardella, Matthew' ]
```

---

## 5. Streaming (large files)

```js
import fs from 'node:fs';
import { DOMParser } from '@xmldom/xmldom';

const stream = fs.createReadStream('huge.xml', 'utf8');
let xmlBuf = '';

stream.on('data', chunk => xmlBuf += chunk);
stream.on('end', () => {
  const dom = new DOMParser().parseFromString(xmlBuf);
  /* … */
});
```

---

## 6. TypeScript typings

The package is written in TS and ships with its own types.

```ts
import { DOMParser, XMLSerializer, Node } from '@xmldom/xmldom';

function mutate(doc: Document): void { /* … */ }
```

---

## 7. Security notes

1. XXE / external entity expansion is **disabled by default**.  
2. Do not pass untrusted XML to powershellish `<!DOCTYPE … [ SYSTEM "file:///etc/passwd" ]>` unless you know what you’re doing.  
3. Always keep the package updated (`@xmldom/xmldom` >0.8).

---

## When *not* to use it

* Need JSON output? Use `xml2js`, `fast-xml-parser`, etc.  
* Need HTML5 quirks mode or a virtual DOM for a headless browser? Use `jsdom` or `linkedom`.  
* Need high-throughput SAX? Use `sax` or `fast-xml-parser` (stream mode).

---

### TL;DR

`xmldom` is the quickest way to get **browser-style DOMParser & XMLSerializer** inside Node. Parse, inspect, edit, and output XML with the familiar DOM API in just a few lines of code.