
## Base functionality for Response Class instances


## ResponseBase Interface

```ts
// public
ResponseBase.prototype.get = (field) => string // get header field value

// private
ResponseBase.prototype._setHeaderProperties = (header) => void // set header properties
ResponseBase.prototype._setStatusProperties = (status) => void // set status properties Set flags such as `.ok` based on `status

```