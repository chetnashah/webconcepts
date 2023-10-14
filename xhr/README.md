
https://javascript.info/xmlhttprequest

## XHR is an event target

Meaning it fires events

## Example

```js
let xhr = new XMLHttpRequest();

xhr.open('GET', '/article/xmlhttprequest/example/json');

xhr.responseType = 'json';

xhr.send();

// track upload progress
xhr.upload.onprogress = function(event) {
console.log(`Uploaded ${event.loaded} of ${event.total}`);
};

// the response is {"message": "Hello, world!"}
xhr.onload = function() {
  let responseObj = xhr.response;
  alert(responseObj.message); // Hello, world!
};
```

## Properties

1. `timeout` - set timeout in milliseconds
2. `withCredentials` - set to true to enable cookies
3. `responseText` - get the response body as string, ideally fully available after readystate=4
4. `response` -  return response body's content as an ArrayBuffer, Blob, Document, JavaScript object, or a DOMString, depending on the value of `XMLHttpRequest.responseType` which should have been set before firing the request. 
5. `readyState` - get the ready state (0 to 4)
6. `status` - get the response status
7. `responseType` - One of "", `arraybuffer`, `blob`, `document`, `json`, `text`. Can be set by the author, if it does not match with server response, then `response` will be null. Only valid for async requests. **Setting this before send controls auto-parsing of response field**

## Methods

1. `abort()` - abort the request
2. `open(method, url, isAsync)` - open a request
3. `send(data: FormData)` - send the request, data can be undefined or FormData i.e. `xhr.send()` or `xhr.send(formData)`.
4. `setRequestHeader(header, value)` - set a request header
5. `getAllResponseHeaders()` - get all response headers
6. `getResponseHeader(header)` - get a response header

## Events

1. `readystatechange` - fires when the ready state changes
2. `loadstart` - fires when the request starts
3. `progress` - fires when data is being sent or received
4. `abort` - fires when the request is aborted
5. `error` - fires when the request encounters an error
6. `load` - fires when the request completes successfully
7. `timeout` - fires when the request times out
8. `loadend` - fires when the request ends, whether in success or failure
