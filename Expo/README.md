

`expo-cli` is the old global cli (`npm install -g expo`)

The new cli lives in `@expo/expo` monorepo itself.

## How expo hooks into android lifecycle

1. `ReactActivityDelegateWrapper(application, originalReactActivityDelegate)` - double delegate pattern -> extend the delegate as well as delegate to original 
2. `ReactNativeHostWrapper(application, originalAppRNHost)` - `double delegate pattern -> extend the delegate as well as delegate to the original delegate.



## How expo go installs itself on simulator/emulator

ON running `DEBUG=expo* npx expo start --ios` will start `Expo Go` app on simulator.

Expo hosts its own simulator/emulator builds at: `https://api.expo.dev/v2/versions/latest`

Full logs:
```
jayshah@192 expo-managed-47-app % DEBUG=expo* npx expo start --ios
Starting project at /Users/jayshah/expo-managed-47-app
  expo:utils:fileNotifier Observing /Users/jayshah/expo-managed-47-app/babel.config.js +0ms
  expo:doctor:typescriptSupport Ensuring TypeScript support is setup +0ms
  expo:doctor:dependencies:bundledNativeModules Fetching bundled native modules from the server... +0ms
  expo:api:fetch:base fetch: https://api.expo.dev/v2/sdks/47.0.0/native-modules +0ms
  expo:api:fetch:base fetch: https://api.expo.dev/v2/versions/latest +474ms
  expo:doctor:dependencies:validate Checking dependencies for 47.0.0: {
  expo:doctor:dependencies:validate   expo: '~47.0.9',
  expo:doctor:dependencies:validate   'expo-status-bar': '~1.4.2',
  expo:doctor:dependencies:validate   react: '18.1.0',
  expo:doctor:dependencies:validate   'react-native': '0.70.5'
  expo:doctor:dependencies:validate } +0ms
  expo:doctor:dependencies:validate Comparing known versions: [ 'expo-status-bar', 'react', 'react-native' ] +0ms
  expo:doctor:dependencies:validate Skipping packages that cannot be versioned automatically: [ 'expo' ] +1ms
  expo:doctor:dependencies:validate Package versions: {
  expo:doctor:dependencies:validate   'expo-status-bar': '1.4.2',
  expo:doctor:dependencies:validate   react: '18.1.0',
  expo:doctor:dependencies:validate   'react-native': '0.70.5'
  expo:doctor:dependencies:validate } +1ms
  expo:doctor:dependencies:validate Incorrect dependencies: [] +1ms
  expo:start:server:devServer Stopping dev server (bundler: metro) +0ms
  expo:start:server:devServer Stopped dev server (bundler: metro) +0ms

Expo Metro config:
- Version: 0.5.2
- Bundler target: bare
- Legacy: false
- Extensions: ts, tsx, js, jsx, json
- React Native: /Users/jayshah/expo-managed-47-app/node_modules/react-native
- Babel config: /Users/jayshah/expo-managed-47-app/babel.config.js
- Resolver Fields: react-native, browser, main
- Watch Folders:
- Node Module Paths:
- Exotic: false

  expo:start:server:metro:router routerEntry /Users/jayshah/expo-managed-47-app/node_modules/expo-router/entry /Users/jayshah/expo-managed-47-app/app ../../app +0ms
Starting Metro Bundler
  expo:start:server:urlCreator URL: exp://192.168.1.7:19000 +0ms
  expo:start:server:developmentSession Development session ping (runtime: native, url: exp://192.168.1.7:19000) +0ms
  expo:api:fetch:base fetch: https://api.expo.dev/v2/development-sessions/notify-alive +838ms
  expo:start:server:devServer Creating platform manager (platform: simulator, port: 19000) +797ms
  expo:doctor:apple:xcode Xcode version: 14.1.0 +0ms
  expo:doctor:apple:simulatorApp Simulator app id: com.apple.CoreSimulator.SimulatorTrampoline +0ms
  expo:start:platforms:platformManager open (runtime: expo, platform: ios, device: undefined, shouldPrompt: undefined) +0ms
  expo:start:platforms:ios:xcrun Running: xcrun simctl list devices --json  +0ms
  expo:start:platforms:ios:getBestSimulator No booted simulator matching requirements (osType: undefined). +0ms
  expo:start:platforms:ios:getBestSimulator Default simulator ID: A1F84EE6-9B0C-46CF-B3D8-6A2BF9F1D4D4 +485ms
  expo:start:platforms:ios:xcrun Running: xcrun simctl boot A1F84EE6-9B0C-46CF-B3D8-6A2BF9F1D4D4 +719ms
  expo:start:platforms:ios:xcrun Running: xcrun simctl list devices --json  +2s
  expo:start:server:devServer Redirect page is disabled +10s
  expo:start:server:urlCreator URL: exp://192.168.1.7:19000 +10s
› Opening exp://192.168.1.7:19000 on iPhone 14
  expo:start:platforms:ios:xcrun Running: xcrun simctl get_app_container A1F84EE6-9B0C-46CF-B3D8-6A2BF9F1D4D4 host.exp.Exponent +433ms
- Fetching Expo Go
  expo:utils:downloadExpoGo Installing Expo Go version for SDK 47.0.0 at URL: https://dpq5q02fu5f55.cloudfront.net/Exponent-2.26.4.tar.gz +0ms
  expo:utils:downloadExpoGo Downloading Expo Go from "https://dpq5q02fu5f55.cloudfront.net/Exponent-2.26.4.tar.gz" to "/Users/jayshah/.expo/ios-simulator-app-cache/Exponent-2.26.4.tar.app". +0ms
  expo:utils:downloadExpoGo The requested copy of Expo Go might already be cached in: "/Users/jayshah/.expo". You can disable the cache with EXPO_NO_CACHE=1 +0ms
  expo:utils:downloadAppAsync Downloading https://dpq5q02fu5f55.cloudfront.net/Exponent-2.26.4.tar.gz to /private/var/folders/z7/1kg2rwzx37j7606wkm29512c0000gn/T/0ef508d8f2cd356f102cf26e294d559e/Exponent-2.26.4.tar.app +0ms
  expo:api:fetch:base fetch: https://dpq5q02fu5f55.cloudfront.net/Exponent-2.26.4.tar.gz +19s
  expo:api:fetch:progress Download size: 55594007 +0ms
  expo:api:fetch:progress Starting progress animation for https://dpq5q02fu5f55.cloudfront.net/Exponent-2.26.4.tar.gz +0ms
Downloading the Expo Go app [===================                                             ] 30% 2.7s  expo:start:server:developmentSession Development session ping (runtime: native, url: exp://192.168.1.7:19000) +20s
  expo:api:fetch:base fetch: https://api.expo.dev/v2/development-sessions/notify-alive +1s
Downloading the Expo Go app [================================================================] 100% 0.0s
  expo:api:fetch:progress Finished progress animation for https://dpq5q02fu5f55.cloudfront.net/Exponent-2.26.4.tar.gz +4s

  expo:utils:downloadAppAsync Extracting /private/var/folders/z7/1kg2rwzx37j7606wkm29512c0000gn/T/0ef508d8f2cd356f102cf26e294d559e/Exponent-2.26.4.tar.app to /Users/jayshah/.expo/ios-simulator-app-cache/Exponent-2.26.4.tar.app +4s
  expo:utils:tar Extracting /private/var/folders/z7/1kg2rwzx37j7606wkm29512c0000gn/T/0ef508d8f2cd356f102cf26e294d559e/Exponent-2.26.4.tar.app to /Users/jayshah/.expo/ios-simulator-app-cache/Exponent-2.26.4.tar.app +0ms

- Installing Expo Go on iPhone 14
  expo:start:platforms:ios:xcrun Running: xcrun simctl install A1F84EE6-9B0C-46CF-B3D8-6A2BF9F1D4D4 /Users/jayshah/.expo/ios-simulator-app-cache/Exponent-2.26.4.tar.app +14s
  expo:start:platforms:ios:AppleDeviceManager getApplicationIdFromBundle: /Users/jayshah/.expo/ios-simulator-app-cache/Exponent-2.26.4.tar.app +0ms
Parse plist: /Users/jayshah/.expo/ios-simulator-app-cache/Exponent-2.26.4.tar.app/Info.plist
- Installing Expo Go on iPhone 14
  expo:start:platforms:ios:AppleDeviceManager getApplicationIdFromBundle: using built Info.plist host.exp.Exponent +2ms
  expo:start:platforms:ios:xcrun Running: xcrun simctl get_app_container A1F84EE6-9B0C-46CF-B3D8-6A2BF9F1D4D4 host.exp.Exponent +3s
  expo:start:platforms:ios:xcrun Running: xcrun simctl openurl A1F84EE6-9B0C-46CF-B3D8-6A2BF9F1D4D4 exp://192.168.1.7:19000 +334ms
  expo:start:server:urlCreator URL: exp://192.168.1.7:19000 +18s
  expo:start:server:devServer Redirect page is disabled +18s
▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
█ ▄▄▄▄▄ █▀▄█▀  █ ▄█ ▄▄▄▄▄ █
█ █   █ █▄   ▄██ ▀█ █   █ █
█ █▄▄▄█ █ ▀█▀█ ▀ ██ █▄▄▄█ █
█▄▄▄▄▄▄▄█ ▀▄█ █ █▄█▄▄▄▄▄▄▄█
█▄ ▀ █▀▄▄▀█ ▀█▄▀▄▄▀  ▄▀▄▄▀█
█ ▄▀ █▀▄▀ ▄▄██ ▄▀▄▄▀ ▀▀█▄▄█
█▄█▄▀ ▀▄█▀▀▀▀ ▄ █▀█ ▄█ ██▀█
█▄▀██▄▀▄▀▀▀██ ▀██ ▄▄ ▀▀██▄█
█▄▄▄██▄▄█ ▄ ▄█▀▄  ▄▄▄ █ ▄ █
█ ▄▄▄▄▄ █▄▄█▀██▄  █▄█  ▀▄ █
█ █   █ █▀▀▄   ▀▀▄ ▄▄ █▀█▄█
█ █▄▄▄█ █▀▄▀    █  █▄  ▄█▄█
█▄▄▄▄▄▄▄█▄█▄▄▄█▄█▄███▄▄█▄▄█

› Metro waiting on exp://192.168.1.7:19000
› Scan the QR code above with Expo Go (Android) or the Camera app (iOS)

› Press a │ open Android
› Press i │ open iOS simulator
› Press w │ open web

› Press j │ open debugger
› Press r │ reload app
› Press m │ toggle menu

› Press ? │ show all commands

Logs for your project will appear below. Press Ctrl+C to exit.
› Opening the iOS simulator, this might take a moment.
  expo:start:server:urlCreator URL: 192.168.1.7:19000 +10s
  expo:start:server:urlCreator URL: http://192.168.1.7:19000 +0ms
  expo:start:server:urlCreator URL: 192.168.1.7:19000 +0ms
  expo:start:server:urlCreator URL: http://192.168.1.7:19000 +1ms
  expo:api:fetch:base fetch: https://api.expo.dev/v2/project/configuration/schema/47.0.0 +17s
  expo:api:fetch:base fetch: https://api.expo.dev/v2/manifest/sign +448ms
iOS node_modules/expo/AppEntry.js ▓▓▓▓▓░░░░░░░░░░░ 33.1% (233/405)  expo:start:server:developmentSession Development session ping (runtime: native, url: exp://192.168.1.7:19000) +20s
  expo:api:fetch:base fetch: https://api.expo.dev/v2/development-sessions/notify-alive +3s
iOS Bundling complete 4359ms
```