Get user auth/permission for (needed for both local/remote)
1. Banners
2. Sound alerts
3. Badging

### Local Notifications
Local code driven/posted - 
Task reminder alerts
Location alerts etc.


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