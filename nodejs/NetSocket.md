
In typical Node.js TCP client and server programming using the `net` module, you **rarely, if ever, need to instantiate a socket directly using `new net.Socket()`**.

Here's why and when you *get* a `net.Socket` instance instead:

1.  **TCP Server (`net.createServer`)**:
    * When you create a server using `net.createServer()`, you provide a callback function (or listen for the `'connection'` event).
    * When a client successfully connects to your server, the Node.js runtime internally handles the equivalent of the C `accept()` call.
    * It then **creates a `net.Socket` instance** representing that specific client connection *for you*.
    * This newly created `net.Socket` object is passed as an argument to your `'connection'` event handler (or the callback passed to `createServer`).
    * **You don't call `new net.Socket()` here; you receive the instance from the framework.**

    ```javascript
    const server = net.createServer((clientSocket) => {
      // 'clientSocket' IS the net.Socket instance, provided by Node.js
      // NO need for 'new net.Socket()' here.
      console.log('Client connected.');
      clientSocket.write('Welcome!');
      // ... handle clientSocket events (data, end, error)
    });
    server.listen(3000);
    ```

2.  **TCP Client (`net.connect` or `net.createConnection`)**:
    * When you want your Node.js application to act as a client and connect to a remote TCP server, you use `net.connect()` or `net.createConnection()`.
    * These functions **create a `net.Socket` instance for you** and immediately initiate the connection process to the specified host and port.
    * These functions *return* the `net.Socket` instance.
    * **You don't call `new net.Socket()` here; you receive the instance from the helper function.**

    ```javascript
    const client = net.connect({ port: 8080, host: 'remote.server.com' }, () => {
      // 'connect' listener, connection established
      console.log('Connected to server!');
      client.write('Hello server!');
    });

    // 'client' IS the net.Socket instance, returned by net.connect()
    // NO need for 'new net.Socket()' here.

    client.on('data', (data) => {
      console.log(data.toString());
      client.end();
    });
    // ... handle other client events (end, error)
    ```

**So, when *might* you use `new net.Socket()`?**

The primary use case for manually calling `new net.Socket([options])` is quite advanced and less common:

* **Wrapping an Existing File Descriptor:** If you have an *existing* socket file descriptor (an integer) that you obtained through other means (e.g., from a C++ addon, received from another process via inter-process communication), you can wrap it in a Node.js `net.Socket` object to interact with it using the standard Node.js stream API and event model.

    ```javascript
    const net = require('net');
    // Assume 'existingFd' is a valid file descriptor for an *already connected* socket
    const existingFd = getFileDescriptorFromSomewhere();

    if (existingFd >= 0) {
      const socket = new net.Socket({
        fd: existingFd,
        readable: true, // You might need to specify these
        writable: true
      });

      // Now you can use 'socket' like a regular Node.js net.Socket
      socket.on('data', (data) => { console.log('Data on existing FD:', data); });
      socket.write('Sending data via existing FD wrapper');
      // ...
    }
    ```

* **Testing/Mocking:** In some complex testing or mocking scenarios, you might instantiate a `net.Socket` directly to simulate network behavior without actual network I/O, perhaps by manually pushing data into it or overriding its methods. This is not typical application code.

**In summary:** For standard network programming (building TCP clients or servers), rely on `net.createServer()` (which gives you sockets via the `'connection'` event) and `net.connect()`/`net.createConnection()` (which return sockets) rather than using `new net.Socket()`. The constructor is primarily reserved for integrating with externally managed socket resources.