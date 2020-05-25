Compiles OCaml/BuckeScript -> Outputs JS.

1 BS file compiles to 1 JS file.

We use NPM and Yarn

https://bucklescript.github.io/bucklescript-playground/index.html

### INterop

Major data structures in BuckleScript map over cleanly to JS. For example, a BS string is a JS string. A BS array is a JS array.

In most cases, you can directly call a JS function from BS, and vice-versa!
Most variables' name compile to clean JS names. hello compiles to hello.

OCaml tuples are compiled to JS arrays. 

Since BuckleScript 3, OCaml/Reason bool now compile to JS boolean.

`Js.Nullable.t` is same as `null/undefined`.

#### records interop

Since BuckleScript v7, OCaml/Reason records map directly to JS objects. If records contain any Non-Shared data types (like variants), then these values must be transformed separately and cannot be directly used in JS.


### Module system

Every let declarations in a BS file is exported by default and usable from JS. For the other way around, you can declare in a BS file what JS module you want to use inside BS. We can both output and consume CommonJS, ES6 and AMD modules.

