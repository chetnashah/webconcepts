
## Modules

we group several functions into modules, like namespaces for collection of functions

We declare module using `defmodule ModuleName do ... end`.

**The first letter of module name must be a capital letter e.g. `Math` or `Utils`**

e.g.
```elixir
defmodule Math do
    def add(a, b) do
        a + b
    end
end
```

## Functions

Functions are defined using: `def funName do ... end`

we can define functions with `def/2` and private functions with `defp/2`

**No explicit return keyword needed, last expression value is returned**

```elixir
defmodule Math do
  # by default functions are public
  def sum(a, b) do
    do_sum(a, b)
  end

  # private function
  defp do_sum(a, b) do
    a + b
  end
end

IO.puts Math.sum(1, 2)    #=> 3
IO.puts Math.do_sum(1, 2) #=> ** (UndefinedFunctionError)
```