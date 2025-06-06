
---

# Chrome/Edge Extension Project Overview

## What is a Chrome/Edge Extension?
- Small apps that extend browser functionality.
- Work in both Chrome and Edge (and other Chromium browsers).
- Built with **HTML, CSS, JavaScript**, and a **manifest file**.

---

## Typical Folder Structure

```
my-extension/
├── manifest.json         # Extension manifest (required)
├── background.js         # (Optional) Background script (event/page worker)
├── content.js            # (Optional) Content script (runs in web pages)
├── popup/
│   ├── popup.html        # (Optional) Popup UI
│   └── popup.js
├── options/
│   ├── options.html      # (Optional) Options/settings page
│   └── options.js
├── icons/
│   └── icon.png          # (Recommended) Extension icon(s)
├── styles/               # (Optional) CSS files for popup/options
├── _locales/             # (Optional) Localization
└── README.md
```

---

## Important Files & Their Purposes

| File/Folder          | Purpose                                             |
|----------------------|-----------------------------------------------------|
| `manifest.json`      | **REQUIRED.** Main config: permissions, scripts, UI, etc. |
| `background.js`      | Extension's background logic, runs in the background. |
| `content.js`         | Injected into web pages to interact with page content. |
| `popup/popup.html`   | UI for popup when extension icon is clicked.        |
| `options/options.html`| UI for extension settings.                         |
| `icons/`             | Icons for toolbar, store, etc.                     |

---

## Entry Points

- **`manifest.json`**: Declares everything; the browser reads this first!
- **Background script**: Handles long-running tasks, browser events, messaging.
- **Content script**: Runs in the context of web pages.
- **Popup**: Shown when user clicks extension icon.
- **Options page**: For user settings.

---

## Example `manifest.json` (v3)

```json
{
  "manifest_version": 3,
  "name": "My Extension",
  "version": "1.0",
  "description": "A quick reference Chrome/Edge extension.",
  "permissions": ["storage", "tabs", "scripting"],
  "background": {
    "service_worker": "background.js"
  },
  "content_scripts": [
    {
      "matches": ["<all_urls>"],
      "js": ["content.js"]
    }
  ],
  "action": {
    "default_popup": "popup/popup.html",
    "default_icon": "icons/icon.png"
  },
  "options_page": "options/options.html",
  "icons": {
    "16": "icons/icon.png",
    "48": "icons/icon.png",
    "128": "icons/icon.png"
  }
}
```

---

## Common Starting Points

- **Popup UI**:  
  - Edit `popup/popup.html` and `popup/popup.js`.
- **Content script**:  
  - Write logic in `content.js` to interact with web pages.
- **Background script**:  
  - Use `background.js` for event handling, alarms, messaging, etc.
- **Options page**:  
  - Build `options/options.html` for user settings.

---

## Common APIs & Extension Points

| API/Concept                   | Usage/Callback                       | Purpose                               |
|-------------------------------|--------------------------------------|---------------------------------------|
| `chrome.runtime.onInstalled`   | In background script                 | Setup when extension is installed     |
| `chrome.storage`              | Anywhere                             | Save/retrieve extension data          |
| `chrome.tabs`                 | Background/popup                     | Interact with browser tabs            |
| `chrome.scripting.executeScript` | Background/popup                   | Inject code into web pages            |
| `chrome.action`               | Popup and icon actions               | UI and badge updates                  |
| `chrome.runtime.sendMessage`   | Messaging between scripts            | Communicate across extension parts    |
| `content_scripts`             | Declared in manifest                 | JS runs on matching web pages         |
| `background`                  | Declared in manifest                 | Persistent/event logic                |
| `options_page`                | Declared in manifest                 | User settings interface               |

---

## Where to Start

1. **Fill in `manifest.json`** with name, permissions, and entry points.
2. **Create a popup** (`popup/popup.html` and `popup/popup.js`) for UI.
3. **Write a content script** (`content.js`) to interact with web pages.
4. **Add a background service worker** (`background.js`) for handling events.
5. **Add permissions** in `manifest.json` for the APIs you need.
6. **Load your extension** in Chrome/Edge via  
   `chrome://extensions` > *Load unpacked*.

---

## Useful Resources

- [Chrome Extension Docs](https://developer.chrome.com/docs/extensions/)
- [Edge Extension Docs](https://learn.microsoft.com/en-us/microsoft-edge/extensions-chromium/)
- [Manifest V3 Migration](https://developer.chrome.com/docs/extensions/mv3/intro/)

---

## Quick Reference Table

| Component         | File/Folder             | Purpose                               |
|-------------------|------------------------|---------------------------------------|
| Manifest          | manifest.json           | Configures extension                  |
| Background script | background.js           | Handles events and long-running logic |
| Content script    | content.js              | Interacts with web page content       |
| Popup             | popup/popup.html, .js   | Extension button UI                   |
| Options           | options/options.html, .js| Options/settings page                 |
| Icons             | icons/                  | Toolbar/store icons                   |

---

**Tip:** Start with a simple popup or content script, then add features as you go!  
Test your extension often by reloading it in the browser.

---