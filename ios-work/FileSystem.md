

https://tanaschita.com/20221010-quick-guide-on-the-ios-file-system/


## 

### Bundle Container Directory
**contains the app's bundle ExampleApp.app with all of its resource files that we included within the app like images, string files, localized resources** etc. has read-only access.

### Data Container Directory
holds data for both the app and the user.
is divided into the following directories:
1. `Documents` - to store user-generated content.
2. `Library` - to store app files that should not be exposed to user.
3. `tmp` - for temporary files. The system periodically purges these files.