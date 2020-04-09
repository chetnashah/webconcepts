
### Project types

Start with `Single View application`.

### App ID

Basically also known as bundle identifier is similar to package name of
the app and is usually reverse dns naming e.g. `com.mydomain.myappname`

Other convention used by xcode is `orgIdentifier.ProjectName`

### Device UDID

Unique identifier for each physical device.

### Provisioning Profile

Combination of 
1. App ID
2. on restricted set of devices (UDIDs)
3. with trust based on signing by a developer (Certificate)

It is in app settings to select a provisioning profile.

The developer certificate contains developer's public key info(registered with apple also)
which is signed by Apple CA.

For ios development, you have two cetrts,
one prefixed with IphoneDeveloper and other with iPhoneDistribution.

Code/binary signing of the app is done using dev's private key which corresponds to public key
in his certificate. This corresponding certificate should be present in provisioning profile (which you selected in build settings) list of certificates.

Difference between distribution profile and dev profile - distribution profile does not contain
device ids.

Keychain can manage private keys

If you have a team setup, provisioning profile is automatically managed on selecting a team.

### AppDelegate
Controls application as a whole e.g. `applicationWillTerminate`, `applicationWillEnterForeground` etc.

### ViewController

View related controlling etc. btn clicks, mounting callbacks, view event handling etc.

### SafeArea

An area which will not be blocked by hardware.

### Adding new objects in storyboard

Use the "+" icon on top right corner


### Workspace

A workspace is xcode document that groups projects and other documents so
that you can work on them together. A workspace can contain any number
of Xcode projects, plus any other files you would want to include.
A workspace provides implicit and explicit relationships among the included
projects and their targets.

`Note`: All Xcode projects in a workspace are built in the same directory referred to
as `workspace build directory`.

### Target

Build settings defined at target level override any values
assigned to those build settings at project level.

A `target` contains instructions in the form of build settings and build phases
for building a project. A target inherits projects build settings.

Useful part about targets: Each target can be present on the device side by side.

### Build configuration

One of several possible configurations. The one which is used right now is stored as 
a part of the current scheme.

### Scheme

You can have multiple scehmes (variants) of your app, but only one is active at a time (shown on top left near play button).
A scheme uses a one specific build configuration at a time.
TO change the build configuration used by current scheme, you need to edit the sceheme.

A scheme can have multiple targets (to be built).
One can view all the targets of the scheme by going to
edit scheme -> Build on the left pane.

schemes are saved in separate xml file within xcuserdata or xcshareddata. The .xcscheme files are standard xml.

### Access build settings in code

User defined Build settings for different configuration like `SERVER_URL`.
You need to reference them in `INfo.plist`.
Anything put inside `Info.plist` is available to code.

like `ServerUrl: $(SERVER_URL)`
and in code you can access like
```swift
let serverUrl = Bundle.main.object(forInfoDictionaryKey: "ServerURL") as! String
print(serverUrl)
```

### Build Rules (Xcode UI)

Build rules specify how different file types
should be compiled. If u want to add custom processing
for a certain file type, you can add a new build rule.

### Frameworks, libraries and Embedded Content (XCode UI General)


### Link Binary with Libraries (Xcode UI Build phases)

### Frameworks

Most frameowrks are shared libraries with hassle free packaging.
Directories of a frameowrk:
1. Headers: Public exposed C/ObjC headers. Swift does not use these.
2. Modules: LLVM and swift module info. `.modulemap` files are used by clang.
3. Resources: All kinds of assets/images
4. Versions: 

### Push Notifications

If you receive local or remote notifications while your app is running in the foreground, you are responsible for passing the info to your users in an app specific way.

