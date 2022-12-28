

## How expo native code gets included?

1. Generated `PackageList.java` in `android/app/build/generated...` contains a reference to `ExpoModulesPackage`
2. `ExpoModulesPackage` itself collects a list of expo packages in pre-build step via expo autolinking scripts, which inturn reads via reflection all info from generated file: `ExpoModulesPackageList.java`.


## How expo hacks into original RN flow

### On android

1. THe main idea is to create a custom `ReactActivityDelegate` via overriding `createReactActivityDelegate()` method in `MainActivity` to hook into all important methods/messages like loadApp, onCreate, createRootView calls. Although MainActivity uses a custom ReactActivityDelegate, the DevLauncherActivity uses a different ReactActivityDelegate, overriden via method `createReactActivityDelegate()` in `DevLauncherActivity.kt`, where it uses custom RNhost - `controller.devClientHost`
2. `ReactActivityHandler.onDidCreateReactActivityDelegate` allows you to return a different activityDelegate, which will followed by calling `onCreate` on newly returned ActivityDelegate object.
3. Custom ReactNativeHost to hook into custom creation of `ReactInstanceManager` and other events.
4. AppLoader does injectDevSupportManager, which maintains a `DevLauncherInternalSettings.kt extends DevInternalSettings` to have extra member for host-url/ip that was scanned from QR scanner/ip-address in urls scheme params or clicked on dev-launcher screen -> `injectDebugServerHost() method`, and works with RN's PackagerConnection class to modify all this.
