
### Currying

Curly braces is currying in function argument section, not tuple.
```re
let add = (a, b) => a + b

add(3)(4)
add(3, 4)

let addTuple = ((a, b)) => a + b
add((3, 4))
```

### pipes for variants and pattern matching

`|` at the start of each line in variant or in pattern matching

e.g
```re
//variant
type payload =
  | BadResult(int)
  | GoodResult(string)
  | NoResult;

// pattern matching with switch
let data = GoodResult("Product shipped!");

let message =
  switch (data) {
  | GoodResult(theMessage) => "Success! " ++ theMessage
  | BadResult(errorCode) => "Something's wrong. The error code is: " ++ string_of_int(errorCode)
  };

```

### Pipeline operator

Whatever passed through pipeline is treated as last argument to the thing on the right.

e.g. 
`2 |> sum 3`

### Typed FP Core

All the parsing/error checking nulls/undefined should happen 
at the boundary of the system. Most of the functions can be without option??

### Lists 

Lists pattern matching is done with `,` and spread operator `...`
e.g.
```re
let sumFirstTwo = xs =>
  switch (xs) {
    | [] => None
    | [_onlyItem] => None
    | [first, second, ..._rest] => Some(first  + second)
  };
```


### Option utilities for getting default


```re
// unbox given x, and if it was None, it will return default value
// the return value is unboxed.
let optionGetWithDefault = (default, x) =>
switch(x) {
  | None => default
  | Some(y) => y
}
```

### Prevention option from spreading throughout the codebase

Using option chaining:
```re
// isOdd is something that does not deal with Options,
// but using optionMap it works just fine. i.e. takes and returns option  
  let optionMap = (f, x) =>
    switch(x) {
      | None => None
      | Some(y) = Some(y |> f)
  };

Some(3) |> optionMap(isOdd)
```



### Records

```re
type person = {
  age: int,
  name: string
};
```

If you only write `{age: 5, name: "Baby Reason"}` without an explicit declaration somewhere above, the type system will give you an error.

**Record punning** - same as js

```re
type horsePower = {power: int, metric: bool};
/* same as the type {name: string, horsePower: horsePower}; */
type car = {name: string, horsePower};
```

#### Immutable update of records

```re
let meNextYear = {...me, age: me.age + 1};
```

#### ref based mutabilitiy

```re
type person = {
  name: string,
  mutable age: int
};
let baby = {name: "Baby Reason", age: 5};
baby.age = baby.age + 1; /* alter `baby`. Happy birthday! */
```

### null / undefined interop

`None`
compiles to `undefined`! If you've got e.g. a string in JavaScript that you know might be `undefined`, type it as `option(string)` and you're done! Likewise, you can send a `Some(5)` or `None` to the JS side and expect it to be interpreted correctly

Never, EVER, pass a nested option value (e.g.   Some(Some(Some(5))) ) into the JS side.
Never, EVER, annotate a value coming from JS as option('a). Always give the concrete, non-polymorphic type

To create a JS `null`, use the value `Js.Nullable.null`. 
To create a JS `undefined`, use `Js.Nullable.undefined`

Converting null/undefined to option

`Js.Nullable.fromOption` converts from a option to `Js.Nullable.t`. 
`Js.Nullable.toOption` does the opposite.

