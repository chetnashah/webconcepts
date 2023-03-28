
## REPL

```sh
iex
iex> 2+2
iex>4
```

## Learning

https://elixircasts.io/

https://elixir-lang.org/learning.html

## Naming conventions

https://hexdocs.pm/elixir/naming-conventions.html

Elixir developers must use `snake_case` when defining `variables`, `function names`, `module attributes`, and the like:
```elixir
some_map = %{this_is_a_key: "and a value"}
is_map(some_map)
```
Module names are an exception as they must be capitalized and written in `CamelCase`, like `OptionParser`. 

### Trailing bang (`foo!`)

Trailing bang (`foo!`)
A trailing bang (exclamation mark) signifies a function or macro where failure cases raise an exception.

### Trailing question mark (`foo?`)

Functions that return a boolean are named with a trailing question mark.

Examples: `Keyword.keyword?/1`, `Mix.debug?/0`, `String.contains?/2`

### is_ prefix

Type checks and other boolean checks that are allowed in guard clauses are named with an `is_` prefix




## file name & running

* `.ex` files - meant to be compiled to bytecode
* `.exs` files - more like scripts to be interpreted.

`helloworld.exs` would be filename.
To interpret the file we use `elixir filename.exs`
e.g.
```sh
elixir helloworld.exs
```

Sample program that prints hello world:
```elixir
//helloworld.exs
IO.puts "Hello world"
```
Run it using
`elixir helloworld.exs`

### Project organization

Elixir projects are usually organized into three directories:

* `_build` - contains compilation artifacts
* `lib` - contains Elixir code (usually .ex files)
* `test` - contains tests (usually .exs files)

### Getting help

Use `h(Module)` , e.g. `h(Enum)`

### Use `i` to interospect value

e.g. `i("hello")`
`i(2)` returns:
```sh
iex(3)> i(2)
Term
  2
Data type
  Integer
Reference modules
  Integer
Implemented protocols
  IEx.Info, Inspect, List.Chars, String.Chars
```

## I/O

USe `IO.puts "hello world"`
e.g. 
```sh
iex(5)> IO.puts "hello world"
hello world
:ok
```

## Variables

## Equality

equals sign is patternmatch not assignment

the equals sign is not an assignment. Instead it’s like an assertion. It succeeds if Elixir can find a way of making the left-hand side equal the right-hand side. Elixir calls the = symbol the match operator.


## List

```sh
list = [ 1, 2, 3 ]
```