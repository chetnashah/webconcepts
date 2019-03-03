

### Css loader

Resolves css imports and `url()` references, and copies them as string in JS. does not actually do anything to affect browser.

The `css-loader` interprets `@import` and `url()` like `import/require()` and will resolve them.


### styles-loader

Often used in conjunction with css loader,
The style string given by css-loader is picked up by styles-loader
and injected in `<head>` tag as a `<style>` tag in an inline fashion.

Together they are used in following form `import * from 'styles!css!app.css'`,
The loaders are applied from right to left i.e. first css loader is applied followed by styles loader.

### url-loader

A loader for webpack which transforms files into `base64` URIs.
`url-loader` works like `file-loader`, but can return a `DataURL` if the file is smaller than a byte limit.


### file-loader

The `file-loader` resolves `import/require()` on a file into a url and emits the file into the output directory.

```js
// file.js
import img from './file.png';
```


### raw-loader

A loader for webpack that allows importing files as a String.

```js
import txt from './file.txt';
```

### imports-loader

### expose-loader

### gzip-loader

