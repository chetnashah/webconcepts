

## Reader Interface

Interface for `Read` behavior
```go
type Reader interface {
	Read(p []byte) (n int, err error)
}
```

## Writer Interface

Interface for `Write` behavior

```go
type Writer interface {
	Write(p []byte) (n int, err error)
}
```