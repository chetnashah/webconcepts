

https://tanaschita.com/20221010-quick-guide-on-the-ios-file-system/

## FileManager (NSFileManager in Objective C)

You use it to locate, create, copy, and move files and directories. You also use it to get information about a file or directory or change some of its attributes.


### Delegate for FileManager events

If you are moving, copying, linking, or removing files or directories, you can use a delegate in conjunction with a file manager object to manage those operations. The delegate’s role is to affirm the operation and to decide whether to proceed when errors occur. In macOS 10.7 and later, the delegate must conform to the `FileManagerDelegate` protocol.



## 

### Bundle Container Directory
**contains the app's bundle ExampleApp.app with all of its resource files that we included within the app like images, string files, localized resources** etc. has read-only access.

### Data Container Directory
holds data for both the app and the user.
is divided into the following directories:
1. `Documents` - to store user-generated content.
2. `Library` - to store app files that should not be exposed to user.
3. `tmp` - for temporary files. The system periodically purges these files.