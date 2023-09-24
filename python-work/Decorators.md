
## Syntax

### decorators are functions!

```py
@decorator
def func(a):
    return a
```

is equivalent to 

```py
def func(a):
    return a

func = decorator(func)
```
