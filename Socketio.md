
socket io lib needs to be used both on client and server.

      // in protocol v3, the client sends a ping, and the server answers with a pong
      // in protocol v4, the server sends a ping, and the client answers with a pong (this was due to timer throttling on browsers, and server side timers are more accurate and not throttled)

best way to debug issues is to set DEBUG=* and then run the app

### client side

#### client presence heartbeat

Client presence heartbeat is measured via ping/pong.
i.e Ping is sent by server and client should respond with a pong (this happens automatically)

#### client side "Manager"

The `Manager` manages the Engine.IO client instance, which is the low-level engine that establishes the connection to the server (by using transports like `WebSocket` or HTTP long-polling).

The Manager handles the reconnection logic.

A single `Manager` can be used by several `Sockets`. You can find more information about this multiplexing feature here.


### server side

### Namespace

A Namespace is a communication channel that allows you to split the logic of your application over a single shared connection e.g. `/admin`.

Each namespace has its own :
* event handlers
* rooms
* middlewares

### Rooms
server-side concept.

A `room` is an arbitrary channel that sockets can `join` and `leave`. It can be used to broadcast events to a subset of clients.

Each `Socket` in Socket.IO is identified by a random, unguessable, unique identifier `Socket#id`. 
* For your convenience, each socket automatically joins a room identified by its own id.
* sockets have property `socket.rooms` to know the rooms they are part of.

Upon disconnection, sockets `leave` all the channels they were part of automatically, and no special teardown is needed on your part.

You can fetch the rooms the Socket was in by listening to the disconnecting event:




