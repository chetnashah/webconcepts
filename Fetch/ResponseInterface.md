
## A Response object represents the response to a request.

A response evolves over time, that is, not all the data is available at once.

## Interface
```
enum ResponseType { 'basic', 'cors', 'default', 'error', 'opaque', 'opaqueredirect' }

dictionary ResponseInit {
    unsigned short status = 200;
    ByteString statusText = "OK";
    HeadersInit headers;
}

Response includes Body;

interface Response {
    
    //constructor
    constructor(optional BodyInit? body = null, optional ResponseInit init = {});
    
    // static methods
    [NewObject] static Response error()
    [NewObject] static Response redirect()
    [NewObject] static Response json(any data, optional ResponseInit init = {})

    // attributes
    readonly attribute boolean ok;
    readonly attribute unsigned short status;
    readonly attribute ByteString statusText;
    readonly attribute Headers headers;
    readonly attribute ResponseType type;
    readonly attribute USVString url;


}
```