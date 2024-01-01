
HTML has a `Blob Interface`:
Properties are:
1. size
2. type (mime-type)

HTML has a `File Interface` (Extends Blob Interface):
Properties are:
1. size
2. name
3. type (mime-type)

### Where (APIs) can be File/Blob be used?

1. fetch(url, { method: 'POST', body: File/Blob })
2. XMLHttpRequest.send(File/Blob)
3. FormData.append(name, File/Blob), where FormData can be used as body in fetch or XMLHttpRequest
4. FileReader API
5. Web Workers

#### Direct File/Blob usage with fetch request options body

This works because `File` inherits from `Blob`, and `Blob` is one of the permissible `BodyInit` [types defined in the Fetch Standard](https://fetch.spec.whatwg.org/#bodyinit-unions), apart from `FormData` which also allows you to add `File` objects to it.

```js
const myInput = document.getElementById('my-input');

// Later, perhaps in a form 'submit' handler or the input's 'change' handler:
fetch('https://example.com/some_endpoint', {
  method: 'POST',
  body: myInput.files[0],
});
```

#### XHR send method accepts File/Blob

https://w3c.github.io/XMLHttpRequest/Overview.html#the-send()-method

```js
const fileInput = document.querySelector("#fileInput");
const file = fileInput.files;
const xhr = new XMLHttpRequest();
xhr.open("POST", "/upload");
xhr.send(file);
```

#### FormaData.append(name, File/Blob) - usable in both fetch and XHR

XHR + formdata
```js
const fileInput = document.querySelector('#file');
const uploadButton = document.querySelector('#upload');

uploadButton.addEventListener('click', () => {
  const file = fileInput.files[0];
  const formData = new FormData();
  formData.append('file', file);

  const xhr = new XMLHttpRequest();
  xhr.open('POST', '/upload');
  xhr.setRequestHeader('Content-Type', 'multipart/form-data');
  xhr.send(formData);

  xhr.onload = function() {
    if (xhr.status === 200) {
      // Success!
    } else {
      // Error!
    }
  };
});
```

Fetch body holding formdata:
```js
const file = fileInput.files[0];
const formData = new FormData();
formData.append('file', file);

fetch('/upload', {
  method: 'POST',
  body: formData,
})
.then(response => response.json())
.then(data => {
  // Do something with the data
})
.catch(error => {
  // Handle the error
});
```

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

