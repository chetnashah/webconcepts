
## Why decorators?

Useful for cross cutting concerns like:
1. Authentication
2. Tracking
3. Performance Benchmarking/tracing

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
