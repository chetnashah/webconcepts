
## 

https://developer.apple.com/documentation/uikit/uiapplicationdelegate/1623013-application

### didReceiveRemoteNotification

**the system calls this method when your app is running in the foreground or background**

When a remote notification arrives, the system displays the notification to the user and launches the app in the background (if needed) so that it can call this method. 

Launching your app in the background gives you time to process the notification and download any data associated with it, minimizing the amount of time that elapses between the arrival of the notification and displaying that data to the user.


**if you enabled the remote notifications background mode, the system launches your app (or wakes it from the suspended state) and puts it in the background state when a remote notification arrives.**

**However, the system does not automatically launch your app if the user has force-quit it. In that situation, the user must relaunch your app or restart the device before the system attempts to launch your app automatically again.**

`application(_:didReceiveRemoteNotification:fetchCompletionHandler:)` - Tells the app that a remote notification arrived that indicates there is data to be fetched.

```swift
optional func application(
    _ application: UIApplication,
    didReceiveRemoteNotification userInfo: [AnyHashable : Any],
    fetchCompletionHandler completionHandler: @escaping (UIBackgroundFetchResult) -> Void
)
```