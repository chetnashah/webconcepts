
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

Apple has changed the way that remote notifications are delivered when an app is running in the background (i.e. opened but minimised by the user) in iOS 13 and above.

If you take no further action, when your app is running in the background the `application:didReceiveRemoteNotification:fetchCompletionHandler:` method **will not be called until the user brings the app to the foreground by tapping on the notification.** The method call will also be delayed after the app enters the foreground, depending on the type of the received notification.

**To ensure that the AppDelegate method is called immediately after a notification is displayed when your app is running in the background and (as was the case with iOS 12 and below), you must implement a Notification Service Extension.**

https://pusher.com/docs/beams/guides/handle-incoming-notifications/ios/


There are actually many cases to consider here: https://medium.com/fantageek/push-notification-in-ios-46d979e5f7ec#:~:text=If%20your%20delegate%20implements%20both%20methods%2C%20the%20app,the%20appropriate%20information%20in%20the%20launch%20options%20dictionary.

## Case 1: Foreground
### Loud push

1. No system alert
2. `application:didReceiveRemoteNotification:fetchCompletionHandler:` is called

### Silent push

1. No system alert
2. `application:didReceiveRemoteNotification:fetchCompletionHandler:` is called

## Case 2: Background
### Loud push

1. System alert
2. No method called
3. Tap notification and `application:didReceiveRemoteNotification:fetchCompletionHandler:` is called
4. Tap on App Icon and nothing is called

### Silent push

1. System alert
2. `application:didReceiveRemoteNotification:fetchCompletionHandler:` is called. If app is suspended, its state changed to UIApplicationStateBackground
3. Tap notification and `application:didReceiveRemoteNotification:fetchCompletionHandler:` is called
4. Tap on App Icon and nothing is called

## Case 3: Terminated
### Loud push

1. System alert
2. No method called
3. Tap notification and `application:didFinishLaunchingWithOptions:` with `launchOptions`, `application:didReceiveRemoteNotification:fetchCompletionHandler:` is called
4. Tap on App Icon and `application:didFinishLaunchingWithOptions:` is called with launchOptions set to nil

### Silent push

1. System alert
2. `application:didReceiveRemoteNotification:fetchCompletionHandler:` is called. If app was not killed by user, it is woke up and state changed to UIApplicationStateInactive.
3. Tap notification and `application:didFinishLaunchingWithOptions:` with launchOptions, `application:didReceiveRemoteNotification:fetchCompletionHandler:` is called
4. Tap on App Icon and `application:didFinishLaunchingWithOptions:` is called with launchOptions set to nil


### open URL - application(_:open:options:)

Asks the delegate to open a resource specified by a URL, and provides a dictionary of launch options.
This is basically the deep link click callback.

If a URL arrives while your app is suspended or running in the background, the system moves your app to the foreground prior to calling this method.


```swift
optional func application(
    _ app: UIApplication,
    open url: URL,
    options: [UIApplication.OpenURLOptionsKey : Any] = [:]
) -> Bool
```


### will/didFinishLaunchWithOptions

Tells the delegate that the launch process is almost done and the app is almost ready to run.

`application(_:didFinishLaunchingWithOptions:)` 

Full declaration:
```swift
optional func application(
    _ application: UIApplication,
    didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey : Any]? = nil
) -> Bool
```

This method represents your last chance to process any keys in the launchOptions dictionary.

Alternate callback - Objects that are not the app delegate can access the same launchOptions dictionary values by observing the notification named didFinishLaunchingNotification and accessing the notification’s userInfo dictionary. That notification is sent shortly after this method returns.

**launchOptions** - **A dictionary indicating the reason the app was launched (if any).** The contents of this dictionary may be empty in situations where the user launched the app directly.

return value - false if the app cannot handle the URL resource or continue a user activity, otherwise return true. The return value is ignored if the app is launched as a result of a remote notification.




