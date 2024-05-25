## type() to print type/class of an object

To print the class of an object in Python, you can use the `type()` function. The `type()` function returns the type or class of an object. Here's an example:

```python
class MyClass:
    pass

obj = MyClass()
print(type(obj))  # Output:class '__main__.MyClass'>
```

In this example, we define a class `MyClass` and create an instance of it called `obj`. By calling `type(obj)`, we can retrieve the class of the object `obj`, which isclass '**main**.MyClass'>`.

Note that the class name includes the module name (`__main__` in this case) if the object is defined in the main module. If the object is defined in a different module, the module name will be displayed accordingly.

You can also use the `.__class__` attribute of an object to access its class. Here's an example:

```python
class MyClass:
    pass

obj = MyClass()
print(obj.__class__)  # Output:class '__main__.MyClass'>
```

Both `type(obj)` and `obj.__class__` will give you the class of the object `obj`.

## dir() prints attributes and methods of an object

The `dir()` function in Python is a built-in function that returns a list of names in the current local scope or the names of an object's attributes. It can be used to explore the available attributes and methods of an object or to list the variables and functions defined in the current scope.

When called without any arguments, `dir()` returns a list of names in the current local scope. For example:

```python
def greet():
    name = "Alice"
    age = 30

print(dir())  # Output: ['__builtins__', '__doc__', '__loader__', '__name__', '__package__', '__spec__', 'greet']
```

In this example, `dir()` is called without any arguments, and it returns a list of names in the current scope, including the built-in names and the `greet` function.

You can also pass an object as an argument to `dir()` to get a list of its attributes and methods. For example:

```python
my_list = [1, 2, 3]
print(dir(my_list))  # Output: ['__add__', '__class__', '__contains__', '__delattr__', '__delitem__', '__dir__', '__doc__', '__eq__', '__format__', '__ge__', '__getattribute__', '__getitem__', '__gt__', '__hash__', '__iadd__', '__imul__', '__init__', '__init_subclass__', '__iter__', '__le__', '__len__', '__lt__', '__mul__', '__ne__', '__new__', '__reduce__', '__reduce_ex__', '__repr__', '__reversed__', '__rmul__', '__setattr__', '__setitem__', '__sizeof__', '__str__', '__subclasshook__', 'append', 'clear', 'copy', 'count', 'extend', 'index', 'insert', 'pop', 'remove', 'reverse', 'sort']
```

In this example, `dir(my_list)` returns a list of attributes and methods available for the `my_list` object, including built-in methods like `append()`, `clear()`, `copy()`, and more.

The `dir()` function is commonly used for introspection and exploration of objects and scopes in Python.
