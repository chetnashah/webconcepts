
## Which declarations are allowed where?

| Declaration Type | Top Level | Class/Struct/Enum | Function |
|-----------------|:---------:|:-----------------:|:--------:|
| var/let | ✅ | ✅ | ✅ |
| func | ✅ | ✅ | ✅ |
| class | ✅ | ✅ | ❌ |
| struct | ✅ | ✅ | ❌ |
| enum | ✅ | ✅ | ❌ |
| protocol | ✅ | ✅ | ❌ |
| extension | ✅ | ❌ | ❌ |
| typealias | ✅ | ✅ | ❌ |
| import | ✅ | ❌ | ❌ |
| operator | ✅ | ❌ | ❌ |
| init | ❌ | ✅ | ❌ |
| deinit | ❌ | ✅ | ❌ |
| subscript | ❌ | ✅ | ❌ |
| property observers (willSet/didSet) | ❌ | ✅ | ❌ |
| computed properties | ❌ | ✅ | ❌ |
| static/class properties | ❌ | ✅ | ❌ |
| lazy properties | ❌ | ✅ | ❌ |
| access modifiers (public, private, etc.) | ✅ | ✅ | ❌ |
| attributes (@available, etc.) | ✅ | ✅ | ✅ |
| defer statements | ❌ | ❌ | ✅ |
| closures | ❌ | ❌ | ✅ |
| guard/if let bindings | ❌ | ❌ | ✅ |

## Another way to summarize this

Certainly! Here's a table summarizing the different kinds of declarations allowed in Swift's top-level code, class/struct/enum scope, and function scope:

| **Declaration Type** | **Top-Level Code**                                               | **Class/Struct/Enum Scope**                                  | **Function Scope**                                           |
|----------------------|------------------------------------------------------------------|--------------------------------------------------------------|--------------------------------------------------------------|
| **Variables & Constants** | `var`, `let`<br>Accessible throughout the module                | Instance properties (`var`, `let`)<br>Static properties (`static var`, `static let`) | Local variables (`var`, `let`)<br>Control flow variables (`if`, `guard`) |
| **Types**            | `class`, `struct`, `enum`, `protocol`<br>`typealias`             | Nested `class`, `struct`, `enum`<br>Protocols can be adopted   | *Not typically allowed*<sup>1</sup>                          |
| **Functions**        | Global functions                                               | Instance methods<br>Type methods (`static func`)             | Nested functions<br>Closures                                   |
| **Extensions**       | `extension`<br>Extends existing types                           | `extension`<br>Can extend the enclosing type or others        | *Not allowed*                                                 |
| **Operators**        | Custom operator declarations (`prefix`, `infix`, `postfix`)      | *Not allowed*                                                | *Not allowed*                                                 |
| **Imports**          | `import` statements                                              | *Not allowed*                                                | *Not allowed*                                                 |
| **Attributes & Access Modifiers** | Attributes (`@available`, etc.)<br>Access modifiers (`public`, `private`, etc.) | Attributes<br>Access modifiers applicable to members          | *Limited use*<sup>2</sup>                                     |
| **Initializers & Deinitializers** | *Not applicable*                                          | Initializers (`init`)<br>Deinitializers (`deinit`)            | *Not allowed*                                                 |
| **Subscripts**       | *Not allowed*                                                   | `subscript` declarations                                     | *Not allowed*                                                 |
| **Property Observers** | *Not allowed*                                                   | `willSet`, `didSet` observers on properties                   | *Not applicable*                                              |
| **Operators Overloading** | *Allowed*                                                     | *Not allowed*                                                | *Not allowed*                                                 |
| **Type Aliases**     | `typealias` declarations                                        | `typealias` within the type                                   | *Not allowed*                                                 |

---

<sup>1</sup> **Type Declarations in Function Scope:**  
While older Swift versions allowed declaring types within functions, newer versions discourage or disallow this practice. It's best to define types at the top level or within other types.

<sup>2</sup> **Attributes & Access Modifiers in Function Scope:**  
Attributes like `@discardableResult` or access modifiers are limited in function scope and typically apply to variables or constants within the function rather than the function itself.

---

### Key Notes:

- **Top-Level Code:**
  - Ideal for defining global constants, variables, functions, types, and extensions.
  - Use sparingly to maintain modularity and manage dependencies effectively.

- **Class/Struct/Enum Scope:**
  - Encapsulates properties, methods, initializers, deinitializers, and nested types.
  - Supports extensions and access control to manage visibility and access.

- **Function Scope:**
  - Designed for local variables, constants, nested functions, and closures.
  - Restricts the declaration of types and certain other declarations to maintain clarity and avoid complexity within functions.

---

This table should help you quickly reference what declarations are permissible in different scopes within Swift. Let me know if you need further clarification on any specific section!