

https://developer.apple.com/documentation/bundleresources/placing_content_in_a_bundle

## What is a Bundle?

A bundle is a directory with a standardized hierarchical structure that typically contains executable code and the resources used by that code.

## What can be a Bundle?

Bundles fulfill many different roles: 
1. apps, 
2. app extensions, 
3. frameworks, and 
4. plug-ins are all bundles. 

Bundles can also contain other bundles; for example, an app may contain an app extension.

Xcode understands the bundle structure and, if you use Xcode to build your bundle, it places content correctly based on its type.

## What goes inside a Bundle?

1. Info.plist
2. Code - Executable or Another Bundle
3. Resources - Images/assets etc. 

### Info.plist

`/Info.plist`

### Provisioning profile

`embedded.mobileprovision`

### App Extensions

`/PlugIns/`

### Framework/Dynamic Libraries

`/Frameworks/`

### Resources

`/`

### Main Executable

`/`


## Direct `.dylib` is not supported on `iOS`, they must be packaged inside a framework

iOS, watchOS, and tvOS support third-party frameworks but don’t support third-party standalone dynamic libraries, which are those outside a framework bundle, typically with the `.dylib` filename extension. The only exception to this rule is the Swift system libraries provided by Xcode.



