

### Buffer

Prior to the introduction of TypedArray in ECMAScript 2015 (ES6), the JavaScript language had no mechanism for reading or manipulating streams of binary data. The Buffer class was introduced as part of the Node.js API to make it possible to interact with octet streams in the context of things like TCP streams and file system operations.

Now that TypedArray has been added in ES6, the Buffer class implements the Uint8Array API in a manner that is more optimized and suitable for Node.js' use cases.

### EventEmitter

Has methods .on(listener) -> to register listeners,
and .emit(eventName) -> synchronously calls all registered listeners.


### Process

The process object is a global that provides information about, and control over, the current Node.js process. As a global, it is always available to Node.js applications without using require().
Process object is and instance of EventEmitter.

### Hiding secrets in Node appp

Use `dotenv` module. Usually we make a `.env` file a root of project and put it in gitignore so that our secrets are not commited to public repo.
At runtime all the secrets that were put into `.env` are available in `process.env.secret`.


### Server creation weirdness in Expres/Node world

The app returned by `express()` is in fact a JavaScript Function, DESIGNED TO BE PASSED to Node’s HTTP servers as a callback to handle requests.

This makes it easy to provide both HTTP and HTTPS versions of your app with the same code base, as the app does not inherit from these (it is simply a callback):
``` js
var app = express();
http.createServer(app).listen(80);// ssee node js api, app acts as cb
https.createServer(options, app).listen(443);
```

The `app.listen()` method returns an `http.Server` object and (for HTTP) is a convenience method for the following:
``` js
app.listen = function() {
  var server = http.createServer(this);
  return server.listen.apply(server, arguments);
};
```


### Node source

**tick** - one start-end execution of the while true body of uv loop.

In js code, require cpp modules using
``` js
var pbkdf2 = process.binding('pbkdf2');
```

which is exported from cpp side using
``` cpp
  env->SetMethod(target, "PBKDF2", PBKDF2);
```

Major kinds of events/messages on the uv loop:
1. timers with cbs
2. Os level ops with cbs

Most fs functions and some of the crypto functions, use the uv thread pool (which has a default size of 4)

