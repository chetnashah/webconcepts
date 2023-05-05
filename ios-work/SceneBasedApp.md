
If you enable scene support in your app, iOS always uses your scene delegates in iOS 13 and later. In iOS 12 and earlier, the system uses your app delegate.

### How to check scene support?

Navigate to the General settings for your app target.

Enable the “Supports multiple windows” checkbox in the Deployment Info section.

When you enable the multiple windows option, Xcode adds the `UIApplicationSceneManifest` key to your app’s  `Info.plist` file. The presence of this key tells the system that your app supports scenes.