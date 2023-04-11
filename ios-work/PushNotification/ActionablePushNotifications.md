

## Action handlers are called back on UNNOtificationCenter's delegate object

When the user selects an action, the system launches your app in the background and calls the delegate’s `userNotificationCenter(_:didReceive:withCompletionHandler:)`method. 

Match the value in the `actionIdentifier` property of the response object to one of your app’s actions or a system-defined action

