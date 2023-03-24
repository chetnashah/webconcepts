
https://www.vadimbulavin.com/advanced-guide-to-userdefaults-in-swift/



## Similar to shared prefs on Android

## Small Key-value storage for apps

UserDefaults are meant to be used to store small pieces of data which persist across app launches. 
It is very common to use UserDefaults to store app settings or user preferences. 

UserDefaults lets you store key-value pairs, where a key is always a String and value can be one of the following data types: Data, String, Number, Date, Array or Dictionary.

UserDefaults saves its data in a local plists file on disk. UserDefaults are persisted for backups and restores.

A sandboxed app cannot access or modify the preferences for any other app, with the following exceptions:
* App extensions on macOS and iOS
* Other apps in your application group on macOS


## API

```swift
// get reference
let defaults = UserDefaults.standard


defaults.set(22, forKey: "userAge")

let fruits = ["Apple", "Banana", "Mango"]
defaults.set(fruits, forKey: "favoriteFruits")
```

### Reading is a little different

In order to get data from UserDefaults, use one of its type dedicated get methods, or a generic `object(forKey:)` method.

```swift
 let value = UserDefaults.standard.bool(forKey: "Key")
 let value = UserDefaults.standard.integer(forKey: "Key")
 let value = UserDefaults.standard.string(forKey: "Key")
```

### Remove a key/value

```swift
UserDefaults.standard.removeObject(forKey: "Key")
```