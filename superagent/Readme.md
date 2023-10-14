
## You can call `.end` instead of `.then` to end the request chain

## Example

```ts
request.post('/api/pet')
.send({ name: 'Manny', species: 'cat' })
.set('X-API-Key', 'foobar')
.set('Accept', 'application/json')
.then(res => {
    alert('yay got' + JSON.stringify(res.body))
}).catch(err => {
    // err object made by superagent, check ErrorHandling.md
    // err.message, err.response, err.status for 4xx,5xx (http errors)
    // only err.message for network errors
});
```