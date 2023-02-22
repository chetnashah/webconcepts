

EAS Build is available to anyone with an Expo account, regardless of whether you pay for EAS or use our free tier. You can sign up at https://expo.dev/signup.

## Login to EAS

```sh
eas login
```


## EAS Build

### Profiles

You can create as many profiles as you want.
A profile specifies the configuration options for different types of builds you may run for your project with EAS Build. For example, you may have a profile for internal distribution named "internal" and one for app store builds named "release". Build profiles are defined in your project's eas.json and each build that you run with eas-cli is associated with a profile.
an example profile in `eas.json`:
```json
{
  "cli": {
    "version": ">= 3.6.1"
  },
  "build": {
    "development": { // profile development
      "developmentClient": true,
      "distribution": "internal",
      "android": {
        "buildType": "apk"
      },
      "ios": {
        "resourceClass": "m1-medium"
      }
    },
    "preview": { // profile preview
      "distribution": "internal",
      "ios": {
        "resourceClass": "m1-medium"
      },
      "android": {
        "buildType": "apk"
      }
    },
    "production": { // profile production
      "ios": {
        "resourceClass": "m1-medium"
      }
    }
  },
  "submit": {
    "production": {}
  }
}
```

### Specify profile while building

```
eas build -p android --profile preview
```

### Android

The default file format used when building Android apps with EAS Build is an Android App Bundle (AAB/.aab). This format is optimized for distribution to the Google Play Store. However, AABs can't be installed directly on your device. 

To install a build directly to your Android device or emulator, you need to build an Android Package (APK/.apk) instead.

