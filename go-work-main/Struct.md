**Go does not have classes. However, you can define methods on types like structs.**

## Struct are primary way to define types in Go

```go
type Vertex struct {
	X, Y float64
}
```

### Methods for struct

- A method is a **function with a special receiver argument, specifying struct param name**.

Go has receiver methods , which are functions that are called on a value of a specific type. The type has to be defined within your package, and the receiver is the value that is being passed to the method. The receiver is defined between the keyword func and the method name.


The receiver appears in its own argument list between the func keyword and the method name.

```go
type Vertex struct {
	X, Y float64
}

// Abs is a method of Vertex struct type, v is called receiver
func (v Vertex) Abs() float64 {
	return math.Sqrt(v.X*v.X + v.Y*v.Y)
}

func main() {
	v := Vertex{3, 4}
	fmt.Println(v.Abs())
}
```

In this example, the Abs method has a receiver of type Vertex named v.

## Struct value instantiation

```go
// Define a struct named Person
type Person struct {
    FirstName string
    LastName  string
    Age       int
}

// Create and initialize an instance of the Person struct
person2 := Person{
    FirstName: "Jane",
    LastName:  "Doe",
    Age:       25,
}
```

## Struct nesting/embedding

```go
type Address struct {
    City    string
    Country string
}

type PersonWithAddress struct {
    FirstName string
    LastName  string
    Age       int
    Address   Address // Embedded struct
}
```