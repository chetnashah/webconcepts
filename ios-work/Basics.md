
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

all the Xcode projects in a workspace are built in the same directory, referred to as the workspace build directory. Each workspace has its own build directory. Because all of the files in all of the projects in a workspace are in the same build directory, all of these files are visible to each project. Therefore, if two or more projects use the same libraries, you don’t need to copy them into each project folder separately.

https://developer.apple.com/library/archive/featuredarticles/XcodeConcepts/Concept-Workspace.html

### Target

Build settings defined at target level override any values
assigned to those build settings at project level.

A `target` contains instructions in the form of build settings and build phases
for building a project. A target inherits projects build settings.

Useful part about targets: Each target can be present on the device side by side.

A target specifies a product to build and contains the instructions for building the product from a set of files in a project or workspace. A target defines a single product; it organizes the inputs into the build system—the source files and instructions for processing those source files—required to build that product. Projects can contain one or more targets, each of which produces one product.

The instructions for building a product take the form of build settings and build phases, which you can examine and edit in the Xcode project editor. A target inherits the project build settings, but you can override any of the project settings by specifying different settings at the target level. There can be only one active target at a time; the Xcode scheme specifies the active target.

A target and the product it creates can be related to another target. If a target requires the output of another target in order to build, the first target is said to depend upon the second. If both targets are in the same workspace, Xcode can discover the dependency, in which case it builds the products in the required order. Such a relationship is referred to as an implicit dependency. You can also specify explicit target dependencies in your build settings, and you can specify that two targets that Xcode might expect to have an implicit dependency are actually not dependent. For example, you might build both a library and an application that links against that library in the same workspace. Xcode can discover this relationship and automatically build the library first. However, if you actually want to link against a version of the library other than the one built in the workspace, you can create an explicit dependency in your build settings, which overrides this implicit dependency.


### Build configuration

A build setting is a variable that contains information about how a particular aspect of a product’s build process should be performed. For example, the information in a build setting can specify which options Xcode passes to the compiler.

A build configuration specifies a set of build settings used to build a target's product in a particular way

One of several possible configurations. The one which is used right now is stored as 
a part of the current scheme.

### Scheme

An Xcode scheme defines a collection of targets to build, a configuration to use when building, and a collection of tests to execute.

You can have multiple scehmes (variants) of your app, but only one is active at a time (shown on top left near play button).
A scheme uses a one specific build configuration at a time.
TO change the build configuration used by current scheme, you need to edit the sceheme.

A scheme can have multiple targets (to be built).
One can view all the targets of the scheme by going to
edit scheme -> Build on the left pane.

schemes are saved in separate xml file within xcuserdata or xcshareddata. The .xcscheme files are standard xml.

You can have as many schemes as you want, but only one can be active at a time. You can specify whether a scheme should be stored in a project—in which case it’s available in every workspace that includes that project, or in the workspace—in which case it’s available only in that workspace. When you select an active scheme, you also select a run destination (that is, the architecture of the hardware for which the products are built).



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

### NSNOtification

Similar as Localbroadcastmanager or eventbus.

### ActionSheet(bottoms sheet UI) and AlertDialog(center modal uI)

common class `UIAlertController` for both, just differnet styles.
```swift
var alert = UIAlertController(
    title:"some title",
    message:"Issue commands",
    preferredStyle: UIAlertControllerStyle.ActionSheet
    // use UIAlertControllerStyle.Alert for Alert dialog
)
// add buttons
alert.addAction(UIAlertAction(/* config */))
alert.addAction(UIAlertAction(/* config */))
alert.addAction(UIAlertAction(/* config */))

// show the alert/actionsheet
presentViewController(alert, animated: true, completion: nil)
```

### NSUserDefaults

Equivalent to `SharedPreferences` on android.
Very tiny storage for property list data. i.e. key/value pairs e.g. useful for 
settings.

### Push Notifications

If you receive local or remote notifications while your app is running in the foreground, you are responsible for passing the info to your users in an app specific way.

### Grand central dispatch

SYstem library for scheduling in multi threaded code.
Maintaines a pool of threads.
Decides which thread is used for execution.
A `dispatch queue` is a queue onto which work can be put to be scheduled.
Work submitted to the main dispatch queue is guaranteed to be executed on the main thread.

```swift
DispatchQueue.main.async {
    // some work to be done on main thread.
}

DispatchQueue.global().async {
    // dome work
}
```


