
## Hard to load balance on the server

## Ping/pong keep alive control message has to be a part of sub-protocol

## issues with firewall

WebSocket connections generally work even if a proxy or firewall is in place. This is because they use ports 80 and 443 which are also used by HTTP connections.



### client side websocket API:

Create a `Websocket` using `new` that takes a `wss://` url.

https://developer.mozilla.org/en-US/docs/Web/API/WebSocket

```js
var aWebSocket = new WebSocket(url [, protocols]);
```

#### clients can alternatively use lib like socketio which also has a server side presence.

include `socketio` as a build lib on client via npm or script tag.
`socketio` lib uses an `http` endpoint instead of a `wss` endpoint like above.
e.g.
```js
const socket = io('http://localhost:8000');
socket.on('connect', (data)=> {
        socket.on('welcome', (msg) => {
            console.log(msg);
        })
        socket.emit('message', { data: 'I am a weird mesage'});
    });
```

### Server side websocket

#### nodejs lib: ws

https://www.npmjs.com/package/ws

#### servers can also use a lib like socketio which also has a client side presence.

```js
const io = require('socket.io')(server);
io.on('connection', (socket) => {
    console.log('connection formed with: ');
    console.log(socket);
    socket.on('message', (data) => {
        console.log('message from client: ', data);
    });
    socket.emit('welcome', 'This is a welcome from the server~');
})
```