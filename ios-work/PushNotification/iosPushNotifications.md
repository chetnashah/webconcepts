
Since iOS 8 you need to ask user's permission to show notifications from your app, this applies for both remote/push and local notifications.

https://developer.apple.com/videos/play/wwdc2020/10095/

Get user auth/permission for (needed for both local/remote)
1. Banners
2. Sound alerts
3. Badging

## App level OS notification settings

1. show on lockscreen - true/false
2. show on notification center i.e the tray/shade - true/false
3. show as banners - true/false

### Local Notifications
Local code driven/posted - 
Task reminder alerts
Location alerts etc.



## Time sensitive notifications

Introduced only on ios15.
**Always delivered immediately, and remain on lockscreen for an hour**
The system presents the notification immediately, lights up the screen, and can play a sound, but won’t break through system notification controls.

## Provisional Authorization (Since ios12)

We usually see a notification prompt at the start of the app to "Allow".
User does not know what kind of notifications the app is going to send.

Provisional Authorization - Automatic trial of Notifications from your app.
**If app opts into provisional authorization, users will not see Prompt, but the notifications will be delivered quietly.**

Provisional notifications will have a prompt within the notification itself - Keep/TurnOff as actions.

## Critical Alerts

Bypass all settings/DND.
will play a sound, and it is disruptive.

Useful for healt/medical/emergency apps.
Need entitlement from apple.

Dedicated section in app notification settings.
Also need a prompt.

### Remote Notifications

APNs is involved.
Server -> APNs -> Best effort delivery to App
e.g.
Instant message.
News Alert
Sports updates.

Sub types:
1. User facing
2. Silent update - Background app refresh. {content_Available: 1}, api requests possible.


### APNS APIs
Authorization: `requestAuthorization(options)`. If this is not called, all delivery of remote notifications is silent.

APNS has its own token/registration mechanism.
`UIAPplication.registerForRemoteNotifications()` and has following callbacks
1. `application(_app, didRegisterForRemoteNotificationsWithDeviceToken deviceToken: data)` - this function has devicetoken, that should be sent ot server to trigger notifications
2. `didFailToRegisterForeRemoteNOtifications`.


## Notification grouping

Starting with IOS12, notifications shall be grouped under app name.
You can have more custom groups per app, by specifying unique thread-identifier per group.
But user can go to Notification settings and override automatic i.e. thread-id based grouping, or turn off grouping.

The latest notification on top of group.
Clicking on group expands the group into a list.

Grouping helps clear all notifications together.


## NotificationContent extension (different from notificationserviceextension)

Much more customized notification.
`func didReceive(_ notification: UNNotification)` is the entry point into the ContentExtension.

`UNNotificationContentExtension`:
An object that presents a custom interface for a delivered local or remote notification.

## Handling actions from notification

Delegate protocol: `UNUserNotificationCenterDelegate` -> didreceive Response, withCompletionHandler handler.

Here we can decide if we want to dismiss or not, or dismiss and forward to app delegate.

### Notification action updated dynamically

but these limitations are gone since ios12, if you use
```
extension NSExtensionContext {
    @available(ios12)
    var notificationActions : [UNNotificationActions]
}
```
This is a mutable collection of actions which reactively updates the UI


## NotificationServiceExtension

`UNNotificationServiceExtension`
An object that modifies the content of a remote notification before it’s delivered to the user


## UNNotificationCategory

**The system also uses categories to determine whether it should launch your notification service app extension or notification content app extension** - how?

A `UNNotificationCategory` object defines a type of notification that your executable can receive. You create category objects to define your app’s actionable notifications — notifications that have action buttons the user can select in response to the notification.

Each `category` object you create stores the actions and other behaviors associated with a specific type of notification. Register your category objects using the `setNotificationCategories(_:)` method of `UNUserNotificationCenter`. You can register as many category objects as you need.

https://developer.apple.com/documentation/usernotifications/unnotificationcategory


To support actionable notifications, you must:

* Declare one or more notification categories at launch time from your iOS app.
* Assign appropriate actions to your notification categories.
* Handle all actions that you register.
* Assign category identifiers to notification payloads when generating notifications.

## Silent notifications

https://developer.apple.com/documentation/usernotifications/setting_up_a_remote_notification_server/pushing_background_updates_to_your_app

A background notification is a remote notification that doesn’t display an alert, play a sound, or badge your app’s icon. It wakes your app in the background and gives it time to initiate downloads from your server and update its content.

**Limitations** - the system may throttle the delivery of background notifications if the total number becomes excessive. The number of background notifications allowed by the system depends on current conditions, but don’t try to send more than two or three per hour.

Your app has 30 seconds to perform any tasks and call the provided completion handler.

### background modes capability

To receive background notifications, you must add the remote notifications background mode to your app. In the Signing & Capability tab, add the Background Modes capability.



## How do I put a link to in-app notification settings from OS app notification settings?

Use `.providesAppNotificationSettings` as an additional option passed inside `requestAuthorization` call.

e.g.
```swift
    UNUserNotificationCenter.current().requestAuthorization(options: [.alert, .sound, .badge,.providesAppNotificationSettings], completionHandler:  { authorized, err in
        print("granted = ", authorized)
    })
```

How it looks:
![In app settings link](images/inappsettingslink.png)

## Local Notifications

**Note** - event to show local notifications, you need User permission authorization.

**By default triggered local notification is not shown if app is in foreground!**

### UNMutableNotificationContent

Create one to setup body/title content

### UNNotificationTrigger

We need to define a trigger, one of:
1. Location trigger
2. Time based trigger
3. Calendar event trigger

Here is an example of time based trigger:
```swift
let trigger = UNTimeIntervalNotificationTrigger(timeInterval: 5, repeats: false)
```

### Scheduling Local Notification with UNNotificationRequest that combines UNMutableNotificationContent + UNNotificationTrigger

```swift
let request = UNNotificationRequest(identifier: "mynotif", content: content, trigger: trigger);
```

### Add to UNUserNotificationCenter with `.current().add`

```swift
let notificationCenter = UNUserNotificationCenter.current()
notificationCenter.add(request) { (error) in
   if error != nil {
      // Handle any errors.
   }
}
```

### Complete example

```swift
func createLocalNotification(title: String) {
  let content = UNMutableNotificationContent()
  content.title = title;
  content.body = "Notification body";
  
  let trigger = UNTimeIntervalNotificationTrigger(timeInterval: 5, repeats: false)
  
  let request = UNNotificationRequest(identifier: "mynotif", content: content, trigger: trigger);
  
  UNUserNotificationCenter.current().add(request) {
      (error) in
      if error != nil {
          print(error)
      }
  }
}
```