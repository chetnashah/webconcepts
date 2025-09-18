# `Hashable` in Swift

## Note: structs need to be explicitly annotated with `Hashable` for conformance

Although structs can automatically synthesize a hash function, if all it's members are Hashable, the struct itself must still be explicitly declared to conform to `Hashable`.

e.g. 
```swift
// not Hashable
struct Person {
    let name: String
    let age: Int
}

// Hashable (auto synthesized from Hashable members)
struct Person: Hashable {
    let name: String
    let age: Int
}
```

## 1. Definition  

`Hashable` is a standard-library protocol that lets a type participate in hash-based collections such as `Set`, the keys of `Dictionary`, and any algorithm that relies on hashing (e.g. deduplication).

```swift
public protocol Hashable : Equatable {
    func hash(into hasher: inout Hasher)
}
```

* Conformance **inherits `Equatable`**—if two values are equal, their hashes **must** be equal.
* A **hash** is an `Int` produced from the value’s salient features.  
* The actual hashing algorithm is hidden behind the `Hasher` type; you only describe *which* parts of the value take part.

---

## 2. Why does hashing matter?

1. **Fast lookup** – `Set` and `Dictionary` find elements in *O(1)* expected time instead of *O(n)* linear scans.  
2. **Uniqueness** – Hashing allows inexpensive checks for duplicates.  
3. **Keying** – Objects can be used as identifiers for caching, memoization, or graph algorithms.

---

## 3. Essence of a good hash implementation

• Combine exactly the fields that define equality.  
• Keep the same hash for the same data during the lifetime of the value.  
• Don’t worry about the hash algorithm itself—just feed the data to `hasher.combine`.

---

## 4. Simple example – a 2-D point

```swift
struct Point: Hashable {
    let x: Int
    let y: Int
    // No code needed: Swift synthesises both == and hash(into:)
}

let p1 = Point(x: 3, y: 4)
let p2 = Point(x: 3, y: 4)
print(p1 == p2)                 // true
print(Set([p1, p2]).count)      // 1  (duplicates removed)
```

Because all stored properties are `Hashable`, the compiler writes `==` and `hash(into:)` for you.

---

## 5. Custom implementation – ignoring a field

Suppose equality should ignore a transient `id` but still keep it for display.

```swift
struct User: Hashable, CustomStringConvertible {
    let id: UUID        // volatile, not part of identity
    let email: String   // identity
    let name: String

    static func == (lhs: User, rhs: User) -> Bool {
        lhs.email == rhs.email    // only email defines equality
    }

    func hash(into hasher: inout Hasher) {
        hasher.combine(email)     // mirror the equality logic
    }

    var description: String { "\(name) <\(email)>" }
}

let u1 = User(id: .init(), email: "dev@acme.com", name: "Alice")
let u2 = User(id: .init(), email: "dev@acme.com", name: "Alicia")

print(u1 == u2)                  // true
print(Set([u1, u2]).count)       // 1
```

---

## 6. Motivating use cases

1. **Dictionary Keys**  
   ```swift
   var salaries: [Employee : Double] = [:]
   salaries[emp] = 75_000
   ```

2. **Switching on enums with associated values**  
   Automatically `Hashable` enums can be stored in sets or used as diffable-data-source identifiers.

3. **Memoization / Caching**  
   Function results keyed by complex input types.

4. **Graph traversal**  
   Keep a `Set<Node>` of visited nodes.

---

## 7. Practical example – LRU cache

```swift
struct ImageKey: Hashable {
    let url: URL
    let size: CGSize
}

final class LRUCache<Value> {
    private var dict: [ImageKey : Value] = [:]

    subscript(key: ImageKey) -> Value? {
        get { dict[key] }
        set { dict[key] = newValue }
    }
}

let key = ImageKey(url: URL(string:"https://…")!,
                   size: .init(width: 100, height: 100))
cache[key] = downloadedImage
```

`ImageKey`’s `URL` and `CGSize` are `Hashable`, so the compiler provides conformance automatically.

---

## 8. Key points to remember

* `Hashable` implies `Equatable`; keep their logic consistent.
* Use `hasher.combine(_:)` for each property that participates in equality.
* Prefer the compiler’s synthesis where possible—less code, fewer bugs.
* Hash values **must not** be persistent across launches; they change with every run for security (hash seeding).
* Never store only `hashValue`—use the original value as the dictionary key.
* For reference types (`class`) you decide whether identity (`===`) or value semantics define equality—implement accordingly.
* When subclassing, include superclass properties in `==` and `hash(into:)`.

---

Happy hashing!