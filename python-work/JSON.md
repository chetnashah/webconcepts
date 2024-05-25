## Serialization - Convert Python Objects (dict/list) to JSON Strings

This is like `JSON.stringify()` in JavaScript.

the `json.dumps()` function is used to convert a Python object into a JSON string. The term "dumps" stands for "dump string." It takes a Python object, such as a dictionary or a list, and returns a string that represents the object in JSON format.

```py
import json

data = {
    "name": "John",
    "age": 30,
    "city": "New York"
}

json_string = json.dumps(data)
print(json_string) # {"name": "John", "age": 30, "city": "New York"}
```

## Deserialization - json.loads() to Convert JSON Strings to Python Objects

This is equivalent to `JSON.parse()` in JavaScript.

`json.loads()`, which is used to deserialize a JSON string back into a Python object. The term "loads" stands for "load string." It takes a JSON string and returns a Python object, such as a dictionary or a list.

```py
import json

json_string = '{"name": "John", "age": 30, "city": "New York"}'

data = json.loads(json_string)
print(data) #
# {'name': 'John', 'age': 30, 'city': 'New York'}
```
