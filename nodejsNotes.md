
### node package resolution via require

Use `require.resolve(modulename)` in node REPL to quickly see
how it is resolved
```js
$ node

> require.resolve('react')
'C:\\Users\\abcsh\\Documents\\programming\\formik-app\\node_modules\\react\\index.js'

> require.resolve('react-dom')
'C:\\Users\\abcsh\\Documents\\programming\\formik-app\\node_modules\\react-dom\\index.js'
```
### main module

The module that gets loaded first via the cli is the main module.

### closing server from code

`httpServer.close(cb)` - close the server, graceful shutdown to no longer accept connections, frees up event loop from listening to file I/O and gets the process ready for shutdown.
The optional cb will be called once the 'close' event occurs

### Process monitoring

Something outside of the app process, which is in charge of checking health and app process restart in case it crashes.
e.g. `systemd`, `pm2`, `upstart`, `forever`.

### error handling

Default behavior:
The `uncaughtException` event is emitted in the `process` eventEmitter when an uncaught JavaScript exception bubbles all the way back to the event loop. By default, Node.js handles such exceptions by printing the stack trace to stderr and exiting with code 1, overriding any previously set process.exitCode.

**Note**: The correct use of 'uncaughtException' is to perform synchronous cleanup of allocated resources (e.g. file descriptors, handles, etc) before shutting down the process. It is not safe to resume normal operation after 'uncaughtException', so just terminate by calling `exit` in this listener.

To restart a crashed application in a more reliable way, whether 'uncaughtException' is emitted or not, an external monitor should be employed in a separate process to detect application failures and recover or restart as needed.

#### unhandled rejection

"unhandledrejection" is an event emitted on process object.
How to add listener for this event:
```js
process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', promise, 'reason:', reason);
  // Application specific logging, throwing an error, or other logic here
});
```
try this to raise unhandled rejection:
```js
new Promise((resolve, reject) => {
  setTimeout(() => reject('woops'), 500);
});
```

"Rejection" is the canonical term for a promise reporting an error.
```
const { MongoClient } = require('mongodb');
MongoClient.connect('mongodb://notadomain');

/* Output:
$ node test.js
(node:9563) UnhandledPromiseRejectionWarning: Unhandled promise rejection (rejection id: 1): MongoError: failed to connect to server [notadomain:27017] on first connect [MongoError: getaddrinfo ENOTFOUND notadomain notadomain:27017]
(node:9563) DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code. */
```

```
new Promise((resolve, reject) => {
  setTimeout(() => reject('woops'), 500);
});

/* Output:
$ node test.js
(node:8128) UnhandledPromiseRejectionWarning: Unhandled promise rejection (rejection id: 1): woops
(node:8128) DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code. */
```

```
new Promise(() => { throw new Error('exception!'); });

/* Output
$ node test.js
(node:8383) UnhandledPromiseRejectionWarning: Unhandled promise rejection (rejection id: 1): Error: exception!
(node:8383) DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code. */
```

What will following code do?
```js
new Promise((_, reject) => reject(new Error('woops'))).
  catch(error => { console.log('caught', err.message); });
//   $ node test.js
// (node:9825) UnhandledPromiseRejectionWarning: Unhandled promise rejection (rejection id: 2): ReferenceError: err is not defined
// (node:9825) DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.
```

It will throw an unhandledRejection because `err` in the catch block is not defined.


if you attach a listener to 'unhandledRejection', the default warning to the console (the UnhandledPromiseRejectionWarning from previous examples) will not print to the console. That message only gets printed if you don't have a handler for 'unhandledRejection'.



#### console logging the module

Just do `console.log(module)` in any file and you will get info about that module.
This is the same object to which we set our `exports` property to export values.
e.g. `module.exports = {/* ... */}`

Also the value returned while doing `require` of a file/module is exactly the 
same as the `exports` object of the require'd module.

Also when file is required for the first time it is said to be loading/executing.
The reuslt of this require is cached for subsequent requires.

