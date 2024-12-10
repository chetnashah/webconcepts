## We use static (stored) properties to implement the Singleton pattern

```swift
class Singleton {
    static let sharedInstance = Singleton()

    private init() { }

    func doSomething() { }
}
```
Usually you can notice the Singleton pattern by the static property `sharedInstance` or `shared`
or `instance` or `default` or `defaultInstance`.
Now when we need the Singleton instance we write

```swift
Singleton.sharedInstance.doSomething()
Singleton.sharedInstance.doSomething()
Singleton.sharedInstance.doSomething()
```