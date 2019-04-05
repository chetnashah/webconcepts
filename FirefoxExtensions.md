Extensions for Firefox are built using the WebExtensions API, a cross-browser system for developing extensions.

### Installing addon

Open `about:debugging` in Firefox, click `Load Temporary Add-on` and select any file in your extension's directory.

Content scripts are blocked on `addons.mozilla.org`.

### manifest.json

The first three keys: `manifest_version`, `name`, and `version` are mandatory and contain basic metadata for the extension

```js
{

  "manifest_version": 2,
  "name": "Borderify",
  "version": "1.0",

  "description": "Adds a red border to all webpages matching mozilla.org.",

  "icons": {
    "48": "icons/border-48.png"
  },
  "background": {
    "scripts": ["background-script.js"]
  },
  "content_scripts": [
    {
      "matches": ["*://*.mozilla.org/*"],
      "js": ["borderify.js"]
    }
  ]
}
```

`content_scripts`: Tells Firefox to load a script into Web pages whose URL matches a specific pattern. In this case, we're asking Firefox to load a script called "borderify.js" into all HTTP or HTTPS pages served from "mozilla.org" or any of its subdomains. **Note** Content scripts are different from popup scripts. Popup Scripts can only operate on DOM of the popup. Where as content scripts have access to the web page and run code there.

`web_accessible_resources`: lists files that we want to make accessible to web pages. Since the extension replaces the content in the page with images we've packaged with the extension, we need to make these images accessible to the page. These are seperate from `content_scripts` but have the same intent, i.e. available for web pages to use. These resources are also made accessible to `content_scripts`.

### Background script environment

Background scripts run in the context of a special page called a background page. This gives them a window global, along with all the standard DOM APIs provided by that object.

**Background scripts do not get direct access to web pages**

However, they can load content scripts into web pages and can communicate with these content scripts using a message-passing API.

Content scripts can only access a small subset of the WebExtension APIs, but they can communicate with background scripts using a messaging system, and thereby indirectly access the WebExtension APIs.

### Content Scripts

content script won't have access to any JavaScript libraries loaded by the page. So for example, if the page includes jQuery, the content script won't be able to see it.

If a content script does want to use a JavaScript library, then the library itself should be injected as a content script alongside the content script that wants to use it:
e.g.
```json
"content_scripts": [
  {
    "matches": ["*://*.mozilla.org/*"],
    "js": ["jquery.js", "content-script.js"]
  }
]
```

#### Communicating with background scripts
