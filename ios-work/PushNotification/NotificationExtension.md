

## When would we need to modify notification content before displaying?

You may want to modify the content of a remote notification on a user’s iOS device if you need to:

1. Decrypt data sent in an encrypted format.

2. Download images or other media attachments whose size would exceed the maximum payload size.

3. Update the notification’s content, perhaps by incorporating data from the user’s device.

## Need for NotificationExtension

The app extension receives the contents of your remote notifications before the system displays them to the user, giving you time to update the notification payload.

## Configure payload for running extension

The payload must include the `mutable-content` key with a value of `1`.

The payload must include an `alert` dictionary with `title`, `subtitle`, or `body` information.


