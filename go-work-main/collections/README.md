

## Arrays

Arrays are fixed size containers. their size is part of their type.

The type `[n]T` is an array of `n` values of type `T`.

```go
arr := [3]int{1, 2, 3}
fmt.Println("type of arr is %T", arr) // [3]int

```

## slices i.e. `[]T`

### slices can be created using `make` or slice literals

```go
	arr := [3]int{1, 2, 3} // arr
	arr2 := make([]int, 3) // slice

	fmt.Printf("type of arr is %T", arr)   // [3]int array type
	fmt.Printf("type of arr2 is %T", arr2) // []int slice type

    // create slice using slice literal
    slice := []int{1, 2, 3}
    fmt.Printf("type of slice is %T", slice)
```