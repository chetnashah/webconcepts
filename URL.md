
##

The URL interface is used to parse, construct, normalize, and encode URLs. It works by providing properties which allow you to easily read and modify the components of a URL.

```js
let m = 'https://developer.mozilla.org';
let a = new URL("/", m);// => 'https://developer.mozilla.org/'
let b = new URL(m);// => 'https://developer.mozilla.org/'
```

