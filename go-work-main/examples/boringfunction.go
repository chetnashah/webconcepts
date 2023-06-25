package main

import (
	"fmt"
	"time"
)

func main() {
	c := make(chan string)
	go boring("hello", c) // launch a goroutine, main will not wait for it and exit
	for i := 0; i < 5; i++ {
		fmt.Printf(" You say %q\n", <-c) // getting formatted string over channel
	}
	fmt.Println("done")
}

func boring(msg string, c chan string) {
	for i := 0; ; i++ {
		c <- fmt.Sprintf("%s %d", msg, i) // sending formatted string over channel
		time.Sleep(time.Second)
	}
}
