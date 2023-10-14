

## Methods

```ts
RequestBase.prototype.clearTimeout
RequestBase.prototype.parse // set parser
RequestBase.prototype.timeout
RequestBase.prototype.retry = (count, shouldRetryFn) => this // set count and set shouldRetryFn to consult if should retry
RequestBase.prototype.redirects
RequestBase.prototype.serialize
RequestBase.prototype._shouldRetry = (err, res) => boolean // condition for retry, also consults shouldRetryFn set by user on each retry attempt 
RequestBase.prototype._retry = () => void // actual retry process
RequestBase.prototype.then // Promise support
RequestBase.prototype.catch // Promise support
RequestBase.prototype.use // Extension
RequestBase.prototype.ok = (callback) => {}
RequestBase.prototype.get
RequestBase.prototype.set = (field, value) => this
RequestBase.prototype.unset = (field) => this
RequestBase.prototype.withCredentials = (on) => this
RequestBase.prototype.redirects = (n) => this
RequestBase.prototype._auth =  (user, pass, options, base64Encoder) => this
RequestBase.prototype.maxResponseSize = (n) => this // max size of buffered response body
RequestBase.prototype.toJSON = () => {method,url,data}// describing method, url, and data of this request
RequestBase.prototype.send = (data) => this // Send object `data` to be sent in the request, defaulting the `.type()` to "json" when an object is given
RequestBase.prototype._timeoutError =  (reason, timeout, errno) => void // callback invoked for timeout error with reason
RequestBase.prototype._setTimeouts = () => {}
RequestBase.prototype._finalizeQueryString = () => {}
```
