
## Helps you inspect binaries



## Find Linked libs in a binary

```
otool -L $(which ls)
```

## libcpp vs libstdcpp

`libstdc++` is the GNU c++ standard library implementation.

`libc++` is the LLVM/clang c++ standard library implementation.

Even when compiling with clang, `libstdc++` is often used (on Linux).

A main reason `libc++` exists is that `libstdc++` is GPL and so Apple can't ship it, so you can think of `libc++` as the non-GPL `libstdc++`.

