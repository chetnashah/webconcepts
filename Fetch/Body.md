
##

A body consists of:
1. A `ReadableStream` object
2. A source (`null`, a `bytesequence`, a `Blob object` or `FormData object`), initially `null`.
3. A length

## Body mixin

```
interface mixin Body {
    // ReadableStream
    readonly attribute ReadableStream body;
    
    // stream interpreted ways
    [NewObject] Promise<ArrayBuffer> arrayBuffer()
    [NewObject] Promise<Blob> blob()
    [NewObject] Promise<FormData> formData()
    [NewObject] Promise<any> json()
    [NewObject] Promise<USVString> text()
}
```
