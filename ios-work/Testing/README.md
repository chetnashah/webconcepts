

## Env variables in test

Either use scheme UI or do following:
```
$ export EXAMPLE_VAR="Hello World"
```

### ACess env variables in test

```swift
ProcessInfo.processInfo.environment["EXAMPLE_VAR"]
```