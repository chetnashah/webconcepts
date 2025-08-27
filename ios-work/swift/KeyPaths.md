# Swift Key Paths  
_A tour from first principles, through real use-cases, to the “things you must not forget”_

---

## 1. What is a Key Path?

Imagine you could write down **a route to a property** instead of the property’s *value*.  
That route can later be handed to generic algorithms, stored, compared, or executed many times on different objects—always type-checked by the compiler.

In Swift that route is a value of type `KeyPath<Root, Value>` and its writable variants:

| Type                           | Mutability | Root kind  | Signature                         |
|--------------------------------|------------|------------|-----------------------------------|
| `KeyPath<Root, Value>`         | read-only  | class/struct/enum | `Root -> Value`                 |
| `WritableKeyPath<Root, Value>` | read/write | struct/enum       | `inout Root -> Value`           |
| `ReferenceWritableKeyPath<Root, Value>` | read/write | class only | `Root -> Value` via reference  |
| `PartialKeyPath<Root>`         | type-erased Value |    | `Root -> Any`                    |

The literal syntax looks like a tiny slash:

```swift
\Person.address.street   // KeyPath<Person, String>
```

No parentheses: that is not a closure, it is a **compile-time constant** object representing the chain `Root.address.street`.

---

## 2. Building intuition from first principles

1. **A key path is to a property what a `Selector` is to an Objective-C method, but type-checked and pure Swift.**  
2. **It is a value** (struct) therefore it can be:
   * stored in variables,
   * passed to functions,
   * used as dictionary keys, etc.
3. **It never executes code by itself.** You need an instance of `Root` plus either:
   * subscripting: `instance[keyPath: kp]`
   * assignment: `instance[keyPath: writableKP] = newValue`.

From the compiler’s point of view you just wrote:

```swift
func get<Root, Value>(_ root: Root, _ kp: KeyPath<Root, Value>) -> Value {
    root[keyPath: kp]
}
```

…and Swift guarantees that the `Root` you provide really *contains* a `Value` at that path.

---

## Key-Path Literals as Drop-In Closures

Swift 5 lifts a *read-only* key path `KeyPath<Root, Value>` to an ordinary function:

```swift
(Root) -> Value
```

That means every generic API that accepts a closure of that precise shape can also accept a key-path literal.  
The compiler performs the conversion automatically—no extra syntax required.

```swift
map(\.name)            //   { $0.name }
filter(\.isEnabled)    //   { $0.isEnabled }
max(by: \.score)       //   { $0.score }
```

Below is a survey of the most common places where this is useful.

---

### 1. `map`, `compactMap`, `flatMap`

1. Pull a single column out of a collection:

   ```swift
   let userNames = users.map(\.username)              // [String]
   ```

2. Turn an array of optionals into a non-optional result:

   ```swift
   let urls = files.compactMap(\.downloadURL)         // [URL]
   ```

3. Flatten a nested sequence of child arrays:

   ```swift
   let allMessages = threads.flatMap(\.messages)      // [Message]
   ```

---

### 2. `filter`, `removeAll(where:)`, `first(where:)`

Works whenever the key path’s value is `Bool`.

```swift
let admins       = users.filter(\.isAdmin)
let firstExpired = sessions.first(where: \.isExpired)
activeUsers.removeAll(where: \.isSuspended)
```

If the property is not `Bool`, just wrap it with a closure as usual.

---

### 3. `contains(where:)`, `allSatisfy`, `prefix(while:)`

```swift
let hasUnread = mails.contains(where: \.isUnread)
let everyoneReady = players.allSatisfy(\.isReady)
```

---

### 4. `sorted(by:)` (custom helper)

The standard library’s `sorted(by:)` wants a two-argument comparator, not a one-argument projection.  
Define a tiny overload once and reuse forever:

```swift
extension Sequence {
    func sorted<Value: Comparable>(by key: KeyPath<Element, Value>) -> [Element] {
        sorted { $0[keyPath: key] < $1[keyPath: key] }
    }
}

let sortedByAge = people.sorted(by: \.age)
```

---

### 5. `Dictionary(grouping:by:)`

Grouping items by a property is a one-liner:

```swift
let personsByCity = Dictionary(grouping: people, by: \.address.city)
// [String : [Person]]
```

---

### 6. Building sets or dictionaries keyed by a property

```swift
let idSet = Set(items.map(\.id))                   // Set<Item.ID>

let dict = Dictionary(uniqueKeysWithValues:
    items.map { ($0.id, $0) }                      // classical way
)

// or, with a helper:
extension Sequence {
    func keyed<Key: Hashable>(by path: KeyPath<Element, Key>) -> [Key: Element] {
        Dictionary(uniqueKeysWithValues: map { ($0[keyPath: path], $0) })
    }
}

let dictByID = items.keyed(by: \.id)
```

