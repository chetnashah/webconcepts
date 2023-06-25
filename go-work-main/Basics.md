
### Printing GOPATH

In terminal on windows:
`echo %GOPATH%`

#### What is in GOPATH?

Three folders:
1. `bin`
2. `pkg`
3. `src` - packages are organized as : `host/user/pkgname`

### Go bin env/metadata

`go env`

### Error handling

Error last return value - unlike node js, golang has return signature of:
`(result, err)`

Create errors with `errors.New("Error message goes here")`.

```go
// Hello returns a greeting for the named person.
func Hello(name string) (string, error) {
    // If no name was given, return an error with a message.
    if name == "" {
        return "", errors.New("empty name")
    }

    // If a name was received, return a value that embeds the name
    // in a greeting message.
    message := fmt.Sprintf("Hi, %v. Welcome!", name)
    return message, nil  // happy case, return result with nil error
}

// usage
func main() {
    var result, err = Hello("jay")
    fmt.Println(result)
}
```

