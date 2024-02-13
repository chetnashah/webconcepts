

## works on top of XHR

## Missing HTTP/2 support for nodejs

works with http2 for browser, but missing http2 support for nodejs.

https://github.com/axios/axios/issues/1175

## Query serialization

Query serialization means converting an object to a string that can be used in a URL.

Query serialization in GET requests can be done in many ways e.g.
1. `arr: [1, 2]` => `arr=1&arr=2`
2. `arr: [1, 2]` => `arr[]=1&arr[]=2`
3. `arr: [1, 2]` => `arr[0]=1&arr[1]=2`
4. `arr: [1, 2]` => `arr=1,2`

Axios uses the first method by default, but it can be changed using `paramsSerializer` option.
