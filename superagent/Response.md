
## Response Class builds on top of ResponseBase

To refer to ResponseBase refer: [ResponseBase.md](./ResponseBase.md)

Response class implementation lies here
https://github.com/ladjs/superagent/blob/master/src/client.js#L306

**Response** instances are not usually directly accessible, but only in `end` callbacks or `then` handlers.


## Exposed API via factory function `request` objects static property named `Response`

```ts
request.Response = Response;
```

## Response class State

```ts
function Response(request_) {// Response has a dependency on Request instance that started it!
  this.req = request_;// response always has access to Request instance that requested it!
  this.xhr = this.req.xhr;
  // responseText is accessible only if responseType is '' or 'text' and on older browsers
  this.text = // ...
  this.statusText = this.req.xhr.statusText;
  this.headers = parseHeader(this.xhr.getAllResponseHeaders());
  this.header = this.headers;
  if (this.text === null && request_._responseType) {
    this.body = this.xhr.response;
  } else {
    this.body =
      this.req.method === 'HEAD'
        ? null
        : this._parseBody(this.text ? this.text : this.xhr.response);
  }
```

## Response class Prototype methods

```ts
// public APIs
Response.prototype.toError = () => Error // Return an `Error` representative of this response, contains status, method url

// private APIs
Response.prototype._parseBody = (string_) => mixed // parse given string

```

## Response interface

```ts
    interface Response {
        accepted: boolean;// 202 == status
        badRequest: boolean; // 400 == status
        body: any; // parsed response body based on Content-Type
        charset: string;
        clientError: boolean;// 4xx == status
        error: false | HTTPError;
        files: any;
        forbidden: boolean;// 403 == status
        get(header: string): string;
        get(header: "Set-Cookie"): string[];
        header: any;
        headers: any;
        info: boolean; // 1xx == status
        links: Record<string, string>;
        noContent: boolean;// 204 == status || 1223 == status
        notAcceptable: boolean;// 406 == status
        notFound: boolean;// 404 == status
        ok: boolean;// 2xx == status
        redirect: boolean;
        serverError: boolean; // 5xx
        status: number;
        statusCode: number;
        statusType: number;
        text: string; // unparsed response body string
        type: string; // Content-type
        unauthorized: boolean; // 401 == status
        xhr: any;
        redirects: string[];
    }

```