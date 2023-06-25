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
