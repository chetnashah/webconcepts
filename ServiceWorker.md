
Service workers essentially act as proxy servers that sit between web applications, the browser, and the network (when available).

* A service worker is an `event-driven worker registered against an origin and a path`.

* A service worker is run in a worker context: it therefore has no DOM access, and runs on a different thread to the main JavaScript that powers your app, so it is non-blocking. the service worker is executed in a `ServiceWorkerGlobalScope`. you have little control over when the service worker code is going to run. The browser decides when to wake it up and when to terminate it. The only way you can tell the browser, "Hey, I'm super busy doing important stuff", is to pass a promise into the `event.waitUntil()` method. With this, the browser will keep the service worker running until the promise you passed in has settled. With push events, there is an additional requirement that you must display a notification before the promise you passed in has settled.

* Chrome will only show the "This site has been updated in the background." notification when a push message is received and the push event in the service worker does not show a notification after the promise passed to event.waitUntil() has finished.


* It is designed to be fully async; as a consequence, APIs such as synchronous XHR and Web Storage can't be used inside a service worker.

* Service workers make heavy use of promises

* A service worker won't receive events like fetch and push until it successfully finishes installing and becomes "active".

### Check if client is focused in serviceworker

```js
function isClientFocused() {
  return clients.matchAll({
    type: 'window',
    includeUncontrolled: true
  })
  .then((windowClients) => {
    let clientIsFocused = false;
    for (let i = 0; i < windowClients.length; i++) {
      const windowClient = windowClients[i];
      if (windowClient.focused) {
        clientIsFocused = true;
        break;
      }
    }

    return clientIsFocused;
  });
}
```
```js
  if (await isClientFocused()) {
    console.log('Don\'t need to show a notification.');
    return;
  }

  // Client isn't focused, we need to show a notification.
  return self.registration.showNotification('Had to show a notification.');
```




### Scope and control


Scope and control
The default scope of a service worker registration is `./` relative to the script URL. 
This means if you register a service worker at `//example.com/foo/bar.js` it has a default scope of `//example.com/foo/`.

Your very first service worker downloads when you call .register(). If your script fails to download, parse, or throws an error in its initial execution, the register promise rejects, and the service worker is discarded.

### Install
The first event a service worker gets is `install`. It's triggered as soon as the worker executes, and it's only called once per service worker. 
If you alter your service worker script the browser considers it a different service worker, and it'll get its own `install` event.

The `install` event is your chance to cache everything you need before being able to control clients. 
The promise you pass to `event.waitUntil()` lets the browser know when your install completes, and if it was successful.

If your promise rejects, this signals the install failed, and the browser throws the service worker away. It'll never control clients. This means we can't rely on "cat.svg" being present in the cache in our fetch events. It's a dependency.

### Waiting phase
After it's successfully installed, the updated service worker delays activating until the existing service worker is no longer controlling clients. This state is called "waiting", and it's how the browser ensures that only one version of your service worker is running at a time.


Before activate phase, 
* Your service worker is considered updated if it's byte-different to the one the browser already has. (We're extending this to include imported scripts/modules too.)
* The updated service worker is launched alongside the existing one, and gets its own install event.
* Once successfully installed, the updated worker will wait until the existing worker is controlling zero clients. (Note that clients overlap during a refresh.)

see more at: https://developers.google.com/web/fundamentals/primers/service-workers/lifecycle#updates


### Activate

Once your service worker is ready to control clients and handle functional events like push and sync, you'll get an `activate` event. 
But that doesn't mean the page that called `.register()` will be controlled.

#### skipWaiting

The waiting phase means you're only running one version of your site at once, but if you don't need that feature, 
you can make your new service worker activate sooner by calling `self.skipWaiting()`.



### ServiceWorkerContainer interface

The `ServiceWorkerContainer` interface of the Service Worker API provides an object representing the service worker as an overall unit in the network ecosystem, including facilities to register, unregister and update service workers, and access the state of service workers and their registrations.

Most importantly, it exposes the `ServiceWorkerContainer.register()` method used to register service workers, and the `ServiceWorkerContainer.controller` property used to determine whether or not the current page is actively controlled.

### SErviceWorkerRegistration interface

The `ServiceWorkerRegistration` interface of the Service Worker API represents the service worker registration. 
You register a service worker to control one or more pages that share the same origin.

The lifetime of a service worker registration is beyond that of the `ServiceWorkerRegistration` objects that represent them within the lifetime of their corresponding service worker clients. The browser maintains a persistent list of active `ServiceWorkerRegistration` objects.

Properties:
```
ServiceWorkerRegistration.scope Read only
Returns a unique identifier for a service worker registration. This must be on the same origin as the document that registers the ServiceWorker.

ServiceWorkerRegistration.installing Read only
Returns a service worker whose state is installing. This is initially set to null.

ServiceWorkerRegistration.waiting Read only
Returns a service worker whose state is installed. This is initially set to null.

ServiceWorkerRegistration.active Read only
Returns a service worker whose state is activating or activated. This is initially set to null. An active worker will control a Client if the client's URL falls within the scope of the registration (the scope option set when ServiceWorkerContainer.register is first called.)

ServiceWorkerRegistration.navigationPreload Read only
Returns the instance of NavigationPreloadManager associated with the current service worker registration.

ServiceWorkerRegistration.pushManager Read only
Returns a reference to the PushManager interface for managing push subscriptions including subscribing, getting an active subscription, and accessing push permission status.

ServiceWorkerRegistration.sync  Read only
Returns a reference to the SyncManager interface, which manages background synchronization processes.

ServiceWorkerRegistration.index Read only
Returns a reference to the ContentIndex interface, for managing indexed content for offline viewing.
```

Methods:
```
ServiceWorkerRegistration.getNotifications()
Returns a Promise that resolves to an array of Notification objects.

ServiceWorkerRegistration.showNotification()
Displays the notification with the requested title.

ServiceWorkerRegistration.update()
Checks the server for an updated version of the service worker without consulting caches.

ServiceWorkerRegistration.unregister()
Unregisters the service worker registration and returns a Promise. The service worker will finish any ongoing operations before it is unregistered.

ServiceWorkerRegistration.updateViaCache
Updates the service worker registration. The extent of the update depends on the cache mode, which was set by ServiceWorkerContainer.register.
```

### Registration

Registered against origin and path.
`navigator.serviceWorker` is an instance of `ServiceWorkerContainer`.
A service worker is first registered using the `ServiceWorkerContainer.register()` method. 
If successful, your service worker will be downloaded to the client and attempt installation/activation
```js
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./firebase-messaging-sw.js')
    .then(function(registration) {
      console.log('Registration successful, scope is:', registration.scope);
    }).catch(function(err) {
      console.log('Service worker registration failed, error:', err);
  });
}
```

### run code in app after service worker is active

The `ready` read-only property of the `ServiceWorkerContainer` interface provides a way of delaying code execution until a service worker is active. 
It returns a Promise that will never reject, and which waits indefinitely until the `ServiceWorkerRegistration` associated with the current page has an active worker
```js
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.ready
  .then(function(registration) {
    console.log('A service worker is active:', registration.active);

    // At this point, you can call methods that require an active
    // service worker, like registration.pushManager.subscribe()
  });
} else {
  console.log('Service workers are not supported.');
}
```