

### URL encoding

When putting user-input data as a part of url, it should be url-encoded first.
e.g. in google whatever you type in searchbar is appended to url as `?q=some%20search`.
Also other charachters that have special meaning e.g. `&`, `#` etc need to be escaped
before becoming part of the url components.
Also note that url encoding is NOT idempotent.

### Http keep-alive/persistent connection

HTTP persistent connection, also called HTTP keep-alive, or HTTP connection reuse, is the idea of using a single TCP connection to send and receive multiple HTTP requests/responses, as opposed to opening a new connection for every single request/response pair. The newer HTTP/2 protocol uses the same idea and takes it further to allow multiple concurrent requests/responses to be multiplexed over a single connection.



HTTP polling:
 With polling, the browser sends HTTP requests at regular intervals and immediately receives a response. This technique was the first attempt for the browser to deliver real-time information. Obviously, this is a good solution if the exact interval of message delivery is known, because you can synchronize the client request to occur only when information is available on the server. However, real-time data is often not that predictable, making unnecessary requests inevitable and as a result, many connections are opened and closed needlessly in low-message-rate situations.

HTTP long polling:

With long-polling, the browser sends a request to the server and the server keeps the request open for a set period. If a notification is received within that period, a response containing the message is sent to the client. If a notification is not received within the set time period, the server sends a response to terminate the open request. It is important to understand, however, that when you have a high message volume, long-polling does not provide any substantial performance improvements over traditional polling.

### chunked transfer encoding

Each chunk is preceded by its size in bytes. The transmission ends when a zero-length chunk is received. The chunked keyword in the Transfer-Encoding header is used to indicate chunked transfer.

Chunked transfer encoding is not supported in HTTP/2, which provides its own mechanisms for data streaming

### URI Design

Cool Uri's shouldn't change.
in theory the URI space under your domain name is totally under your control, so you can make it as stable as you like. Pretty much the only good reason for a document to disappear from the Web is that the company which owned the domain name went out of business or can no longer afford to keep the server running.

When you change a URI on your server, you can never completely tell who will have links to the old URI. They might have made links from regular web pages. They might have bookmarked your page. They might have scrawled the URI in the margin of a letter to a friend.

When someone follows a link and it breaks, they generally lose confidence in the owner of the server.


### Websocket basics on the browser

Standard api (on the browser/client) is following:
``` js
var connection = new WebSocket('ws://html5rocks.websocket.org/echo', ['soap', 'xmpp']);

// When the connection is open, send some data to the server
connection.onopen = function () {
  connection.send('Ping'); // Send the message 'Ping' to the server
};

// Log errors
connection.onerror = function (error) {
  console.log('WebSocket Error ' + error);
};

// Log messages from the server
connection.onmessage = function (e) {
  console.log('Server: ' + e.data);
};
```

Find more at: https://www.html5rocks.com/en/tutorials/websockets/basics/