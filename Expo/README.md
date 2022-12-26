

`expo-cli` is the old global cli (`npm install -g expo`)

The new cli lives in `@expo/expo` monorepo itself.

## How expo hooks into android lifecycle

1. `ReactActivityDelegateWrapper(application, originalReactActivityDelegate)` - double delegate pattern -> extend the delegate as well as delegate to original 
2. `ReactNativeHostWrapper(application, originalAppRNHost)` - `double delegate pattern -> extend the delegate as well as delegate to the original delegate.
3. 