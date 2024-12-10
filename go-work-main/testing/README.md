
## Where to put tests?

- in the same directory as the source code
- in a subdirectory called tests
- in a subdirectory called test

## What to name the test file?

- file name should end with `_test.go`, e.g. `main_test.go` or `greet_test.go`

## How to write a test function?

- function should be in a package called `main`, can also be in a different package
- function name should start with `Test` , e.g. `TestMain` or `TestGreet`
- function should have one `*testing.T` parameter

e.g.

```go
package main

import "testing"

func TestMain(t *testing.T) {
    // ...
}

func TestGreet(t *testing.T) {
    // ...
}
```

### What to do with `t`?

- call `t.Error` if the test fails
- call `t.Fatal` if the test should not continue
- call `t.Log` to print information about the test

## How to run tests?

- `go test`

## Should test be in the same package as the source code?

In Go, tests can be either in the same package as the source file (internal tests) or in a separate package (external tests). Both approaches have their own use cases and benefits.

### Internal Tests (Same Package)

**Pros:**
1. **Access to Unexported Members**: Internal tests can access unexported fields, methods, and functions, allowing for more comprehensive testing.
2. **Simpler Test Setup**: Since the test is in the same package, you don’t need to import the package being tested.

**Cons:**
1. **Tight Coupling**: Internal tests can become tightly coupled with the implementation details, which might make refactoring harder.
2. **Less Modular**: Internal tests might not encourage good API design, as they can rely on unexported members.

**Example:**
```go
// main.go
package main

import "fmt"

func add(a, b int) int {
    return a + b
}

func main() {
    fmt.Println(add(1, 2))
}
```

```go
// main_test.go
package main

import "testing"

func TestAdd(t *testing.T) {
    result := add(1, 2)
    if result != 3 {
        t.Errorf("Expected 3 but got %d", result)
    }
}
```

### External Tests (Different Package)

**Pros:**
1. **Encourages Good API Design**: External tests force you to test the public API, which can lead to better-designed interfaces.
2. **Decoupled from Implementation**: They are less likely to break when internal implementation changes, promoting better encapsulation.

**Cons:**
1. **Limited Access**: External tests cannot access unexported members, which might limit the scope of testing.
2. **More Complex Setup**: You need to import the package being tested.

**Example:**
```go
// main.go
package main

import "fmt"

func Add(a, b int) int {
    return a + b
}

func main() {
    fmt.Println(Add(1, 2))
}
```

```go
// main_test.go
package main_test

import (
    "testing"
    "your_package_name"
)

func TestAdd(t *testing.T) {
    result := your_package_name.Add(1, 2)
    if result != 3 {
        t.Errorf("Expected 3 but got %d", result)
    }
}
```

### Best Practices
- **Internal Tests**: Use for testing internal implementation details and ensuring that the internal logic of your package works correctly.
- **External Tests**: Use for testing the public API of your package to ensure that it works as expected from the perspective of an external user.

In practice, many Go projects use a combination of both internal and external tests to achieve comprehensive coverage.