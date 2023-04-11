

## Handle notification when app is in foreground

By default if a notification is triggered when app is in foreground, it will not be shown in tray/banner.

If a notification arrives **when your app is running in the foreground, the system delivers that notification directly to your app**. 

Upon receiving a notification, you can use the notification’s payload to do whatever you want. For example, you can update your app’s interface to reflect new information contained in the notification, and you can also use it to show PN in center via `completionHandler`.

**Method called on UNNotificationCenter's delegate's willPresent method** - When a notification arrives, the system calls the `userNotificationCenter(_:willPresent:withCompletionHandler:)` method of the UNUserNotificationCenter object’s delegate.

**Note** - `willPresent` is called on the delegate, only if app is in foreground. To carry on showing the PN, use `completionHandler(.banner)`.


### Example

```swift
class NotificationCenterDelegate : NSObject, UNUserNotificationCenterDelegate {
    // called if app in foreground, you can decide whether to show PN or not via completionHandler.
    func userNotificationCenter(_ center: UNUserNotificationCenter, willPresent notification: UNNotification, withCompletionHandler completionHandler: @escaping (UNNotificationPresentationOptions) -> Void) {
        print("NotificationCenter Delegate, willPresent!");
        completionHandler(.banner);
    }   

    func userNotificationCenter(_ center: UNUserNotificationCenter, didReceive response: UNNotificationResponse, withCompletionHandler completionHandler: @escaping () -> Void) {
        print("Did receive with completion handler in Notificationcenter delegate");
        completionHandler();
    }
}
```