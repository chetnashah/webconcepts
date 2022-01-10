
### Tag

Tag

Defining a tag for a notification means that when a new Notification is shown with the same tag, any old notifications with that tag are removed before the new notification is shown.

### require interaction

On desktop, a notification is only displayed for a short period of time. On Android, notifications are shown until the user interacts with it.

To get the same behaviour on desktop and mobile you can set the “require-interaction” option to true, which means the user must click or dismiss the notification.

### Open a windo

https://web-push-book.gauntface.com/common-notification-patterns/#open-a-window

```js
  const promiseChain = clients.openWindow(examplePageURL);
  event.waitUntil(promiseChain);
```

### Merging notifications

You can however get more sophisticated with the collapsing of notifications using the Notifications API. Consider a chat app, where the developer might want a new notification to show a message similar to “You have two messages from Matt” rather than just showing the latest message.

You can do this, or manipulate current notifications in other ways, using the registration.getNotifications() API which gives you access to all the currently visible notifications for your web app.

### Adding code to notification interaction

Adding Data to a Notification
This is a trivial example. When the notification is shown it is given a data parameter in the showNotification() options. When the notification is clicked, it prints this data to the console.

This data attribute is incredibly useful for passing information from the time when a notification is shown, to when a notification is clicked.

### Post message to clients
```js
  if (await isClientFocused()) {
    const windowClients = await clients.matchAll({
      type: 'window',
      includeUncontrolled: true
    });
    windowClients.forEach((windowClient) => {
      windowClient.postMessage({
        message: 'Received a push message.',
        time: new Date().toString()
      });
    });
    return;
  }

  return self.registration.showNotification('No focused windows', {
    body: 'Had to show a notification instead of messaging each page.'
  });
```