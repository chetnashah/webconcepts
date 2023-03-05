
## objc compatibility

However once you venture away from integers (say String) or start using associated values you can't use enums from within Objective-C.



## Swift enums are very powerful!

## Simple enum 

Each item is declared by `case`

```swift
enum Country {
    case India
    case USA
}
```


### Dot syntax allowed on inferred types/assignment

```swift
enum Country: CaseIterable {
    case India
    case USA
    case Korea
}

var c: Country = .India // dot syntax allowed for inferred types, dropping enum name
c = .USA

print(c) // USA
```

## Enums can have constructors/initializers with params (which can decide which one to pick)

```swift
enum NumberCategory {
    case small
    case medium
    case big
    case huge

    // initializer
    init(number n: Int) {
         if n < 10000 { self = .small }
         else if n < 1000000 { self = .medium }
         else if n < 100000000 { self = .big }
         else { self = .huge }
    }
}

// another example
enum Codes {
    case BarCode(Int, Int) // type constructor
    case QRCode(String) // type constructor

    init(str: String, num: Int) {
        if str == "" {
            self = .BarCode(num,num)
        }
        self = .QRCode(str)
    }
}

let c = Codes(str: "sqr", num: 0)
```

## Enums with associated values

Usually enum cases are just signular values by default, we can make them parameterized types instead by defining
cases with constructors.


```swift
enum Codes {
    case BarCode(Int, Int) // type constructor
    case QRCode(String) // type constructor
}

let q = Codes.QRCode("3square")
let j = Codes.BarCode(2,2)
```

### Retrieve enum case associated value with pattern matching via if case let/switch

1. using `if case let Constructor(v)`/ `if case Constructor(let v)`

```swift
enum Codes {
    case BarCode(Int, Int) // type constructor
    case QRCode(String) // type constructor
}

let q = Codes.QRCode("3square")
let j = Codes.BarCode(2,2)

// pattern matching with if case let
// not single equals
if case let Codes.QRCode(str) = q {
    print(str)
}

// or better more readable
if case Codes.QRCode(let str2) = q {
    print(str2)
}
```

2. using `switch` on an enum values with each case being a case constructor:

```swift
enum Codes {
    case BarCode(Int, Int)
    case QRCode(String)
}

let q = Codes.QRCode("3square")
let j = Codes.BarCode(2,2)

let ans: String;
switch j {
case .QRCode(let qrtype): 
    ans =  "Qr code type \(qrtype)"
case .BarCode(let a, let b):
    ans = "Bar code : \(a) \(b)"
}

print(ans)
```

**Note** - observe how `if case let` uses a single equals (assignment) instead of a double equals (comparision)

## Enums can have methods just like classes/structs

Utility methods that work with enum cases/values

```swift
enum Codes {
    case BarCode(Int, Int)
    case QRCode(String)

    func getName() -> String {
        switch(self) { // switch self is common pattern matching used in enum method
            case .QRCode(let qrtype): 
                return "QR Code, type \(qrtype)";
        
            case .BarCode(let a, let b): 
                return "Bar code type = \(a) \(b)"
        }
    }
}

let q = Codes.QRCode("3square")
let j = Codes.BarCode(2,2)

print(q.getName())
```

We can also have static methods/properties which can be directly called on enum name instead of enum instance
```swift
enum Device {
    // called as Device.newestDevice
   static var newestDevice: Device {
     return .appleWatch
   }
   case iPad,
   case iPhone
   case appleWatch
}
```

### Mutating methods can change underlying self

Using a `mutating func` inside the enum can modify self to point to different enum.

```swift
enum TriStateSwitch {
     case off, low, bright
     mutating func next() {
         switch self {
         case .off:
             self = low
         case .low:
             self = .bright
         case high:
             self = off
         }
     }
}

var ovenLight = TriStateSwitch.low
ovenLight.next()
// ovenLight is now equal to .bright
ovenLight.next()
// ovenLight is now equal to .off
```

## Enums can only have computed properties (no stored properties)

Computed properties are possible on enum, not stored properties.

Here is an example of computed property
```swift
enum Device {
   case iPad,
   case iPhone

    // computed property getter
   var introduced: Int { // must be var since values can be different for a getter
     switch self {
     case .iPhone: return 2007
     case .iPad: return 2010
      }
   }
}
```

## Enums can confirm to protocols

## Enums can be extended via extensions like classes/structs

```swift
enum Entity {
     case soldier(x: Int, y: Int)
     case tank(x: Int, y: Int)
     case player(x: Int, y: Int)
}
// a protocol
protocol CustomStringConvertible {
   var description: String { get }
}
// make entity confirm to a protocol via extension
extension Entity: CustomStringConvertible {
   var description: String {
     switch self {
     case let .soldier(x, y): return \"\(x), \(y)\"
     case let .tank(x, y): return \"\(x), \(y)\"
     case let .player(x, y): return \"\(x), \(y)\"
     }
   }
}
```

### Enums are Equatable by default

```swift
print (Country.USA == Country.India) // false
```

**Note** - if Enums have associated values, i.e. cases with constructors, then Equatable does not hold:
`Binary operator '==' cannot be synthesized for enums with associated values`

### Iteration over all cases possible via CaseIterable protocol + `.allCases` property

If enum conforms to `CaseIterable` protocol, we get a `.allCases` property on enum to iterate over all cases of enum

```swift
enum Country: CaseIterable {
    case India
    case USA
    case Korea
}

for i in Country.allCases {
    print(i) // India, USA, Korea
}
```


## Enum nesting and namespacing

Enum nesting helps in namespacing, where enum name is namespace

```swift
enum Character {
   enum Weapon {
     case bow
     case sword
     case lance
     case dagger
   }
   enum Helmet {
     case wooden
     case iron
     case diamond
   }
   case thief
   case warrior
   case knight
}
let character = Character.thief
let weapon = Character.Weapon.bow
let helmet = Character.Helmet.iron
```

## Algebraic data types/Tagged unions/discriminated unios with Associated values on cases

```swift
enum GeometricEntity {
    case point(x: Int, y: Int)
    case rect(x: Int, y: Int, width: Int, height: Int)
}
```

## Generic enums (will take type parameters)

```swift
enum MyOptional<T> {
   case some(T)
   case none
}
```

## Recursive enums

Indirect types allow you to define enums where the associated value of a case is the very same enum again
```swift
enum FileNode {
   case file(name: String)
   indirect case folder(name: String, files: [FileNode]) // indirect case can refer type
}
```

indirect keyword can also be added to whole enum:
```swift
indirect enum Tree<Element: Comparable> {
     case empty
     case node(Tree<Element>,Element,Tree<Element>)
}
```

## PRacticial use cases

### Error types

```swift
enum APIError : Error {
     // Can't connect to the server (maybe offline?)
     case connectionError(error: NSError)
     // The server responded with a non 200 status code
     case serverError(statusCode: Int, error: NSError)
     // We got no data (0 bytes) back from the server
     case noDataError
     // The server response can't be converted from JSON to a Dictionary
     case JSONSerializationError(error: Error)
     // The Argo decoding Failed
     case JSONMappingError(converstionError: DecodeError)
}
```

### Fixed set of Result/Parse types

```swift
enum JSON {
     case JSONString(Swift.String)
     case JSONNumber(Double)
     case JSONObject([String : JSONValue])
     case JSONArray([JSONValue])
     case JSONBool(Bool)
     case JSONNull
}
```

### Variant based data structures

```swift
enum List {
     case end
     indirect case node(Int, next: List)
}
```