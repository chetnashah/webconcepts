
### Core building blocks

1. Service Workers - caching and ofline support
2. Background sync - sync data in background
3. Web Push - mobile like push notifications
4. Application manifest - allows addition to home screen
5. Responsive layout - should look good on small form factor.

### Web app manifest `manifest.json`

Telling the browser that our app is a PWA. Enables
PWA to be installed on desktop/home screen as well.

Referenced by `index.html` using
`<link rel="manifest" href="/manifest.json">`

* Must be added to all pages, i.e. all `html` files in your project.

* Debugging manifest `Devtools -> Application -> Manifest`.

`Safari support`:
```html
<meta name="apple-mobile-web-app-status-bar-style" content="black">
<meta name="apple-mobile-web-app-capable" content="yes">
```
#### Manifest properties

* `name` - Long name of app.
* `short_name` - short name of app.
* `start_url` - which page to load on startup.
* `scope` - which pages are included in PWA experience
* `display` - standalone (no url bar on top), 
* `background_color` - bg color to use while loading and splashscreen
* `thmee_color` - colors to be used in recents/system ui for this app.
* `description`
* `lang`
* `dir` - ltr/rtl
* `orientation` - preferred orientation
* `icons` - array icons for homescreen for each resolution.


### sevice workers

Well supported in all browsers.

- decoupled from html
- run in bg even when page is closed
- totally event based idle bg thread like code.
- No access to DOM, but to events mentioned below.

Important events for sw:
- fetch: sw can only intercept and cache http requests sent via the fetch api. Things like `xhr` and `axios` which is built on top of xhr will not emit this event.
https://github.com/axios/axios/issues/1219

- fetch
- push notifications
- notification interaction
- bg sync
- sw lifecycle

**Note** - sw code will not run if it is exactly same 
as already ran sw code.

Most of the work is done via `self.addEventListener`.

- You will see install event listener firing but activate event listener not firing, Because to activate, one has to close all tabs first. so solution is to reopen tab.




#### Default scope on service worker

The default scope on the service worker is the folder
in which the registered file sits. 
So usually it is good idea to put it at root level i.e. 
`/sw.js`







