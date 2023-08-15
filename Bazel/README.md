
## How does it work?

1. Loads the `BUILD` files
2. creates dependency graph
3. executes tasks to create targets

## `xyz.bzl` files 

## BUILD file

* tells Bazel what to build and how to build it.

A `BUILD` file defines a package: **A directory within the workspace that contains a BUILD file is a package.**




### Build targets vs rules

**target** - A build target specifies a set of input artifacts that Bazel will build plus their dependencies, the build rule Bazel will use to build it, and options that configure the build rule.

**rules** - A build rule specifies the build tools Bazel will use, such as compilers and linkers, and their configurations. Bazel ships with a number of build rules covering the most common artifact types in the supported languages on supported platforms.


### Asking Bazel to build targets

Consider project dir structure:
```
examples
└── cpp-tutorial
    └──stage1
       ├── main
       │   ├── BUILD
       │   └── hello-world.cc
       └── WORKSPACE
```
And the contents of `BUILD` file to be:
```
cc_binary(
    name = "hello-world",
    srcs = ["hello-world.cc"],
)
```

Now we see a target named `hello-world` inside `main` dir. To reference the target one must use following syntax: `//path:target-name` i.e. `//main:hello-world`

To do the build use:
`bazel build //main:hello-world`

## WORKSPACE file

`WORKSPACE` file identifies the directory and its contents as a Bazel workspace and lives at the root of the project's directory structure

## Usage with external libraries

https://khjtony.github.io/programming/2018/12/31/Add-external-library-to-bazel.html
explains both Bazel supported and non-supported libs.