#### Where does the module scope come from?
Essentially all files when required are wrapped within an IIFE, which introduces
a scope, thus allowing modularity and isolation.
e..g
```js
function(exports, require, module, __filename, __dirname){
  /* Your module code is here */
}(exports,require,module,filename,dirname);
```
This function could be called a `module wrapper function`.

### http module

1. `http.request(options, callback)` : Represents an inprogress request outgoing from node.
 The callback will be added as one time listener for `response` event. This method returns an instance of `http.ClientRequest` class. The `ClientRequest` instance is a writeablestream. It represents an inprogress request from node itself.
The `response` event on `http.ClientRequest` instance, contains a single argument which is an instance of `http.IncomingMessage`.

2. `http.createServer()` returns a server instance which is an eventemitter.
Main event is `request` on the `Server` instance. Main function to start accepting requests
is `server.listen(portNo)`.
```js
const server = require('http').createServer();
server.listen(3000);
server.on('request', (req: IncomingMessage,res: ServerResponse) => {
    console.log('a req event:');
    console.log(req.url);
    res.end('hello world');
});
// do curl localhost:3000/ and you should get hello world and req url logged

// Another shortcut for this above is directly doing following:
const server = require('http').createServer((req: IncomingMessage, res: ServerResponse) => {
    console.log('a req event:');
    console.log(req.url);
    res.end('hello world');
});
```

3. An `http.IncomingMessage` object is created by:

`http.Server` when listening to the request event
`http.ClientRequest` when listening to the response event

```js
// This is an outgoing request from node
const url = 'https://httpbin.org/get';
const options = {
    host: 'httpbin.org',
    port: 80,
    path: '/get'
  };
const clientRequest: ClientRequest = http.get(options);
clientRequest.on('response', (res: IncomingMessage) =>{
    console.log('httpbin returned: ', res.statusCode);
    const chunks = [];
    res.on('data', (data) => {
        chunks.push(data);
        console.log(chunks.toString());
    });
    console.log(chunks);
});
```

#### serverResponse : setHeader vs writeHead
`response.setHeader()` allows you only to set a singular header.

`response.writeHead()` will allow you to set pretty much everything about the response head including` status code`, and `multiple headers`.

### path module

Useful method is `path.parse(pathString)`.
Returns an object with full parsing of the path like so:
```js
path.parse('/home/user/dir/file.txt');
// Returns:
// { root: '/',
//   dir: '/home/user/dir',
//   base: 'file.txt',
//   ext: '.txt',
//   name: 'file' }

/*
┌─────────────────────┬────────────┐
│          dir        │    base    │
├──────┬              ├──────┬─────┤
│ root │              │ name │ ext │
"  /    home/user/dir / file  .txt "
└──────┴──────────────┴──────┴─────┘
(all spaces in the "" line should be ignored — they are purely for formatting)
*/
```

### fs

All calls have either sync or async API. mostly inspired from posix standard.


#### An idiom to clear files quickly

```js
fs.closeSync(fs.openSync(FILE_PATH, 'w'));// w truncates files
```
while the processes have the files still opened, you shouldn't expect to get the space back. It's not freed, it's being actively used. This is also one of the reasons that applications should really close the files when they finish using them. In normal usage, you shouldn't think of that space as free, and this also shouldn't be very common at all - with the exception of temporary files that are unlinked on purpose, there shouldn't really be any files that you would consider being unused, but still open. 

### Buffer

Prior to the introduction of TypedArray in ECMAScript 2015 (ES6), the JavaScript language had no mechanism for reading or manipulating streams of binary data. The Buffer class was introduced as part of the Node.js API to make it possible to interact with octet streams in the context of things like TCP streams and file system operations.

Now that TypedArray has been added in ES6, the Buffer class implements the Uint8Array API in a manner that is more optimized and suitable for Node.js' use cases.

### Streams

Note: All streams are event emitters.


