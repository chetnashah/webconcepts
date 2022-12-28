

## How expo native code gets included?

1. Generated `PackageList.java` in `android/app/build/generated...` contains a reference to `ExpoModulesPackage`
2. `ExpoModulesPackage` itself collects a list of expo packages in pre-build step via expo autolinking scripts, which inturn reads via reflection all info from generated file: `ExpoModulesPackageList.java`.


