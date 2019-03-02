JQ helps query and transform JSON.

https://stedolan.github.io/jq/manual/#Builtinoperatorsandfunctions
https://www.youtube.com/watch?v=_ZTibHotSew

`jid` is also a useful tool.

Useful for working with json APIs and JSONL dumps.

`type` is useful command that gives selection type.
e.g. 
`echo "[{"a": '1'}]"` will return `array`.

Key ideas:

### Filter

1. Identity filter `.`: Prints whatever is given in.

2. Project property filter `.prop`: Prints the property of given input. One can also do nested property matching e.g. with a filter like `.nested.prop`.

3. Flatmap filter `.[]`: Flatten an array and give the elements.

### Operators

Combine different filters together with operators.

1. pipe operator: `jq 'f1 | f2'`
2. comma ooperator: combine outputs, eg.. express of identity repeated twice: `jq '.,.'`

3. Grouping operator `()`: Change the order of operators e.g. `. , (. | .x)`

`.[]` returns each element of the array returned in the response, one at a time

### Constructors

Helps construct new JSON data.
1. Array construction: `[.]` will constrcut array having current data/selection inside.
2. Object construction: `{.}` will construct object
and put current selection inside object. e.g.
`echo "1" | jq '{"x":.}`. See here that we had to provide key for which the current value has to be placed.

### Bindings/Variables

**Must start with $**

Defined via `expression as $x`.
Useful instead of always using `.` for current selection.

Some nice tricks with destructuring:
Take incoming value `.` and destructure it and assign variables `$x`, `$y` and `$z`.
`. as { "a": $x, "b": [$y, $z]}`


### Functions

Introduced with `def` keyword.
`.` is an implicit argument in all functions.

Syntax is:
`def name(args): body`


### Array builtins (useful)

Expressions in jq have to specifed with single quotes `'`

1. length: `echo '[1,2,3,4]' | jq 'length'` = `4`
2. indices: `echo '[2,4,6,8]' | jq 'indices(8)'` = `3`
3. reverse: `echo '[2,4,6,8]' | jq 'reverse'` = `[8,6,4,2]`
4. contains: `echo '["orange", "apple", "peas"]' | jq 'contains(["apple", "peas])'` = `true`.
Note you need to provide array in contains.

### String builtins

1. split: `echo "Hello!" | jq 'split("l")'`
2. test(Re)
3. length
4. contains
5. startswith

### Object builtins

1. keys: `echo "{"one": 99, "two": 1000, "three": 1001}" | jq 'keys'` = `["one", "two", "three"]`
2. to_entries:   `echo "{"one": 99, "two": 1000, "three": 1001}" | jq 'to_entries'` = `[{"key": "one", "value": 99}, {"key":"two", "value":1000}, {"key":"three", "value":1001}]`
3. has: `echo "{"one": 99, "two": 1000, "three": 1001}" | jq 'has("three")'` = `true`
4. in: checks if input key is in object. `echo '["foo", "bar"]' | jq '.[] in({"foo": 22 })'` = `true false`

### map(x) and map_values(x)

Run filter x for each element of input array.
`map(x)` is equivalent for `[.[] | x]`
`map_values(x)` is similarly for object instead of array, and runs on value part.

```sh
echo '[1,2,3]' | jq 'map(.+1)'
# [2,3,4]

echo '{"a": 1, "b": 2, "c": 3}' | jq 'map_values(.+1)'
# {"a": 2, "b":3, "c": 4}
```

### range to generate range of numbers.

Does **not** explicitly create an array.
Supports `range(upto)` and `range(from;upto)`

```sh
echo null | jq 'range(4)'
# 1 2 3
echo null | jq '[range(4)]' 
# [1,2,3]
echo null | jq '[range(35;75)]'
# [35, 36, ... 74]
```

### unique and unique_by

`unique` : Takes input an array and 
produces array of same elements in sorted order with duplicates removed.

```sh
echo '[1,5,2,3,5,1,2,3,3,3,5,2,1]' | jq 'unique'
# [1, 2, 3, 5]
```

`unique_by`: Each element in the input array is treated as `.` and now the filter is applied, and first unique value is kept. Return value is array with uniques found.

```sh
echo '[{"foo": 1}, {"foo": 3, "dude": 4}, {"foo": 1, "bar":"lol"}]' | jq 'unique_by(.foo)'
# [{"foo": 1}, {"foo": 3, "dude": 4}]
```

### select

select takes a predicate and that predicate satsifaction will remain same value or return nothing if predicate is not satisfied

```sh
echo '[{"id": "first", "val": 1}, {"id":"second", "val": 2}]' | jq '.[] | select(.id == "second")'
# {"id":"second", "val": 2}
```

Some default predicates that can be used directly are

`arrays, objects, iterables, booleans, numbers, normals, finites, strings, nulls, values, scalars`

e.g.
```sh
echo '[[],{},1,"foo",null,true,false]' | jq '.[] | numbers'
# 1
```

### any and all

`any` and `all` take an array of boolean values and return `true` or `false` as per definition.

### NaN predicates

infinite, nan, isinfinite, isnan, isfinite, isnormal

### paths

### recurse(..)


### group_by(path_expression)

Takes input array
groups the array elements according to similarity of the given path_exp

```sh
echo '[1,2,3,4,1,2,3,2,1,2,3,4,2,1,2,3,2,1]' | jq 'group_by(.)'
# [ [1, 1, 1, 1, 1], [2, 2, 2, 2, 2, 2, 2], [ 3, 3, 3, 3], [4, 4] ]

echo '[{"foo": 1, "bar": 2}, {"foo": 2, "bar": 11}, {"foo": 1, "bar": 22}]' | jq 'group_by(.foo)'

# [[{"foo": 1, "bar": 2}, {"foo": 1, "bar": 22}],[{"foo": 2, "bar": 11}]]
```