### EventEmitter

The relevant module name is `events`;

Events are "named".
All listners bound to  event emitter with same name are called synchronously when an
event is emitted with a given name.
The values returned by listeners are **ignored**

Getting list of event names: `emitter.eventNames()`
Returns an array listing the events for which the emitter has registered listeners

```js
const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();
myEmitter.on('myevent1', () => {
  console.log('an event occurred!');
});
myEmitter.emit('myevent1');
```

Adding an event listener:
```
emitter.on(eventName, listener)
eventName <string> | <symbol> The name of the event.
listener <Function> The callback function
Returns: <EventEmitter>
```
Adds the listener function to the end of the listeners array for the event named eventName. No checks are made to see if the listener has already been added. Multiple calls passing the same combination of eventName and listener will result in the listener being added, and called, multiple times.

`on` is a synonym for `addListener`.
Has methods .on(eventName, listener) -> to register listeners,
and .emit(eventName) -> synchronously calls all registered listeners.

Examples of commonly used event emitters in nodejs:
1. process
2. httpServer ie. `http.Server`
3. netServer i.e. `net.Server`

Writable Stream (and also event emitters by association) examples:
1. HTTP requests, on the client
2. HTTP responses, on the server
3. fs write streams
4. zlib streams
5. crypto streams
6. TCP sockets
7. child process stdin
8. process.stdout, process.stderr

Readable streams (and also event emitters by association) examples:
Readable streams are an abstraction for a source from which data is consumed.
examples:
1. HTTP responses, on the client
2. HTTP requests, on the server
3. fs read streams - created using `fs.createReadStream`.
4. zlib streams
5. crypto streams
6. TCP sockets
7. child process stdout and stderr
8. process.stdin - always available


#### Event emitter listeners
If you pass `function abc()` with `addListener/on` methods, then `this` inside the
`abc()` will be the EventEmitter instance that emitted the event.
But if you pass an arrow function with `addListener/on`, then `this` is lexically bound.

* calling order for listeners - Listeners are called in the order in which they were registered.

The EventEmitter instance will emit its own `newListener` event before a listener is added to its internal array of listeners.
The 'removeListener' event is emitted after the listener is removed.


All readable and writable streams are event-emitters in nodejs.

#### Error handling in event emitters

CLients should add a named event `error` listener.
If such a listener is present nodejs will call this instead of crashing node/process.

### Readable stream events

1. `close`
2. `data` - The `data` event is emitted whenever the stream is relinquishing ownership of a chunk of data to a consumer.
3. `end`
4. `error`
5. `readable`

### Writable stream events

1. `close`
2. `drain`
3. `error`
4. `finish`
5. `pipe`
6. `unpipe`

### IncomingMessage events

Implements ReadableStream.

1. `aborted`
2. `close`

### ClientRequest events

Outgoing request made by node.

1. `abort`
2. `connect`
3. `continue`
4. `response` - indicates we have got a response, only emitted once, value received in this listener is instance of `IncomingMessage`.
5. `socket`
6. `upgrade`
7. 

### ServerResponse events

Response by a node server.

1. `close`
2. `finish`

### Server Events

1. `checkContinue`
2. `checkExcpectation`
3. `clientError` - when client connection emits an 'error' event. default behaviour is close the socket with 400.
4. `close` - when server closes
5. `connect` - HTTP "CONNECT" method
6. `connection` - when tcp connection established.
7. `request` - when server got a request
8. `upgrade`
9. 

### Implementing Custom Writable streaam

The `stream.Writable` class is extended to implement a Writable stream.

Custom Writable streams must call the `new stream.Writable([options])` constructor and implement the `writable._write()` method.

### Implementing Custom Readable stream

The `stream.Readable` class is extended to implement a Readable stream.

Custom `Readable` streams must call the `new stream.Readable([options])` constructor and implement the `readable._read()` method

