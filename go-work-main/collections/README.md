

## Arrays

Arrays are fixed size containers. their size is part of their type.

The type `[n]T` is an array of `n` values of type `T`.

```go
arr := [3]int{1, 2, 3}

fmt.Println("type of arr is %T", arr) // [3]int

```

## slices