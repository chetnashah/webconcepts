

## You can create multiple instances of Axios each with different Config


### DefalultConfig + GlobalConfig and also have requestConfig

`RequestConfig` is specific to request, and Default/global config can be set per instance of Axios.

## Interceptors and Transformers

request transformers and request interceptors get chance to run before request is fired.

### RequestInterceptors

Request interceptors are called in the order they are added using `axios.interceptors.request.use`

### RequestTransformers

Request transformers are called in the order they are added using `axios.defaults.transformRequest.push`

### ResponseTransformers

Response Transformers are called in the order they are added using `axios.defaults.transformResponse.push`

### ResponseInterceptors

Response Interceptors are called in the order they are added using `axios.interceptors.response.use`


## Adapters

Adapters are used to make the actual network request (like node http or browser xhr or any other kind of request to OS).
They can do either `xhr` or use any other protocol http2, http3, ftp whatever. 

The adapter runs between request being fired and response being received.