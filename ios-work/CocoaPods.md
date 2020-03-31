
CocoaPods will resolve dependencies between libraries, fetch
the resulting source code, then link it together in an XCode Workspace to
build your project.

You specify dependencies for each target. Pods will be linked to that target.

### creating Podfile for the first time

```
pod init
```

### Version control

`Pods` directory can be ignored, but `Podfile` and `Podfile.lock`
should always be kept under source control.

### What is happening

1. creates or updates workspace.
2. adds your project to workspace if needed.
3. Adds cocoapods static library project to the workspace if needed.
4. Add `libPods.a` to : `targets => build phases => link with libraries`
5. Adds the CocoaPods Xcode configuration file to your app's project.
6. Changes your app's target configurations to be based on CocoaPod's
7. Adds a build phase to copy resources from any pods you installed to your app bundle
i.e a `Script build phase' after all other build phases with the following:
    a. shell: `/bin/sh`
    b. Script: `${SRCROOT}/Pods/PodsResources.h`
