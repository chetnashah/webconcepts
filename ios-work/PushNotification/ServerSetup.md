The delivery of remote notifications involves several key components:

1. Your company’s server, known as the **provider server**

2. Apple Push Notification service (APNs)

3. The user’s device

4. Your app running on the user’s device

## Getting device token

In iOS and tvOS, call the `registerForRemoteNotifications()` method of `UIApplication` to request the device token. Upon successful registration, you receive the token in your app delegate’s `application(_:didRegisterForRemoteNotificationsWithDeviceToken:)` method.

### Error handling

prepare your app to handle unsuccessful registrations by implementing the application`(_:didFailToRegisterForRemoteNotificationsWithError:)` method

### Code

```swift
func application(_ application: UIApplication,
           didFinishLaunchingWithOptions launchOptions:
           [UIApplicationLaunchOptionsKey: Any]?) -> Bool {
   // Override point for customization after application launch.
       
   UIApplication.shared.registerForRemoteNotifications()
   return true
}


func application(_ application: UIApplication,
            didRegisterForRemoteNotificationsWithDeviceToken 
                deviceToken: Data) {
   self.sendDeviceTokenToServer(data: deviceToken)
}


func application(_ application: UIApplication,
            didFailToRegisterForRemoteNotificationsWithError 
                error: Error) {
   // Try again later.
}
```
