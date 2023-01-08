
## Preprocessing


### Relevant buildsettings

1. `INFOLIST_PREPROCESS`: To enable infolist preprocessing, set this to YES.
2. INfo.plist preprocessor prefix file (`INFOPLIST_PREFIX_HEADER`): files that would be used during preprocessing header, name them something like `InfoPlistPrefix.Debug.h` and `InfoPlistPrefix.Release.h`. So you can actually set it like `$(PROJECT_DIR)/$(PROJECT_NAME)/Supporting Files/InfoPlistPrefix.$(CONFIGURATION).h`
3. The content of the above file can contain macros that can be used as placeholders in `Info.plist` file e.g.
```
//InfoPlistPrefix.Release.h
#define COPYRIGHT Copyright (c) 2014
```
These can be used in Info.plist like placeholders
```xml
<key>NSHumanReadableCopyRight</key>
<string>COPYRIGHT</string>
```
4. `INFOPLIST_PREPROCESSOR_DEFINITIONS` build setting: similar job as preprocessing header file.

