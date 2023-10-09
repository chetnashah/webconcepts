

## What is a module?

It is a namespace. Modules allow us to organize functions into a namespace. In addition to grouping functions, they allow us to define named and private functions.

```
defmodule Example do
  def greeting(name) do
    "Hello #{name}."
  end
end

iex> Example.greeting "Sean"
"Hello Sean."
```


## Module attributes

```
defmodule Example do
  @greeting "Hello" // module level constant

  def greeting(name) do
    ~s(#{@greeting} #{name}.)
  end
end
```