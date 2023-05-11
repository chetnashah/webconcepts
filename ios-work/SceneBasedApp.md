
If you enable scene support in your app, iOS always uses your scene delegates in iOS 13 and later. In iOS 12 and earlier, the system uses your app delegate.

**By default when you create a new project in Xcode, it makes a scene based app**.

### How to check scene support?

Navigate to the General settings for your app target.

Enable the “Supports multiple windows” checkbox in the Deployment Info section.

When you enable the multiple windows option, Xcode adds the `UIApplicationSceneManifest` key to your app’s  `Info.plist` file. The presence of this key tells the system that your app supports scenes.


## How to opt out of scene based app?

**Completely remove the “Application Scene Manifest” entry from Info.plist.**

1. If there is a scene delegate class, remove it.
2. If there are any scene related methods in your app delegate, remove those methods.
3. If missing, add the property var window: UIWindow? to your app delegate.
4. Your app should now only use the app delegate and under iOS 13 it should have the same life cycle as iOS 12.

