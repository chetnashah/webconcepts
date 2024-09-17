
## Detox is a react native test framework

`The mobile app itself`, usually running on a simulator/emulator. A regular native build of your app is installed and executed on the device. Your app is usually built once before the tests start running.

`The test suite`, running on Node.js, using a test runner like Jest. The tests are normally written in JavaScript. Because the tests are asynchronous in nature (every test line requires to access the app and wait for a response), the tests rely heavily on async-await.

**In practice, to make the communication more resilient, both parts are implemented as clients and communicate with a Detox server that acts as proxy. This allows some nice behaviors like allowing one side to disconnect (during a simulator boot for example or app restart) without disconnecting the other side and losing its state**

## Architechture

Detox comprises the following components:

`Tester`: The testing component, running in a Node.js process on the host computer, executing the test logic. The tester is also responsible for device management and artifact collection.

`Detox native client (iOS & Android)`: A component that gets seamlessly integrated into the tested app on the tested device, right as Detox starts executing. It synchronizes with the app, matches user queries, executes user commands (e.g. taps, scrolls) and validates expectations.

`Detox mediator server`: A small web socket server, running in a Node.js process on the host computer, used to connect between the tester and the client. Normally, the tester starts a server on a randomized session id and an available port, and sends the session and port to the client app as a launch argument.

## Common files

1. `detox/src/server/DetoxServer.js`, `detox/src/server/Connection.js` - for server side connection management

2. `detox/src/client` - common js client side code
3. `detox/ios`, `detox/android` - native clients code bundled with app
4. `detox/src` - high level detox code running in node
5. `detox/src/devices/runtime/drivers`, `detox/src/devices/common/drivers` - driver code for each platform
6. `detox/src/client/AsyncWebsocket`, `detox/src/client/Client.js` - client side code for and connection management.

## Websocket setup between mobile and Detox server

1. Mobile app connects to a websocket server running on the host machine at port `8099`
   1. iOS - https://github.com/wix/Detox/blob/73cd440753aa30b0e83b46909e001a146ac57a0b/detox/ios/Detox/DetoxManager.swift#L124
   2. Android - https://github.com/wix/Detox/blob/73cd440753aa30b0e83b46909e001a146ac57a0b/detox/android/detox/src/full/java/com/wix/detox/adapters/server/DetoxServerInfo.kt#L8 
2. Host machine would run a websocket server at port `8099` and listen for connections - https://github.com/wix/Detox/blob/73cd440753aa30b0e83b46909e001a146ac57a0b/detox/local-cli/run-server.js#L21
3. 

## Checking logs for issues


1. On server side, see requests with `messageId` and `type`.
2. On client logs, you can see the same invocations/messages, after each action, the result is returned back from device to the server.
