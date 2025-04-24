


### Ways to execute sequential tasks asynchronously 

1. run them one after other, but no interaction between them.
2. task pass data to be processed by the next task. (chain/pipeline/waterfall)
3. async operation for each item in collection.

Async sequencital iteration pattern:

```js
function iterate(index) {
    if(index === tasks.length) {
        return finish();
    }
    const task = tasks[index];
    task(() => iterate(index ++ 1));
}
function finish(){
    // iteration completed
}
iterate(0)'
```
**Note** - Algorithm really becomes recursive if `task()` is synchronous,
and can result in maximum call stack size.
For async `task`, stack will unwind in event cycle.

Final signature something like:
```js
iterateSeries(collection, iteratorCallback, finalCallback);
```


### Parellel execution pattern

competitive race between tasks

```js
const tasks = [];
let completed = 0;
tasks.forEach((task) => {
    task(()=> {
        if(++completed = tasks.length){
            finish();
        }
    })
});
function finish(){
}
```

keep num of parellel tasks in check, not too many or it will deplete resources

### callback api design

Either consistently call the callback synchronously or asynchronously (use nextTick where necessary for simple cases).
This will guarantee consistent behavior on the event loop (call stack).

### Task Queues for limiting concurrency

Combines both sequential and parellel uproach for necessary parellelization.
**Note**- error in one of the tasks should not stop other tasks from running.

```js
// limit tasks with a given concurrency.
class TaskQueue {
  constructor(concurrency) {
      this.concurrency = concurrency;
      this.queue = [];
      this.running = 0;
  }
  pushTask(task) {
      this.queue.push(task);
      process.nextTick(this.next.bind(this));// why?
      return this; // probably for chaining?
  }
  next (){
      while(this.running < this.concurrency && this.queue.length){
          const task = this.queue.shift();
          task(() => {// cb when task is done
              this.running--;
              process.nextTick(this.next.bind(this)); // why?
          });
          this.running++;
      }
  }
}

// example run
const tk = new TaskQueue(1);
const task1 = (cb) => {
  console.log('task1 running');
  setTimeout(() => {
      cb()
  }, 1000);
}
const task2 = (cb) => {
  console.log('task2 running');
  setTimeout(() => {
      cb();
  }, 1500);
};
const task3 = (cb) => {
  console.log('task3 running');
  setTimeout(() => {
      cb()
  }, 1000);
}
const task4 = (cb) => {
  console.log('task4 running');
  setTimeout(() => {
      cb();
  }, 1500);
};

tk.pushTask(task1);
tk.pushTask(task2);
tk.pushTask(task3);
tk.pushTask(task4);
```