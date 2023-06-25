
### Return types

A function can return multiple return values.
This can be observed from the return type.

```go
func vals() (int, int) {
    return 3, 7
}
```

### Pointers 

A pointer has memory address of a value.

The type `*T` is a pointer to a `T` value. Its zero value is `nil`.

Use `&` to get a pointer to a value, and `*` to dereference a pointer


### Reference types

Passed by reference types:
1. `slices`
2. `maps`
3. `channels`
4. `functions`


### Arrays (fixed length)

The type `[n]T` is an array of `n` values of type `T`.

```go
var names [5]string = [5]string{"jay", "john", "paul","george", "ringo"}
```


### slices (dynamic length)

The type `[]T` is a slice with elements of type `T`.

slices passed to a function are passed by reference,
no explicit pointer syntax is needed


### interace type
An interface type is defined as a `set of method signatures`.

A value of interface type can hold any value that implements those methods.

```go
type Fetcher interface {
	// Fetch returns a slice of URLs found on the page.
	Fetch(url string) (urls []string, err error)
}
```

### struct type

A `struct` is a collection of fields, separated by newlines
Struct is a `value type`, i.e. `copied` on passing to function, and also on assignment.

#### declaration
```go
type Vertex struct {
	X int
	Y int
}
```

#### construction

The not recommended/bad way: not specifying labels in construction (declaration may swap field order and break semantics)
```go
type Vertex struct {
	X int
	Y int
}
// construction params in curly braces instead of round braces
var v = Vertex{1,2} // no new keyword 
```

**Recommended way** : construct struct records with both `labels` and `values` separated by colon(`:`)
e.g.
```go
type Vertex struct {
    X int
    Y int
}
// notice curly braces for constructing struct records
var v = Vertex{X: 1, Y: 2}// labels and values separated by colon
```

**Zero valued structs** unitialized structs are actually records with all field
values set to their respective zero values as per field type,
e.g. `var v Vertex` when printed is `{0 0}`


#### access

struct member field access happens via `.` operator
```go
var v = Vertex{1,2} // no new keyword 
v.X = 4
```

#### struct pointer access (same as above)

Struct fields can be accessed through a struct pointer.

To access the field `X` of a struct when we have the struct pointer `p` we could write `(*p).X`. 
However, that notation is cumbersome, so the language permits us instead to write just `p.X`, without the explicit dereference.


#### struct with receiver functions

Useful for adding methods to a existing struct, can be used by struct instances,
but the functions, will receive a copy of the struct that they are called upon.

i.e **structs are passed by value(i.e. copy), even for recvr functions**
```go
type person struct {
    name string
}
// struct value p is passed by value, i.e. a copy
func (p person) greet() {
    // should not mutate p
    fmt.Println(p.name)
}
// can be used as
p := person {name: "Jay"}
p.greet()
```

**Mutation** and **pass by reference** - 
If you want recvr functions to mutate the instance that 
is being called upon, take a pointer to struct instead.

e.g.
```go
type person struct {
    name string
}

// pointer is passed by value which is essentially reference to structu
func (pointerToPerson *person) changeName(newname string) {
    pointerToPerson.name = newname
}

p := person { name: "jay"}
fmt.Println(p) // jay
(&p).changeName("jayshah") // passing struct by reference
fmt.Println(p) // jayshah
```