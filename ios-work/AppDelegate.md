

`AppDelegate` setup is a core class having important applicationcallbacks like `applicationDidfinishLaunchingWithOptions` etc.

## AppDelegate Extends UIResponder, implements UIApplicationDelegate

```swift
// AppDelegate.swift
class AppDelegate: UIResponder, UIApplicationDelegate
```

In objc:
```objc
// AppDelegate.h
#import <UIKit/UIKit.h>

@interface AppDelegate : UIResponder <UIApplicationDelegate>

@property (strong, nonatomic) UIWindow *window;


@end
```