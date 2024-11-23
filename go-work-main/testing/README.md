
## Where to put tests?

- in the same directory as the source code
- in a subdirectory called tests
- in a subdirectory called test

## What to name the test file?

- file name should end with `_test.go`, e.g. `main_test.go` or `greet_test.go`

## How to write a test function?

- function name should start with `Test` , e.g. `TestMain` or `TestGreet`
- function should have one `*testing.T` parameter

e.g.

```go
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

