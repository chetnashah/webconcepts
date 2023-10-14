
## 4xx and 5xx are considered errors

The error status is available via `err.status`.

Errors from `4xx` and `5xx` tend to also contain response/response body.
This err response is accessible via `err.response`.

## Network error/OS error management

Network failures, timeouts, and other errors that produce no response will contain no `err.status` or `err.response` fields.



## Interfaces

```ts
    // for 4xx and 5xx
    interface ResponseError extends Error {
        status?: number | undefined;
        response?: Response | undefined;
        timeout?: boolean | undefined;
    }

    interface HTTPError extends Error {
        status: number;
        text: string;
        method: string;
        path: string;
    }
```

## Errors thrown by this lib

1. `Parser is unable to parse the response`.
2. `Unsuccessful HTTP response`.
3. `Request has been terminated\nPossible causes: the network is offline, Origin is not allowed by Access-Control-Allow-Origin, the page is being unloaded, etc.`
4. `Warning: .end() was called twice. This is not supported in superagent`
5. `The request has been aborted even before .end() was called.`


## Error events are also available on the Request event emitter

```ts
request.post('/upload')
    .attach('image', 'path/to/tobi.png')
    .on('error', function(err) { // get emitted error here, note: 4xx and 5xx will come here
        // handle your error
    })
    .then(res => {

    });
```