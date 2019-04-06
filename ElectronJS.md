
### Main process

An electron app always has one main process.
Which runs app's `main` script provided in `package.json`.

Creating window in main process:
```js
// This will work in the main process, but be `undefined` in a
// renderer process:
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()
```

### Renderer process

Each web page in Electron runs in its own process, which is called the renderer process.

The main process creates web pages by creating BrowserWindow instances. Each BrowserWindow instance runs the web page in its own renderer process. When a BrowserWindow instance is destroyed, the corresponding renderer process is also terminated.

The main process manages all web pages and their corresponding renderer processes. Each renderer process is isolated and only cares about the web page running in it.

### remote

Electron comes with a module called remote that exposes APIs usually only available on the main process. In order to create a BrowserWindow from a renderer process, we'd use the remote as a middle-man:

```js
// This will work in a renderer process, but be `undefined` in the
// main process:
const { remote } = require('electron')
const { BrowserWindow } = remote

const win = new BrowserWindow()
```

### app

`app` is an event Emitter

### BrowserWindow

`BrowserWindow` is an event emitter.
Used to create/control windows.

