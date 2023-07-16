
## SuperAgent

Lib to make network requests.

**Interesting part is request is only invoked when we register a `then` handler**

Till then, you can `attach` or add formData

```js
      request.post('/user')
        .send('name=tj')
        .send('pet=tobi')
        .attach('image1', blobOrFile)
        .then(callback, errorCallback);

```

https://ladjs.github.io/superagent/#request-basics