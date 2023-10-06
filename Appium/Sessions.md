
## What is a (webdriver) session?

Automation is organized around WebDriver sessions, whose state is maintained across requests via a 'session id' token shared by the server and client.

in order to start a session, you need parameters known as "Capabilities".

Automation commands and responses are sent back and forth (keyed on the session id), until the client sends a request to delete the session, at which point the browser and other resources are quit or cleaned up, and the session id is discarded.

## Commands exposed as REST endpoints

To decouple commands from execution (think remote execution of a test), All actions like `click`, `go`, `refresh`, `find element`, `get element property`, etc are exposed as commands/REST endpoints for remote control - https://github.com/jlipps/simple-wd-spec#list-of-all-endpoints

