
## Request for authorization

**Usually do this on a button click**

```swift
let center = UNUserNotificationCenter.current()
center.requestAuthorization(options: [.alert, .sound, .badge]) { granted, error in
    
    if let error = error {
        // Handle the error here.
    }
    
    // Enable or disable features based on the authorization.
}
```
