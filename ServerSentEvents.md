
## 
When communicating using SSEs, a server can push data to your app whenever it wants, without the need to make an initial request.
updates can be streamed from server to client as they happen. SSEs open a single unidirectional channel between server and client.

SSEs are handled directly by the browser and the user simply has to listen for messages

## Transport

SSEs are sent over traditional HTTP. That means they do not require a special protocol or server implementation to get working.



## Connection management

They use regular HTTP requests for the persistent connection, not a special protocol. Getting multiplexing over HTTP/2 out of the box

automatic reconnection, event IDs, and the ability to send arbitrary events.

Clients can send a unique ID with messages. When a client tries to reconnect after a dropped connection, it will send the last known ID. Then the server can see that the client missed n number of messages and send the backlog of missed messages on reconnect.

The server may send timeout to retry or close the connection permanently. In such a case, the browser will comply with either trying to reconnect after the timeout or not trying at all if connection got terminate message.

Events needed to be sent
by the server within the timeout interval acting as heartbeats, ensuring that
the connection would remain active.

## Browser API

```js
var eventSource = new EventSource(url);

eventSource.onOpen = cb;
eventSource.onError = onErrorCb;
eventSource.onMessage = onMsgCb;
```

## Encoding

Event streams are always decoded as UTF-8 i.e text. There is no way to specify another character encoding.


