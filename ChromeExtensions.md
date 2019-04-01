
### Overview

Go to `chrome://extensions` and enable developer mode.

Each extension gets an `id`.

Extension files are zipped into a single `.crx` package that the user downloads and installs. This means extensions do not depend on content from the web, unlike ordinary web apps.

You declare you chrome extension meta data using `manifest.json` file.

### Browser actions

Inside `browser_action` field are two important fields: `default_popup` and `default_icon`,


e.g. manifest.json
```json
  {
    "name": "Hello Extensions",
    "description" : "Base Level Extension",
    "version": "1.0",
    "manifest_version": 2,
    "browser_action": {
      "default_popup": "hello.html",
      "default_icon": "hello_extensions.png"
    }
  }
```

### Background scripts

Introduce background scripts via `background` field, that has two subfields: `persistent` and `scripts` e.g.
```json
{
    "name": "Extension-name",
    "version": "1.0",
    "manifest_version": 2,
    "background": {
        "scripts": ["background.js"],
        "persistent": false
    }
}
```

### Page Action

Use `page_action` when an extension's features are only available under defined circumstances.

Declaring `page_action` will colorize the icon only when the extension is available to users, otherwise it will be displayed in greyscale.


### Popup

A `popup` is an HTML file that is displayed in a special window when the user clicks the toolbar icon. A popup works very similarly to a web page; it can contain links to stylesheets and script tags, but does not allow inline JavaScript.

### Tooltip

Use a tooltip to give short descriptions or instructions to users when hovering over the browser icon.

Tooltips are registered in the `default_title` field `browser_action` or `page_action` in the manifest.


### Context Menu

Right click menu item.
Add new context menu options by granting the `contextMenus` permission in the manifest.

### Commands

Extensions can define specific commands and bind them to a `key combination`. Register one or more commands in the manifest under the `commands` field.

### Override pages

An extension can override and replace the History, New Tab, or Bookmarks web page with a custom HTML file.