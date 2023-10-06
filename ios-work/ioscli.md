

codesign manpage - https://www.manpagez.com/man/1/codesign/

security cli manpage - https://ss64.com/osx/security.html


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

### codesign

tool to sign

Things need to sign
1. signing cert
2. prov profile
3. Entitlement

#### types of cert

cert are all about identity

1. dev
2. distribution

## find all code signing identities

```sh
security find-identity -v -p codesinging
```

## Inspect provisioning profile contents

```sh
security cms -D -i myprovprofile.mobileprovision
```

## List local keychains

```sh
security list-keychains -d user
```

## ios-deploy tool 

### list all provisioning profiles on device

```sh
ios-deploy --list_profiles
```

### list all devices

```sh
ios-deploy -c
```

## Run UI tests

```sh
xcodebuild test -project PlainPNApp.xcodeproj -scheme PlainPNApp -destination 'platform=iOS Simulator,name=iPhone 14'
```