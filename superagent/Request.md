
## Top level API `function request(method,url)` creates `Request` instances

**request** is a function that creates a `Request` instance. It is also the default export of the library.

For browser/client, refer https://github.com/ladjs/superagent/blob/master/src/client.js

FOr nodejs impl of Request/request, refer `node/index.js` here: https://github.com/ladjs/superagent/blob/master/src/node/index.js

```ts
// essentially a factory for creating `Request` instances
function request(method, url) {
  // callback
  if (typeof url === 'function') {
    return new exports.Request('GET', method).end(url);
  }

  // url first
  if (arguments.length === 1) {
    return new exports.Request('GET', method);
  }

  return new exports.Request(method, url);
}
```

## API Chaining

May functions return `this` to ease the API chaining part.

## Request builds on top of RequestBase

See [RequestBase.md](./RequestBase.md) for more details.

## State

```ts
// browser class Request extends RequestBase
function Request(method, url) {
  // ONLY ONE of the below two should be set
  this._data = null;// for normal urlformencoded
  this._formData = null;// for multipart/form-data


  const self = this;
  this._query = this._query || [];
  this.method = method;
  this.url = url;
  this.header = {}; // preserves header name case
  this._header = {}; // coerces header names to lowercase
  this._timer = null;
  this._responseTimeoutTimer = null;
  this._uploadTimeoutTimer = null;
}
```

## Browser Request prototype methods

```ts
Request.prototype.attach = (field, file, options) => this
Request.prototype._getFormData = () => FormData
Request.prototype.attach = () => (field, file, options) => this // add file to FormData
Request.prototype.agent = (agent) => this // gets/sets the agent
Request.prototype.lookup = (lookupFn) => this // gets/sets the custom dns lookup fn
Request.prototype.type = (type) => this // set content-type header
Request.prototype.query = (kvstring) => this // set query string
Request.prototype.write = (data, encoding) => this // write raw data to socket
Request.prototype.buffer = (val) => this // enable/disable buffering
Request.prototype._redirect =  (res) => this // redirect to this.url
Request.prototype.auth = (user, pass, options) => this // set Authorization with given user and pass
Request.prototype.request = () => OutgoingMessage // get the underlying OutgoingMessage
Request.prototype.callback = (err, res) => void // short circuit if retries can be done, otherwise Invoke this.callback(err, res) 
Request.prototype.end = (fnCb) => void // Initiate request, call this._end(), invoking store this.callback =fn,which will be eventually be called with res i.e. 
Request.prototype._end = () => void // setupp xhr with listeners, timeouts and open + send request.
```

## Request interface

```ts
    interface Request extends Promise<Response> {
        abort(): void;
        accept(type: string): this;
        attach(
            field: string,
            file: MultipartValueSingle,
            options?: string | { filename?: string | undefined; contentType?: string | undefined },
        ): this;
        auth(user: string, pass: string, options?: { type: "basic" | "auto" }): this;
        auth(token: string, options: { type: "bearer" }): this;
        buffer(val?: boolean): this;
        ca(cert: string | string[] | Buffer | Buffer[]): this;
        cert(cert: string | string[] | Buffer | Buffer[]): this;
        clearTimeout(): this;
        connect(override: string | { [hostname: string]: false | string | { host: string; port: number } }): this;
        disableTLSCerts(): this;
        end(callback?: CallbackHandler): void;
        field(name: string, val: MultipartValue): this;
        field(fields: { [fieldName: string]: MultipartValue }): this;
        get(field: string): string;
        http2(enable?: boolean): this;
        key(cert: string | string[] | Buffer | Buffer[]): this;
        ok(callback: (res: Response) => boolean): this;
        on(name: "error", handler: (err: any) => void): this;
        on(name: "progress", handler: (event: ProgressEvent) => void): this;
        on(name: "response", handler: (response: Response) => void): this;
        on(name: string, handler: (event: any) => void): this;
        parse(parser: Parser): this;
        part(): this;
        pfx(cert: string | string[] | Buffer | Buffer[] | { pfx: string | Buffer; passphrase: string }): this;
        pipe(stream: NodeJS.WritableStream, options?: object): stream.Writable;
        query(val: object | string): this;
        redirects(n: number): this;
        responseType(type: string): this;
        retry(count?: number, callback?: CallbackHandler): this;
        send(data?: string | object): this;
        serialize(serializer: Serializer): this;
        set(field: object): this;
        set(field: string, val: string): this;
        set(field: "Cookie", val: string[]): this;
        timeout(ms: number | { deadline?: number | undefined; response?: number | undefined }): this;
        trustLocalhost(enabled?: boolean): this;
        type(val: string): this;
        unset(field: string): this;
        use(fn: Plugin): this;
        withCredentials(on?: boolean): this;
        write(data: string | Buffer, encoding?: string): boolean;
        maxResponseSize(size: number): this;
    }
```