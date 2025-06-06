
---

# Electron Project Overview

## What is Electron?
- **Electron** lets you build cross-platform desktop apps using **JavaScript, HTML, and CSS**.
- It combines **Chromium** (for rendering) and **Node.js** (for backend logic).

---

## Typical Folder Structure

```
my-electron-app/
├── node_modules/
├── public/           # Static assets (icons, images, etc.)
├── src/
│   ├── main/         # Main process code (backend)
│   │   └── main.js   # Main entry point for Electron
│   └── renderer/     # Renderer process code (frontend)
│       └── renderer.js
├── package.json      # Project metadata and scripts
├── package-lock.json # Dependency lock file
├── .gitignore
├── README.md
├── preload.js        # Optional: preload script for secure bridging
```

---

## Important Files & Their Purposes

- **package.json**
  - App metadata, dependencies, main entry point, and scripts.
- **src/main/main.js**
  - The **main process**; starts the Electron app, creates browser windows.
- **src/renderer/renderer.js**
  - The **renderer process**; runs in the browser window, handles UI.
- **preload.js**
  - Runs before the renderer script; bridges between main and renderer with restricted Node access.
- **public/**
  - Contains static files like `index.html`, icons, etc.

---

## Entry Points

- **Main entry:** Specified in `package.json` under `"main"` (usually `src/main/main.js`).
- **Renderer entry:** The HTML file loaded into the app window (e.g., `public/index.html`), which loads `renderer.js`.

---

## Common Starting Points

### 1. Clone or scaffold a new project
- Use [electron-quick-start](https://github.com/electron/electron-quick-start) or [create-electron-app](https://www.npmjs.com/package/create-electron-app).

### 2. Install dependencies
```sh
npm install
```

### 3. Start the app
```sh
npm start
```

### 4. Edit source files
- **Main process:** `src/main/main.js`
- **Renderer process:** `src/renderer/renderer.js` and `public/index.html`

---

## Example: Minimal Main Process (`main.js`)

```js
const { app, BrowserWindow } = require('electron');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, '../../preload.js')
    }
  });
  win.loadFile('public/index.html');
}

app.whenReady().then(createWindow);
```

---

## Key Concepts

- **Main Process**: Manages app lifecycle, native functions, windows.
- **Renderer Process**: Manages UI, acts like a web page.
- **Preload Script**: Safely exposes limited APIs from main to renderer.

---

## Where to Start

- **Edit UI:** `public/index.html` and `src/renderer/renderer.js`
- **Main logic:** `src/main/main.js`
- **Add native features:** Use Electron APIs in the main process.
- **Secure communication:** Use `preload.js` to expose safe APIs.

---

## Useful Scripts in `package.json`

```json
"scripts": {
  "start": "electron .",
  "build": "electron-builder"
}
```

---

## Summary Table

| Component      | Folder/File                | Purpose                   |
| -------------- | ------------------------- | ------------------------- |
| Main process   | src/main/main.js           | App lifecycle, windows    |
| Renderer (UI)  | src/renderer/renderer.js   | UI logic                  |
| Static assets  | public/                    | HTML, images, icons       |
| Preload        | preload.js                 | Secure API bridge         |
| Config/scripts | package.json               | Metadata, scripts         |

---

**Tip:** Start simple, get the main window loading, then add features step by step!  
For more, see the [Electron docs](https://www.electronjs.org/docs/latest/).

---