

## nullable type is "TypeName?"

e.g.
```swift
let url: URL? = URL(string:"ASDF") // URL initializer returns nil if string contains invalid chars
let url2: URL? = nil // URL? = URL | nil
```

## Class constructor/initializer that might return nil (e.g. invalid params)

A initializer that can return `nil` is called a `failable initializer` and has name `init?`
e.g.
```swift
class Folder {
    var name: String
    // note the "?" in init method
    init? (name: String) {
        if (name.isEmpty) {
            return nil
        }
        self.name = name
    }
}

val f = Folder("") // type of f is Folder?
```


## Nil handling

### `if let v = mightBeNil {}`

Unwraps and assigns if value is not nil, otherwise executes else block

```swift
if let name = name {
  print ("Hello, \ (name)!")
} else {
  print ("No name given.")
}
```

### `guard let v = mightBeNil else { // nil here } normal code`

```swift
func greet (name: String?) {
  guard let name = name else {
      // early return here
    print ("No name given.")
    return
  }
  // normal flow, non-nil case
  print ("Hello, \ (name)!")
}
```

### nil coalescing operator `??`

```swift
let v = mightBeNil ?? "OK";// v = "OK" if first expression is nil
```

### Force Unwrapping with `mightBeNil!` 

```swift
let name = name!
print ("Hello, \ (name)!") // crashes if name is nil
```