```js
class CounterReadable extends Readable {
  constructor(options) {
    super(options);
  }
  _read() {
    for (let i = 0; i < 1000; i += 2) {
      // push will queue it in internal buffer
      // and will take care of emitting 'data' event
      // in cases where listener is attached.
      this.push(i.toString() + '\n');
    }
    this.push(null);
  }
}

const ctrReadable = new CounterReadable();
ctrReadable.pipe(process.stdout);
```

**NOte** - Readable will not generate data until a mechanism for either consuming or ignoring that data is provided.

*Note* - Usually streams only allow to pass `string` and `Buffer` to be passed
as chunks, but to allow objects, one has to pass `objectMode: true` in options, in order to allow objects.

e.g. of `Readable` streams:

1. HTTP responses, on the client
2. HTTP requests, on the server
3. fs read streams
4. zlib streams
5. crypto streams
6. TCP sockets
7. child process stdout and stderr
8. process.stdin

#### Readable stream modes:

1. flowing mode: can be entered using
  a. `stream.pipe()`
  b. `stream.resume()`
  c. Adding a `data` event handler.
2. paused mode:
  a. If there are no `pipe` destinations, then calling `stream.pause()`
  b. If there are `pipe` destinations, removing by calling `stream.unpipe()`.

#### Three states of Readable

Specifically, at any given point in time, every Readable is in one of three possible states:

`readable.readableFlowing === null`
`readable.readableFlowing === false`
`readable.readableFlowing === true`
When `readable.readableFlowing` is null, no mechanism for consuming the stream's data is provided. Therefore, the stream will not generate data. 

While in this state, attaching a listener for the `data` event, calling the `readable.pipe()` method, or calling the `readable.resume()` method will switch `readable.readableFlowing` to `true`, causing the Readable to begin actively emitting events as data is generated.

Calling `readable.pause()`, `readable.unpipe()`, or receiving backpressure will cause the `readable.readableFlowing` to be set as `false`, temporarily halting the flowing of events but not halting the generation of data. While in this state, attaching a listener for the `data` event `will not switch readable.readableFlowing to true`.



### Using Transform stream in stream pipelines.

`Transform` stream is `Duplex` stream, that is used to convert/transform data in transit from a readable stream to writable stream via a pipe.

e.g.
```js
// returns a transform stream that adds index to each object chunk
function xformer () {
  let count = 0

  return new Transform({
    objectMode: true,
    transform: (data, encoding, done) => {
      done(null, { ...data, index: count++ })
    }
  })
}

let t = xformer();
let r = fs.createReadStream('abc.txt');
let w = fs.createWriteStream('xyz.txt');
r.pipe(t).pipe(w);
```

### All Stream types used together

```js
// data pushed into ReadableStream using stream.push
function clock () {
  const stream = new Readable({
    objectMode: true,
    read() {}
  })

  setInterval(() => {
    stream.push({ time: new Date() })
  }, 1000)

  return stream
}
// index added by transformer stream
function xformer () {
  let count = 0

  return new Transform({
    objectMode: true,
    transform: (data, _, done) => {
      done(null, { ...data, index: count++ })
    }
  })
}
// data finally consumed by writable stream
function renderer () {
  return new Writable({
    objectMode: true,
    write: (data, _, done) => {
      console.log('<-', data)
      done()
    }
  })
}
// All used together
clock()              // Readable stream
  .pipe(xformer())   // Transform stream
  .pipe(renderer())  // Writable stream
```

#### Stream `pipeline`

This is a module method to pipe between streams forwarding errors and properly cleaning up and provide a callback when the pipeline is complete.
```js
const { pipeline } = require('stream');
const fs = require('fs');
const zlib = require('zlib');

// Use the pipeline API to easily pipe a series of streams
// together and get notified when the pipeline is fully done.
// A pipeline to gzip a potentially huge video file efficiently:

pipeline(
  fs.createReadStream('The.Matrix.1080p.mkv'),
  zlib.createGzip(),
  fs.createWriteStream('The.Matrix.1080p.mkv.gz'),
  (err) => {
    if (err) {
      console.error('Pipeline failed', err);
    } else {
      console.log('Pipeline succeeded');
    }
  }
);
```


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

