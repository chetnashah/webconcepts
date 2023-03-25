
## REPL

```sh
iex
iex> 2+2
iex>4
```

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