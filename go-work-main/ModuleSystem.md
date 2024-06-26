Good resource: https://www.youtube.com/watch?v=Z1VhG7cf83M


### What is a go workspace?

Useful for arranging a golang monorepo, where we want to link multiple local golang projects/modules on the same machine.

https://go.dev/doc/tutorial/workspaces

We can run `go work init` in dir containing all modules/projects that we want to link to each other, which will create `go.work` file in the current directory.

### Module vs package

**Package** - A go package is just a dir with go files. The `import` keyword imports packages. When creating a package, recommended to have same dir name as package name. All files within the package must start with `package pkgname`. Visibility - only exported members are visible outside the package. Exported members start with capital letter (there is no explicit export keyword!)

**Module** - A go module is a go project/lib with `go.mod` file, i.e. dependencies versioned together with code.

### History

* Pre Go version 1.11 – Modules did not exist at all
* Go Version 1.11 – Modules was introduced but not finalized
* Go Version 1.13 – Modules was introduced

As of Go v1.13, `$GOPATH` mechanics is now largely irrelevant. 
While third-party dependencies are still placed in the GOPATH by default, you are now free to create a project anywhere in your filesystem, and vendoring and package versioning are now fully supported with the go tool.



### With modules i.e. `go.mod`, go project doesn’t necessarily have to lie the `$GOPATH/src` folder. 

### Module import path

Import path is the prefix path that will be used by any other module to import your module.

Defined in `go.mod` file,
first line of `go.mod` is the module import path of the given module.

There can be three cases that decide what import path name can be used with modules.

* The module is a utility module and you plan to publish your module
* The module is a utility module and you don’t plan to publish your module - Any package within the same module can be imported using the import path of module + directory containing that package
* The module is a executable module


### initiate project with `go mod` command

This will create a `go.mod` file in your project. This is like `package.json` in js world. i.e. it contains all the module/package metadata.

```sh
go mod init github.com/chetnashah/mymodule
```

cleaning up the `go.mod` file: run `go mod tidy` - adds missing dependencies, and removes unused dependencies

### Getting dependencies

Get dependencies using the `go get` command
```sh
go get github.com/julienschmidt/httprouter
```

Dependencies are listed in `go.sum` file automatically

Knowing why a dependency is used: `go why dependencyname`

### Semantic import versioning

v0 - unstable
v1 - stable minor
v2 - stable major

### vendor dir

Problem: if you do not use go modules, `go get` will pull down the latest code

store library code in `vendor` dir with same structure as `src` folder in `GOPATH`, kind of like `node_modules` in npm worlds.

Create vendor dir via : `go mod vendor`

Packages inside `vendor` directory will shadow packages present in `GOPATH`


### Bootstrapping a cloned project

`go get ./...`
or
`go build`

### cleaning project

`go clean - cache -modcache -i -r`


