https://developer.apple.com/library/archive/documentation/General/Conceptual/ExtensibilityPG/index.html#//apple_ref/doc/uid/TP40014214-CH20-SW1

## Check if code ran in an Extension?
```
if ([[[NSBundle mainBundle] bundlePath] hasSuffix:@".appex"]) {
    // this is an app extension
}

// Swift version
if Bundle.main.bundlePath.hasSuffix(".appex") {
    // this is an app extension
}
```