### Event loop

**Role of kernel in event loop**:
The event loop is what allows Node.js to perform non-blocking I/O operations — despite the fact that JavaScript is single-threaded — by offloading operations to the system kernel whenever possible. (Think `epoll`, `select`, `kqueue`)

Since most modern kernels are multi-threaded, they can handle multiple operations executing in the background. When one of these operations completes, the kernel tells Node.js so that the appropriate callback may be added to the poll queue to eventually be executed.

In essence, kernel events related to I/O result in events in `poll queue` to fire corresponding callbacks.

A lot of this is abstracted by `libuv`. find at http://docs.libuv.org/en/v1.x/design.html#the-i-o-loop

Event loop phases in particular order:
1. timers - executing timer callbacks
2. pending callbacks
3. idle/prepare
4. poll - retrieve new I/O events; execute I/O related callbacks. all part of `poll queue`.
5. check
6. close callbacks

We have a `poll queue` that poll phase operates on.

### timers

### What are pending callbacks, how are they different from I/O callbacks?

All I/O callbacks are called right after polling for I/O, for the most part. There are cases, however, in which calling such a callback is deferred for the next loop iteration. If the previous iteration deferred any I/O callback.

This phase executes callbacks for some system operations such as types of TCP errors. For example if a TCP socket receives `ECONNREFUSED` when attempting to connect, some *nix systems want to wait to report the error. This will be queued to execute in the pending callbacks phase.

### `process.nextTick`

Function/code scheduled using `process.nextTick` cannot be cancelled.
Will be run as soon as current block runs to completion.
Then the control is passed to event-loop.

In essence, the names should be swapped. `process.nextTick()` fires more immediately than `setImmediate()`, but this is an artifact of the past which is unlikely to change

#### setImmediate

Functions scheduled by `setImmediate` are invoked in `check` phase.

In essence, the names should be swapped. `process.nextTick()` fires more immediately than `setImmediate()`, but this is an artifact of the past which is unlikely to change

### `setImmediate` vs `setTimeout`

`setTimeout`: Although registered in timers phase, poll phase checks if time threshold has beeen crossed for any timers, and wraps around `timers` phase to call the timer callbacks.

`setImmediate()` is designed to execute a script once the current poll phase completes.
`setTimeout()` schedules a script to be run after a minimum threshold in ms has elapsed.


The order in which the timers are executed will vary depending on the context in which they are called.

The main advantage to using `setImmediate()` over `setTimeout()` is setImmediate() will always be executed before any timers if scheduled within an I/O cycle, independently of how many timers are present

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

### child_process

Note: There are also methods like `fork` in the `cluster` module. So do not get confused with behavior of different `fork` functions.

Useful methods:
1. `spawn` : spawns the child process asynchronously, without blocking the Node.js event loop.
2. `spawnSync`: provides equivalent functionality in a synchronous manner that blocks the event loop until the spawned process either exits or is terminated.
2. `fork`: spawns a new Node.js process and invokes a specified module with an IPC communication channel established that allows sending messages between parent and child.
**NOTE: Unlike the `fork(2)` POSIX system call, `child_process.fork()` does not clone the current process**
The `child_process.fork()` method is a special case of `child_process.spawn()` used specifically to spawn new Node.js processes. Like `child_process.spawn()`, a `ChildProcess` object is returned. The returned `ChildProcess` will have an additional communication channel built-in that allows messages to be passed back and forth between the parent and child. See `subprocess.send()` for details.
e.g.
```js
// main.js
const cp = require('child_process');
const n = cp.fork(`${__dirname}/sub.js`);

n.on('message', (m) => {
  console.log('PARENT got message:', m);
});

// Causes the child to print: CHILD got message: { hello: 'world' }
n.send({ hello: 'world' });
```
```js
//sub.js
process.on('message', (m) => {
  console.log('CHILD got message:', m);
});

// Causes the parent to print: PARENT got message: { foo: 'bar', baz: null }
process.send({ foo: 'bar', baz: NaN });
```

