

## Retries example

```ts
request
    .get('https://example.com/search')
    .retry(2) // or below
    .retry(2, callback)
    .then(finished)
    .catch(err => {
        console.log(err);
    });
```

## Which error codes are re-tried?

1. `ECONNRESET` - Connection reset by peer
2. `ECONNREFUSED` - Connection refused
3. `EPIPE` - Broken pipe
4. `ENOTFOUND` - DNS lookup failed
5. `ETIMEDOUT` - Operation timed out
6. `EAI_AGAIN` - DNS lookup timed out
7. `ENETUNREACH` - Network is unreachable


## Which status codes are retried?

1. `408` - Request Timeout
2. `413` - Payload Too Large
3. `429` - Too Many Requests
4. `500` - Internal Server Error
5. `502` - Bad Gateway
6. `503` - Service Unavailable
7. `504` - Gateway Timeout
8. `521` - Web Server Is Down
9. `522` - Connection Timed Out
10. `524` - A Timeout Occurred

