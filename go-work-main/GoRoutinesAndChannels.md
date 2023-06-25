
## Resources

https://www.youtube.com/watch?v=f6kdp27TYZs
https://www.youtube.com/watch?v=3DtUzH3zoFo

## Launching a goroutine via `go` keyword

e.g.
```go
go funcName() // launch this funcName() in a goroutine, the caller will not wait for it and keep executing next instructions
```

## What is a goroutine?

Think of it like an independently executing function.
Has its own callstack, concurrently scheduled.
multiplexed on top of threads, many goroutines can map to a single thread.
run it, not waiting for an answer, data communication will happen through channels.


## Channels

A channel provides a connection between two goroutines allowing them to communicate.

**Channels are first class values like strings and ints, which means you can create functions that take channels or return channels, or variable that refer to channels**.


### Creating a channel

```go
c := make(chan int)
```

A sender and a receiver must both be ready to play their part in communication, otherwise we wait.
**Channels do both communication and synchronization**

### Sending on a channel

Note: the arrow shows the direction of data flow.
`Sending is a blocking operation till receiver is ready.`
```go
c <- 1
```
### Receiving on a channel

Note: arrow shows direction of data flow
```go
i = <- c
```

`Reading from a channel is a blocking operation`.


### Associating a goroutine with a channel

```go
	go boring("hello", c) // pass chanel along with the function as last param
```

Channel returning function
```go
func boring(msg string) <-chan string { // note the channel return type
    c:= make(chan string)
    go func() { // anonymous function literal launched as a goroutine
        for i:=0; ; i++ {
            c <- fmt.Sprintf("%s %d", msg, i)
            time.Sleep(time.Second)
        }
    }
    return c // returning the channel
}
```

## Channels can be passed inside channels

Create a struct for that message
e.g.
```go
type Message struct {
    str string
    wait chan bool
}
```

## Select statement

`Select` is like a switch, but each case is a communication synchronization.

**Select blocks until any one case/channel can proceed**.
If many channels are ready, one case selected randomly.
Default clause - if no channel/case ready, default statement is executed directly.
e.g.
```go
select {
    case v1 := <-c1: // each case  is a communication
        fmt.Printf(" received on c1: %d", v1)
    case v2 := <-c2:
        fmt.Printf(" received on c2: %d", v2)
    case c3 <- 23:
        fmt.Printf(" sent 23 on c3")
    default:
        fmt.Printf("none was ready")
}
```