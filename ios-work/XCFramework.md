

## What is XCFramework?

An XCFramework bundle, or artifact, is a binary package created by Xcode that includes the frameworks and libraries necessary to build for multiple platforms (iOS, macOS, tvOS, and watchOS), including Simulator builds. The frameworks can be static or dynamic and also include headers.

## Creating an XCFramework using (`xcodebuild archive`)

```
xcodebuild archive 
    -project MyFramework.xcodeproj
    -scheme MyFramework
    -destination "generic/platform=iOS"
    -archivePath "archives/MyFramework"
```

## Multiple platforms and variants into single bundle

```
xcodebuild -create-xcframework
    -archive archives/MyFramework-iOS.xcarchive -framework MyFramework.framework
    -archive archives/MyFramework-iOS_Simulator.xcarchive -framework MyFramework.framework
    -archive archives/MyFramework-macOS.xcarchive -framework MyFramework.framework
    -archive archives/MyFramework-Mac_Catalyst.xcarchive -framework MyFramework.framework
    -output xcframeworks/MyFramework.xcframework
```

To include static lib, `.a` inside xcframework bundle use `-library`
```
xcodebuild -create-xcframework
    -library products/iOS/usr/local/lib/libMyLibrary.a -headers products/iOS/usr/local/include
    -library products/iOS_Simulator/usr/local/lib/libMyLibrary.a -headers products/iOS/usr/local/include
    -library products/macOS/usr/local/lib/libMyLibrary.a -headers products/macOS/usr/local/include
    -library products/Mac\ Catalyst/usr/local/lib/libMyLibrary.a -headers products/Mac\ Catalyst/usr/local/include
    -output xcframeworks/MyLibrary.xcframework
```

## Determine architechture support

To determine the architectures an existing binary includes, execute file from Terminal and provide the path to the binary.

```
file <PathToFramework>/<FrameworkName>.framework/<FrameworkName>
file <PathToLibrary>/libMyLibrary.a
```