

## UNUserNotificationCenterDelegate

An interface for processing incoming notifications and responding to notification actions

### Interface methods

1. click handling - `didReceive:response` i.e. `func userNotificationCenter(UNUserNotificationCenter, didReceive: UNNotificationResponse, withCompletionHandler: () -> Void)`
2. will present in foreground - `willPresent notification` is `userNotificationCenter(_:willPresent:withCompletionHandler:)` - Asks the delegate how to handle a notification that arrived while the app was running in the foreground.

## Registering UNNotification center delegate

Makes sense to do after user authorization
```swift
let center = UNUserNotificationCenter.current()
center.delegate = self
```
