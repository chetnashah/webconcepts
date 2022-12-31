

Use http://httpstat.us/ for statuscode testing!

## Used to make api calls

`fetch()` is used as a replacement of xhr calls.

## All options go as second argument

Important properties in options are: `headers`, `body`, `method`, `credentials`, `mode`, `signal`.

```js
let promise = fetch(url, {
  method: "GET", // POST, PUT, DELETE, etc.
  headers: {
    // the content type header value is usually auto-set
    // depending on the request body
    "Content-Type": "text/plain;charset=UTF-8"
  },
  body: undefined // string, FormData, Blob, BufferSource, or URLSearchParams
  referrer: "about:client", // or "" to send no Referer header,
  // or an url from the current origin
  referrerPolicy: "no-referrer-when-downgrade", // no-referrer, origin, same-origin...
  mode: "cors", // same-origin, no-cors
  credentials: "same-origin", // omit, include
  cache: "default", // no-store, reload, no-cache, force-cache, or only-if-cached
  redirect: "follow", // manual, error
  integrity: "", // a hash, like "sha256-abcdef1234567890"
  keepalive: false, // true
  signal: undefined, // AbortController to abort request
  window: window // null
});

```

## Return value and reject cases

The promise resolves to the `Response` object representing the response to your request.

A `fetch()` promise only rejects when a network error is encountered (which is usually when there's a permissions issue or offline or DNS issue or conn-reset). A `fetch()` promise does not reject on HTTP errors (404,500 etc.). Instead, a then() handler must check the Response.ok and/or Response.status properties.

### An example that 500/400 will not reject a fetch promise

```js
var fetch = require('node-fetch');

fetch('http://httpstat.us/500')
.then((res) => {
    return res.text();
})
.then((txt) => {
    console.log('txt = ', txt); // statuscode 4xx/5xx come here - HTTPerrors
})
.catch(err => {
    console.log('err = ', err); // only offline/DNS errors come here - Network errors
});
```

## Use resp.ok for 2xx vs 4xx/5xx range

fetch provides a simple `ok` flag that indicates whether an HTTP response’s status code is in the successful range or not.`ok` is directly available on `response` object without any need for json or text body deserialization.

Some practices also advice to throw an error manually on 4xx/5xx i.e. `!ok` condition, and have a common catch handler for all cases: e.g.
```js
const handleErrors = response => {
  if (!response.ok) { // note that ok checking happens directl
    throw Error(response.statusText);
  }
  return response;
}

fetch("/cars/23")
  .then(handleErrors) // will return json in happy case, will throw error for 4xx/5xx
  .then(response => response.json())
  .then(processData)
  .catch(console.log)
```


### simple use case, GET api, provide url as first argument.

```js
var BASE_URL = "https://jsonplaceholder.typicode.com/posts/1";

var url = new URL(BASE_URL);

fetch(url).then(resp => {
    if(resp.ok){
        resp.json().then((json) => console.log(json));
    }
});
```

Or a shorter version:
```js
fetch('http://example.com/movies.json')
  .then(response => response.json())
  .then(data => console.log(data));
```

## Response Interface

The `Response` object, in turn, does not directly contain the actual JSON response body but is instead a representation of the entire HTTP response. 

So, to extract the JSON body content from the Response object, we use the `json()` method, which returns a second promise that resolves with the result of parsing the response body text as JSON. So we see two levels of promises, one for response and another one fore response json/text/blob.

`Response.body` - Readablestream containing the response.

`Response.ok` - boolean indicating status

`Response.status` - http status

`Response.url`  - url of request

## Response Interface methods

`Response.text()` - Returns a `promise` that resolves with a text representation of the response body.

`Response.json()` - Returns a `promise` that resolves with the result of parsing the response body text as JSON/i.e resolved as native JS objects representing the response body.

`Response.blob()` - Returns a `promise` that resolves with a Blob representation of the response body.

## fetch with options

Remember `fetch(url, optionsObject)`.

```js
// Example POST method implementation:
async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}
```

## behaviors

**fetch() won't send cross-origin cookies unless you set the credentials init option (to include).**

## Cancelling requests with `AbortController`

The AbortController interface represents a controller object that allows you to abort one or more Web requests as and when desired.

You can create a `new AbortController` object using the `AbortController()` constructor. Communicating with a DOM request is done using an `AbortSignal` object.

### Details

## retry


## timeout

