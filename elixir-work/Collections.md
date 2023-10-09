

## Lists

### Concatenation

```
iex(8)> [1, 2] ++ [3, 4, 1]
[1, 2, 3, 4, 1]
```

### Substraction

```
iex(9)> ["foo", :bar, 42] -- [42, "bar"]
["foo", :bar]
iex(10)> ["foo", :bar, 42] -- [42, :bar]
["foo"]
```

### head/tail

```
iex(11)> hd [3.14, :pie, "Apple"]
3.14
```

### cons operator `|` and pattern matching with lists

```
iex(12)> [head | tail] = [3.14, :pie, "Apple"]
[3.14, :pie, "Apple"]
```

## Maps

They allow keys of any type and are un-ordered. 

You can define a map with the `%{}` syntax:

```
iex(13)> map = %{:foo => "bar", "hello" => :world}
%{:foo => "bar", "hello" => :world}
iex(14)> map[:foo]
"bar"
```

Alternate syntax for atom keys:
```
iex(15)> %{foo: "bar", hello: "world"} == %{:foo => "bar", :hello => "world"}
true
```

### Map update existing key syntax (and it returning new map)


**Note** - this will throw error if key is not present
```
iex(17)> map = %{foo: "bar", hello: "world"}
%{foo: "bar", hello: "world"}

iex(18)> %{map | foo: "baz"} // key must be present, updates and returns new Map
%{foo: "baz", hello: "world"}
```


### Map update, create new key

```
iex(19)> map = %{hello: "world"}
%{hello: "world"}
iex(20)> Map.put(map, :adsfasf, "rwef") // create new key
%{adsfasf: "rwef", hello: "world"}
```