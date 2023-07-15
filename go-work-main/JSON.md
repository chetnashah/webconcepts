
## Marshaling vs Encoding

`Marshal` => `String`
`Encode` => `Stream`
* `Marshal` and `Unmarshal` convert a string into JSON and vice versa. 
* `Encoding` and `decoding` convert a stream into JSON and vice versa.


## Encoder

`func NewEncoder(w io.Writer) *Encoder` - NewEncoder returns a new encoder that writes to `w`.





## JSON tagging (of structs) for serialization

```go
/* 
This code defines a struct called `Director` with two fields: `Firstname` and `Lastname`. The fields are annotated with `json` tags, which are used to specify how the struct should be serialized to JSON. Specifically, the `json` tags indicate that the field names in the JSON representation should be `firstname` and `lastname`, respectively.
*/
type Movie struct {
	ID       string    `json:"id"`
	Isbn     string    `json:"isbn"`
	Title    string    `json:"title"`
	Director *Director `json:"director"`
}

type Director struct {
	Firstname string `json:"firstname"`
	Lastname  string `json:"lastname"`
}
```

The `json` package is part of the Go standard library, and it provides functionality for encoding and decoding JSON data. The `json` tags in the `Director` struct are used to specify how the struct should be encoded to JSON, which is a common format for exchanging data between different systems.

Overall, this code is a simple example of how to define a struct in Go and use `json` tags to specify how it should be serialized to JSON.

## Core types

### 

A Decoder reads and decodes JSON values from an input stream.



## JSON serialization (Dict/Object -> String)

`func json.Marshal(v any) ([]byte, error)` -> takes in any object/struct and returns bytearray and error


```go
import (
	"encoding/json"
	"fmt"
)

type Movie struct {
	ID       string    `json:"id"`
	Isbn     string    `json:"isbn"`
	Title    string    `json:"title"`
	Director *Director `json:"director"`
}

type Director struct {
	Firstname string `json:"firstname"`
	Lastname  string `json:"lastname"`
}

func main() {
	movie := Movie{
		ID:    "1",
		Isbn:  "123456",
		Title: "Movie One",
		Director: &Director{
			Firstname: "John",
			Lastname:  "Doe",
		},
	}

	jsonData, err := json.Marshal(movie)
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println(string(jsonData))
}
```