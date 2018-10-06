
HTML has a `Blob Interface`:
Properties are:
1. size
2. type (mime-type)

HTML has a `File Interface` (Extends Blob Interface):
Properties are:
1. size
2. name
3. type (mime-type)

### Getting hold of the File Interface

Consider a `form` with `<input type="file">`,
Get the inputEl by using
`var inputEl = document.querySelector("input[type=file]");`

Typically inputEl will have a `FileList` interface with it which is just
a list of `files`.

We can get hold of the file with following:
```ts
var givenFile: File = inputEl.files[0];
```

### The Blob Constructor

```js
var aBlob = new Blob(array,options);
```
Here array is an Array of `ArrayBuffer`, `ArrayBufferView`, `Blob`,
`DomString` objects or mix of any such objects.
An example of DomString is `<a id="a"><b id="b">hey</b></a>`;

### Constructing Blob from a TypedArray

First argument in Blob constructor
```js
var typedArray = GetTypedArraySomehow();// e.g. by Uint8Array
var blob = new Blob([typedArray], { type: 'application/pdf'});// use proper mime-type
```

The identity of the blob is in its reference.

### Extracting data from a blob

```js
var reader = new FileReader();
reader.addEventListener('loadend', function(){
    //reader.result contains contents of blob as typed array
});
reader.readAsArrayBuffer(blob);
```

### TypedArray

A TypedArray object describes an array-like view of underlying binary data buffer.
There is no global property named TypedArray nor a TypedArray constructor,
but the interface is made by any of the other constructors like-(Int8Array etc.)
```
const ta1 = new Int8Array(8);
```
Important properties of `TypedArray` Interface:
1. buffer : returns the `ArrayBuffer` referenced by the typed array. Fixed at construction time and thus read only.
2. byteLength : Returns the length in bytes of the typed array. Fixed at construction time and read only.
3. length: number of elements held in typed array.
4. name: returns name of the constructor e.g. `Uint8Array`.

### ArrayBufferView

`ArrayBufferView` is a helper type representing any of the following JavaScript TypedArray types:

1. Int8Array,
2. Uint8Array,
3. Uint8ClampedArray,
4. Int16Array,
5. Uint16Array,
6. Int32Array,
7. Uint32Array,
8. Float32Array,
9. Float64Array or
10. DataView.

