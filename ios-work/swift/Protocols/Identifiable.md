
## Identifiable Protocol

# Identifiable in Swift – Cheat-Sheet

## 1. First Principles

* **Aim:** Give a type a stable, unique identity independent of its stored data, so collections & diffable APIs can recognise “the same” object/value.  
* **Definition (std-lib):**
  ```swift
  public protocol Identifiable {
      associatedtype ID : Hashable
      var id: ID { get }
  }
  ```
* Conforms **by value**: `id` is a computed/stored property; **no runtime magic** (unlike `NSObject`’s `hash` / `isEqual`).

## 2. How Identity Is Used

1. **SwiftUI:**
   * `ForEach`, `List`, `.id(_:)`, `.transition` call sites read `id` to diff view data and animate changes.
2. **Combine / DiffableDataSource:**  
   * Snapshot algorithms require stable `id`s to compute inserts/deletes.
3. **Concurrency:**  
   * Task & Actor work often supply `Task.id`, `ObjectIdentifier`.
4. **Testing / Mocking:**  
   * Easy equality by ID → compare objects across layers.

## 3. Declaring Conformance

### Automatic conformance via `\Self.id` (no macro—just add property)

```swift
struct User: Identifiable {
    let id: UUID        // satisfies the contract
    var name: String
}
```

### Custom `ID` type

```swift
struct EmployeeNumber: Hashable { let value: Int }

struct Employee: Identifiable {
    typealias ID = EmployeeNumber
    let id: ID
    let name: String
}
```

### Deriving `id` from another property

```swift
struct City: Identifiable {
    var name: String
    var id: String { name.lowercased() }   // must remain stable!
}
```

### Enum conformance

```swift
enum Route: String, CaseIterable, Identifiable {
    case home, settings, profile
    var id: Self { self }   // simplest: id == enum value itself
}
```

## 4. Identity vs Equality

| Concept  | Protocol      | Requirement                 | Typical use            |
|----------|---------------|-----------------------------|------------------------|
| Equality | Equatable     | `==` on *value*            | value comparison       |
| Hashing  | Hashable      | `hash(into:)`               | dict / set keys        |
| Identity | Identifiable  | stable `id: Hashable`       | diffing, UI lists      |

Two values can be `==` but have **different IDs**, or unequal but share an ID (rare; warns of data drift).

## 5. Best-Practices & Gotchas

* `ID` must be **Hashable & stable** across the object’s lifetime.  
  – Changing it after insertion into a keyed collection is undefined behaviour.
* Prefer **value-type IDs** (`UUID`, `Int`, `String`, custom struct) over reference types.
* Do **not** supply `id` = `UUID()` computed each get → generates a new identity every access, breaking diffing.
* In SwiftUI `ForEach(array)` the element must be `Identifiable`; otherwise, supply a key path `\.self` or custom `id: \.foo`.
* Avoid synthesising `Identifiable` from row index; indices mutate when the array reorders.

## 6. Selected Use-Case Recipes

### SwiftUI List with stable model

```swift
struct ContentView: View {
    @State private var users = [
        User(id: UUID(), name: "Ada"),
        User(id: UUID(), name: "Grace")
    ]

    var body: some View {
        List(users) { user in        // uses Identifiable
            Text(user.name)
        }
    }
}
```

### Diffable Data Source

```swift
let snapshot = NSDiffableDataSourceSnapshot<Section, User.ID>()
snapshot.appendSections([.main])
snapshot.appendItems(users.map(\.id))
```

### Bridging Classes

```swift
final class Note: Identifiable, ObservableObject {
    let id = UUID()
    @Published var text: String
    init(text: String) { self.text = text }
}
```

### Protocol with Associated Identity

```swift
protocol Cacheable: Identifiable where ID == String {
    var cachedData: Data { get }
}
```

## 7. Handy Extensions

```swift
extension Collection where Element: Identifiable {
    func firstIndex(matching id: Element.ID) -> Index? {
        firstIndex { $0.id == id }
    }
}

extension MutableCollection where Element: Identifiable {
    mutating func remove(id: Element.ID) {
        if let idx = firstIndex(matching: id) { remove(at: idx) }
    }
}
```

## 8. Quiz-Style Reminders

* What’s the only requirement of Identifiable? → `var id: Hashable`.
* Can `ID` be a reference type? → Yes but discouraged (hash stability).
* Is Identifiable synthesized automatically? → No; you must declare `id`.
* Does Identifiable imply Equatable? → No; orthogonal concepts.

---

Memorise: “Stable hashable `id` gives value a persistent identity → diffable UIs & algorithms work.”