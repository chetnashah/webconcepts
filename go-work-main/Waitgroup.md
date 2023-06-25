
https://gobyexample.com/waitgroups

Part of `sync` package

## similar to join operation (e.g. threads in java)

WaitGroup is used to wait for all the goroutines launched here to finish.

by default there is no waiting on `main()` e.g. if i fire off a goroutine and don't wait for it,
the main routine will finish before goroutine gets a chance to execute run

e.g.
```go
func main(){
    go attack()
    // not waiting for attack to be finished
}

func attack(){
    fmt.Println("attacking something")
}
```

## Declaring a waitgroup

```go
var wtGrp sync.waitGroup
```

## Telling Waitgroup that worker is done

```go
wtGrp.Done()
```
If you pass a waitgroup to a function, by value, it will create another Waitgroup, so **recommended to pass pointer to Waitgrp**

To many `Done()`, compared to `Add` might result in `negative Waitgroup Couter` error.

## Waiting
```go
wtGrp.Wait()
```
It waits till all the Added counters are `Done`.Failing to have all Done in reasonable time might result in Deadlocks


## Example

```go
package main

import (
	"fmt"
	"sync"
)

func main() {
	var wtGrp sync.WaitGroup
	wtGrp.Add(1)              // number of Done's to wait for
	go attack("john", &wtGrp) // launch goroutine with a reference to waitgroup
	wtGrp.Wait()              // Waiting for all Done on Goroutines
	fmt.Println("Main finishiing")
}

func attack(name string, wtGrp *sync.WaitGroup) {
	fmt.Println("attacking ", name)
	wtGrp.Done()
}
```