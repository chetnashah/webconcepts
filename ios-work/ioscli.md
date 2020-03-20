

### List all Targets, Build Configurations and Schemes

```sh
xcodebuild -list
```

### List all schemes of the app:

```sh
xcodebuild -workspace MyApp.xcworkspace -list
# or
xcodebuild -project MyApp.xcodeproj -list
```

### Show build settings for a given scheme

```sh
xcodebuild -xcworkspace MyApp.xcworkspace -scheme My-App-Scheme -showBuildSettings
```

### Build workspace with scheme

```sh
xcodebuild build -workspace MyApp.xcworkspace -scheme My-App-Scheme
```
Note: `build` is optional, default action is build.
Use `clean` instead of build if you want to clean

### archive workspace

```sh
xcodebuild archive -workspace MyApp.xcworkspace -scheme My-App-Scheme 
    -archivePath ~/Downloads/My-App.xcarchive 
```

### create an IPA
```sh
xcodebuild -exportArchive -archivePath ~/Downloads/My-App.xcarchive
    -exportPath ~/Downloads -exportOptionsPlist ~/Donwloads/ExportOptions.plist
```

#### What is ExportOptions.plist? 

Lets you specify some options when you create an `.ipa` file.

