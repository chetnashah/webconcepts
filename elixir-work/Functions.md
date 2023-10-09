


## Anonymous functions

The syntax is `fn args -> body end`.

```
Enum.map([1, 2, 3], fn n -> n + 1 end)
# => [2, 3, 4]
```

```
myAddition = fn (a, b) -> a + b end
```

Another multi body function

```
demo_function = fn
  {:ok, result} -> IO.puts (Enum.join(["Printing output:", result], " "))
  {:error} -> IO.puts "An error has occurred!"
end

#Call anonymous functions with multiple bodies
#Following two calls will perfectly match to one of the bodies
my_var = 10
demo_function.({:ok, my_var})
demo_function.({:error})
```

## def to define named functions

```elx
def hello(name) do
    "Hello, " <> name
end
```

