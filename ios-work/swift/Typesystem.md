

## typealias

Useful to provide nominal types for an existing type. 

Popular for **Closure** and **Tuple** types, and large 

```
typealias StudentName = String

typealias CompletionHandler = (Int)->(String)

typealias Message = String
```



### Why?

1. gives a semantic meaning to base type. e.g. `typealias TimeInterval = Double`
2. Helps in refactoring.
3. Reduce verbosity - `typealias AppReducer = Reducer<AppState, AppAction, AppEnvironment> `
4. Improve clarity - `typealias PresentableViewController = UIViewController & UIPopoverPresentationControllerDelegate`
5. typing functions/closures - `public typealias ClosureType = (x: Int, y: Int) -> Int`
6. Convinient for tuples: `typealias Cordinates = (Lat: Float, Lng: Float)`
7. Long worded closure types `public typealias Handler = (_ cell: Cell, _ indexPath: IndexPath, _ itemIdentifier: Item) -> Void`
8. Large typenames with generics - `typealias DataSource = UICollectionViewDiffableDataSource<Int, String>`


## Any vs AnyObject

Certainly, I'd be happy to explain the differences between `AnyObject` and `Any` in Swift. These are both important concepts for type erasure, but they have distinct uses and capabilities.

1. Type Coverage:

   - `AnyObject`: Can represent an instance of any class type (references types).
   - `Any`: Can represent an instance of any type at all, including structs, numbers, booleans, enums, classes, functions, and even optional types.

2. Applicability:

   - `AnyObject`: Only class types can conform to `AnyObject`.
   - `Any`: All types in Swift implicitly conform to `Any`.

3. Usage Scenarios:

   - `AnyObject`: Typically used when working with Objective-C APIs or when you specifically need to work with class types only.
   - `Any`: Used when you need to work with values of any type, including value types (structs and enums).

4. Performance:

   - `AnyObject`: Generally faster because it only deals with reference types (classes).
   - `Any`: May have slightly more overhead because it can store value types, which might require boxing (wrapping in a reference type).

5. Syntax in Arrays:

   - `AnyObject`: `[AnyObject]` (array of class instances)
   - `Any`: `[Any]` (array of any type)

Here's an example to illustrate the differences:

```swift
// AnyObject example
let classArray: [AnyObject] = [NSString("Hello"), NSNumber(value: 42)]

// Any example
let mixedArray: [Any] = ["Hello", 42, true, {print("I'm a closure")}]

// This works fine
classArray.append(NSDate())

// This would not compile
// classArray.append(5) // Error: Integer literal is not compatible with expected argument type 'AnyObject'

// But this works with Any
mixedArray.append(5)
```

When to use which:

- Use `AnyObject` when you're certain you're only dealing with class types, especially when interfacing with Objective-C code.
- Use `Any` when you need to work with mixed types, including value types and function types.

Casting:

Both `AnyObject` and `Any` often require casting to use the stored values:

```swift
let anyObjectValue: AnyObject = NSString("Hello")
if let string = anyObjectValue as? String {
    print(string)
}

let anyValue: Any = 42
if let number = anyValue as? Int {
    print(number)
}
```

In summary, `AnyObject` is more restrictive but can be more performant when working exclusively with class types, while `Any` is more flexible and can represent any type in Swift. The choice between them depends on your specific use case and the types you need to work with.