---

### 7. SwiftUI conveniences

SwiftUI is filled with APIs that ask for key paths:

```swift
ForEach(tasks, id: \.id) { Text($0.title) }  // identity
TextField("Name", text: $user.bind(\.name))   // custom Binding helper
```

You also see them in Combine:

```swift
publisher.map(\.count)          // CombineExt adds this operator
model.publisher(for: \.status)   // KVO-safe
```

---

## Patterns You’ll Use Over and Over

1. Column extraction: `array.map(\.field)`
2. Boolean filters: `array.filter(\.flag)`
3. Grouping or dictionaries keyed by a property
4. Sorting helpers based on one property
5. UI frameworks that need an “id” or “binding” key path

Memorize the shape:

```
KeyPath<Root, Value>  ⇄  (Root) -> Value
```

and you can immediately spot any API that will accept a key path instead of a closure, giving you code that is:

* Shorter (no `$0` noise)
* Type-checked (you can’t mistype the property name)
* Reusable (the same key path value can be stored and passed around)

That’s the practical essence of using key paths with `map` and friends.

## 3. Motivating examples

### 3.1 Functional transformations

```swift
let names = people.map(\.name)   // no closure boilerplate
```

Key path ↦ function conversion: `\.name` automatically lifts to `(Person) -> String`.

### 3.2 Generic sorting helpers

```swift
extension Sequence {
    func sorted<Value: Comparable>(by key: KeyPath<Element, Value>) -> [Element] {
        sorted { $0[keyPath: key] < $1[keyPath: key] }
    }
}

let sortedByAge = people.sorted(by: \.age)
```

### 3.3 KVO done safely (only on `NSObject` subclasses)

```swift
person.publisher(for: \.name)   // Combine; the keypath proves `name` is KVO-compliant
```

### 3.4 Bulk mutation

```swift
func setAll<T, V>(_ array: inout [T],
                  _ path: WritableKeyPath<T, V>,
                  to value: V)
{
    for i in array.indices { array[i][keyPath: path] = value }
}

setAll(&people, \.isSelected, to: false)
```

### 3.5 Schema-driven UIs

Store “columns” for a table view:

```swift
struct Column<Root> {
    let title: String
    let path: KeyPath<Root, String>
}

let columns = [
    Column(title: "Name", path: \Person.name),
    Column(title: "City", path: \Person.address.city)
]
```

The UI can now render any `[Person]` without extra code.

### 3.6 DynamicMemberLookup & SwiftUI

```swift
@dynamicMemberLookup
struct Lens<Root> {
    var root: Root
    subscript<Value>(dynamicMember kp: WritableKeyPath<Root, Value>) -> Value {
        get { root[keyPath: kp] }
        set { root[keyPath: kp] = newValue }
    }
}
```

This trick powers several “lens” libraries and reduces boilerplate in SwiftUI environment wrappers.

---

## 4. Grammar cheatsheet

```
\RootType.property
\.property                // dot shorthand when Root can be inferred
\RootType[0].prop         // supports subscripts and optionals
\SomeEnum.casePath        // not yet; requires libraries like CasePaths
```

You may stop the chain and store partial paths:

```swift
let streetPath = \Person.address.street        // KP<Person,String>
let addressPath = \Person.address              // KP<Person,Address>
```

Compose at runtime:

```swift
let composed: KeyPath<Person, String> = addressPath.appending(path: \.street)
```

---

## 5. Things to remember (and a few gotchas)

1. Type safety is the raison d’être. The compiler rejects `\Person.nonExistent`.  
2. Only stored/computed **properties** and **subscripts** are allowed—no methods.
3. Value semantics: a `WritableKeyPath` into a `struct` requires `inout` (copy-on-write clarity).  
4. Capturing self: key-path literal does **not** capture outer variables; it is independent and cacheable.
5. Erasure: `PartialKeyPath` loses the `Value` generic. You often add a second generic or cast back.
6. Performance: access via key path is very close to direct property access; the compiler can often inline it.
7. Key paths do not cross language boundaries (e.g. they are not Objective-C `NSString` KVC keys).
8. Equality: `\Person.name == \Person.name` (they conform to `Equatable` & `Hashable` since Swift 5.2).  
9. To encode/decode a key path you must wrap it yourself; they are **not** `Codable`.
10. Avoid overuse: sometimes a closure `{ $0.foo }` is simpler and alloc-free when you never need to store the route.

---

## 6. Mental model summary

• Think of `\Root.value` as a **compile-time pointer** to “field `value` inside `Root`”.  
• Using `instance[keyPath: kp]` is **deferred dot-access**.  
• Storing key paths lets you write **data-driven, reflection-like** code without sacrificing static checking.

Keep those principles in mind and you’ll wield key paths to write expressive, generic, and safe Swift APIs.