This is Readme


## Many ways of allocating memory

Go has multiple ways of memory allocation and value initialization:

`&T{...}`, `&someLocalVar`, `new`, `make`

`new(T)`: it returns a pointer to type T a value of type `*T`, it allocates and zeroes the memory. `new(T)` is equivalent to `&T{}`.

`make(T, args)`: it returns an initialized value of type T, It allocates and initializes the memory. Its used for slices, map and channels.
`make()` can only be used to initialize **slices, maps, and channels**, and that, unlike the `new()` function, `make()` does not return a pointer.

```go
m := map[string]bool{
    "java": false,
    "go":   true,
}
```


## Everything is pass by value



