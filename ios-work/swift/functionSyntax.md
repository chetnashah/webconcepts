# Parameters in Swift Functions & Closures  
*(Swift 5.10 syntax – everything works the same on 5.7 + unless noted)*  

Swift lets you give each parameter up to **two different “names”**:

* **external (argument) label** – used at the call-site.  
* **internal (parameter) name** – used inside the function body.

```
func foo(external internal: Int) { … }
          └──────┬──────┘
         seen by caller   used in body
```

You can also choose to have **only one name** (or even none).  
Below is every legal spelling you can use for functions and for closures (“lambdas”).

---

## 1. Function declarations

| Form | Syntax | Call-site | Notes |
|------|--------|-----------|-------|
| 1. Same label & parameter name (the default) | `func greet(name: String)` | `greet(name: "Ada")` | When you supply just one identifier, it is **both** the external and the internal name. |
| 2. Different external & internal names | `func greet(person name: String)` | `greet(person: "Ada")` | Gives you two names. |
| 3. No external name (underscore) | `func greet(_ name: String)` | `greet("Ada")` | Underscore removes the argument label. Internal name still exists. |
| 4. Custom external name only (anonymous internal) | `func greet(person _: String)` | `greet(person: "Ada")` | Rare; no way to refer to the value inside (which is why it’s seldom used). |
| 5. No labels at all (operator/initialiser‐like) | `func *(lhs: Vector, rhs: Vector) -> Vector` | `v1 * v2` | Operator functions never have external labels. Same for initialisers `init(_ value: Int)`. |
| 6. Variadic | `func sum(_ numbers: Double...)` | `sum(1,2,3)` | `numbers` is `[Double]` inside. |
| 7. Defaulted parameters | `func log(_ msg: String, level: Int = 0)` | `log("oops")` | `level` is optional at the call-site. |
| 8. Inout | `func swapInts(_ a: inout Int, _ b: inout Int)` | `swapInts(&x,&y)` | Modifies the caller’s variables. |
| 9. Generic | `func mid<T>(_ array: [T]) -> T?` | `mid([1,2,3])` | Works for any element type. |
| 10. Async / throwing | `func fetch(url: URL) async throws -> Data` | `try await fetch(url:)` | Can combine with all label options above. |

### Answer to “one name instead of two”

Use pattern 3: the underscore.

```swift
func add(_ x: Int, _ y: Int) -> Int {
    x + y
}

add(3, 4)   // 7
```

Only **one identifier (`x`, `y`) exists inside; callers supply no label.**

---

## 2. Closure (lambda) syntax variants

A closure can be written from *most explicit* → *most concise*:

```swift
let f1: (Int, Int) -> Int =
{ (a: Int, b: Int) -> Int in
    return a + b
}
```

1. Full signature, explicit types, explicit `return`.
2. Parameter names only (types inferred from context):

```swift
let f2: (Int, Int) -> Int = { a, b in a + b }
```

3. Shorthand argument names (`$0`, `$1`, …):

```swift
let f3: (Int, Int) -> Int = { $0 + $1 }
```

4. Trailing-closure syntax (when last parameter is a closure):

```swift
func applyTwice(_ value: Int, _ f: (Int) -> Int) -> Int {
    f(f(value))
}

let doubled = applyTwice(3) { $0 * 2 }   // 12
```

5. Anonymous closure passed immediately:

```swift
let sum = { (x: Int, y: Int) in x + y }(1, 2)   // 3
```

6. Omitting the `in` keyword (only for single-expression closures with full type context — Swift 6 feature flag):

```swift
let square: (Int) -> Int = { $0 * $0 }
```

(You can drop `in` entirely only when using shorthand arguments.)

### Capturing values

```swift
func makeCounter() -> () -> Int {
    var n = 0
    return {  // captures n by reference
        n += 1
        return n
    }
}

let counter = makeCounter()
counter()  // 1
counter()  // 2
```

---

## 3. Putting it together

```swift
// A function that takes two unlabeled Ints and a trailing closure
func compute(_ a: Int, _ b: Int, using op: (Int, Int) -> Int) -> Int {
    op(a, b)
}

let result = compute(10, 5) { $0 / $1 }   // 2
```

This illustrates every requested idea:

* Parameters `a` and `b` have **one name** each (internal only).
* Call-site has no argument labels.
* The last parameter is a closure, supplied with trailing-closure syntax and shorthand argument names.

---

### TL;DR

• Yes, Swift lets you have **one identifier per parameter** by writing an underscore `_` in the declaration: `func foo(_ x: T)`  
• Every other combination (custom external label, no internal name, etc.) is also possible.  
• Closures can be as verbose or as terse as you like, from `{ (x: Int) -> Int in … }` all the way down to `{ $0 + $1 }`.