3. `execFile`: similar to child_process.exec() except that it spawns the command directly without first spawning a shell by default.
Since a shell is not spawned, behaviors such as I/O redirection and file globbing are not supported.
 `execFileSync`:
4. `exec`: spawns a shell and runs a command within that shell, passing the stdout and stderr to a callback function when complete. Never pass unsanitized user input to this function. Any input containing shell metacharacters may be used to trigger arbitrary command execution.
**Difference from POSIX**: Unlike the `exec(3)` POSIX system call, `child_process.exec()` does not replace the existing process and uses a shell to execute the command
e.g.
```js
const { exec } = require('child_process');
exec('cat *.js missing_file | wc -l', (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.log(`stderr: ${stderr}`);
});
```
5. `execSync`:

All of the above methods returns an instance of `ChildProcess`

Useful events on `ChildProcess` eventemitter (Also known as `subprocess` in docs):
1. close
2. error
3. disconnect
4. exit
5. message :triggered when a child process uses `process.send()` to send messages

Useful methods on `ChildProcess` i.e. `subprocess`:
1. `kill([signal])`
2. `ref()`
3. `unref()`
4. `send(message[, sendHandle[,options, callback]])`: If Node.js is spawned with an IPC channel, the `process.send()` method can be used to send messages to the parent process. Messages will be received as a `message` event on the parent program's `ChildProcess` object.

If Node.js was not spawned with an IPC channel, process.send() will be undefined.



Useful properties on `ChildProcess` i.e. `subprocess`:
1. `killed`
2. `pid`
3. `stdin`
4. `stdio`: used to configure the pipes that are established between the parent and child process. By default, the child's stdin, stdout, and stderr are redirected to corresponding `subprocess.stdin`, `subprocess.stdout`, and `subprocess.stderr` streams on the ChildProcess object. This is equivalent to setting the `options.stdio` equal to `['pipe', 'pipe', 'pipe']`.
5. `stdout`
6. `stderr`

It is worth noting that when an IPC channel is established between the parent and child processes, and the child is a Node.js process, the child is launched with the IPC channel unreferenced (using unref()) until the child registers an event handler for the 'disconnect' event or the 'message' event. This allows the child to exit normally without the process being held open by the open IPC channel.



### Process

`SIGKILL` cannot have a listener installed, it will unconditionally terminate Node.js on all platforms.
`SIGSTOP` cannot have a listener installed.


### callback API design

https://blog.izs.me/2013/08/designing-apis-for-asynchrony/

CHOOSE SYNC OR ASYNC callbacks, BUT NOT BOTH in the same function.
it may be possible to invoke a callback immediately in some situations (say, data is already available) while the callback needs to be deferred in others (the socket isn’t ready yet). The tempting thing is to invoke the callback synchronously when possible, and otherwise defer it. Not a good idea.

Problem case:
```js
import { readFile } from 'fs' const cache = new Map(); 
function inconsistentRead (filename, cb) {   
  if (cache.has(filename)) {// invoked synchronously     
    cb(cache.get(filename))   
  } else {// asynchronous function    
    readFile(filename, 'utf8', (err, data) => {       
      cache.set(filename, data)       
      cb(data)     
    })
  }
}
```
Cause problem with below functions:
```js
function createFileReader (filename) {   
    const listeners = []; 
    inconsistentRead(filename, value => { // sync firing, if no listeners registered nothing will fire    
      listeners.forEach(listener => listener(value));
      });
    return {
      onDataReady: listener => listeners.push(listener);// public api to register listeners
    }
}
```
IN second case callback never invoked:
```js
const reader1 = createFileReader('data.txt');// after return we can register listeners, which can be invoked in future event loop run
reader1.onDataReady(data => {   
  console.log(`First call data: ${data}`);
  // ...sometime later we try to read again from   // the same file   
  
  const reader2 = createFileReader('data.txt');// no callback will happen
  reader2.onDataReady(data => {     
    console.log(`Second call data: ${data}`);   
  }) 
})
```

