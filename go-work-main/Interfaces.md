
https://jordanorelli.com/post/32665860244/how-to-use-interfaces-in-go

## Define Interfaces

An interface defines an abstract type.

```go
// not "interface" instead of "struct" to define an interface
type Animal interface {
    // The Speak method takes no arguments and returns a string. 
    Speak() string
}
```

**There is no implements keyword in Go; whether or not a type satisfies an interface is determined automatically**

## 

