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
	checkSlices()
}

func checkSlices() {
	arr := [3]int{1, 2, 3}                 // arr
	arr2 := make([]int, 3)                 // slice
	fmt.Printf("type of arr is %T", arr)   // [3]int
	fmt.Printf("type of arr2 is %T", arr2) // []int
}

func boring(msg string, c chan string) {
	for i := 0; ; i++ {
		c <- fmt.Sprintf("%s %d", msg, i) // sending formatted string over channel
		time.Sleep(time.Second)
	}
}