async callback interacts with eventloop, where as sync one does not, so a source of bugs.

A `synchronous callback` is invoked before a function returns, that is, while the API receiving the callback remains on the stack. 
An example might be: `list.foreach(callback);` when `foreach()` returns, you would expect that the callback had been invoked on each element.

An `asynchronous or deferred callback` is invoked after a function returns, or at least on another thread’s stack. Mechanisms for deferral include threads and main loops (other names include event loops, dispatchers, executors). Asynchronous callbacks are popular with IO-related APIs, such as `socket.connect(callback);` you would expect that when connect() returns, the callback may not have been called, since it’s waiting for the connection to complete.

Guidelines: 
* A given callback should be either always sync or always async, as a documented part of the API contract.
* An async callback should be invoked by a main loop or central dispatch mechanism directly, i.e. there should not be unnecessary frames on the callback-invoking thread’s stack, especially if those frames might hold locks.

Synchronous callbacks:

1. Are invoked in the original thread, so do not create thread-safety concerns by themselves.
2. In languages like C/C++, may access data stored on the stack such as local variables.
3. In any language, they may access data tied to the current thread, such as thread-local variables. For example many Java web frameworks create thread-local variables for the current transaction or request.
5. May be able to assume that certain application state is unchanged, for example assume that objects exist, timers have not fired, IO has not occurred, or whatever state the structure of a program involves.

Asynchronous callbacks:

1. May be invoked on another thread (for thread-based deferral mechanisms), so apps must synchronize any resources the callback accesses.
2. Cannot touch anything tied to the original stack or thread, such as local variables or thread-local data.
3. If the original thread held locks, the callback will be invoked outside them.
4. Must assume that other threads or events could have modified the application’s state.

Node’s synthetic deferral function: `process.nextTick`, which runs the supplied callback at the end of the current run-to-completion. 
You can also use `setImmediate`, but that’s slightly slower
e.g. of the solution
```js
var cachedValue;
function usuallyAsync(cb) {
  if (cachedValue !== undefined)
    process.nextTick(function() {// async
      cb(cachedValue);
    });
  else
    doSomeSlowThing(function(result) {//async
      cb(cachedValue = result);
    });
}
```


### Graceful shutdown advice

Here are the four steps of how you can do a graceful shutdown in an easy way.
should be done in case of uncaught exception or process kill signals received by the process.

1. Handle process kill signal - `handler that will call below three steps`
2. Stop new requests from client - `server.close()`
3. Close all data process - `db.close()`
4. Exit from process - `process.exit`


```js
// terminate.js
function terminate (server, options = { coredump: false, timeout: 500 }) {
  // Exit function
  const exit = code => {
    options.coredump ? process.abort() : process.exit(code);
  };

  return (code, reason) => (err, promise) => {
    if (err && err instanceof Error) {
    // Log error information, use a proper logging library here :)
      console.log(err.message, err.stack)
    }

    // Attempt a graceful shutdown
    server.close(exit);
    setTimeout(exit, options.timeout).unref();
  }
}
module.exports = terminate
```

main server
```js
const http = require('http')
const terminate = require('./terminate')
const server = http.createServer(...)

const exitHandler = terminate(server, {
  coredump: false,
  timeout: 500
})

process.on('uncaughtException', exitHandler(1, 'Unexpected Error'))
process.on('unhandledRejection', exitHandler(1, 'Unhandled Promise'))
process.on('SIGTERM', exitHandler(0, 'SIGTERM'))
process.on('SIGINT', exitHandler(0, 'SIGINT'))
```