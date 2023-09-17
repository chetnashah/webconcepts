
https://www.swiftbysundell.com/articles/building-a-command-line-tool-using-the-swift-package-manager/

https://developer.apple.com/documentation/xcode/swift-packages

## What is it?

Swift packages are reusable components of `Swift, Objective-C, Objective-C++, C, or C++` code that developers can use in their projects. 

They bundle `source files`, `binaries`, and `resources` in a way that’s easy to use in your app’s project.



## Config file is Package.swift

### Conventions

A `Sources` folder, where you put your source code. It will initially contain a main.swift file, which is the entry point to your command line tool (you can’t rename that file).

A `Tests` folder, where you put your testing code.


## Bootstrapping an executable

```
$ swift package init --type executable
```


## Build run and test a package
```
$ swift build
$ swift run
$ swift test
```


## Executable config (uses `executableTarget`)

```swift
        .executableTarget(
            name: "SampleconcurrencySPMExecutable",
            path: "Sources"),

```

## Library config

Uses plain `target`, instead of `executableTarget`.

```swift
// swift-tools-version: 5.8
// The swift-tools-version declares the minimum version of Swift required to build this package.

import PackageDescription

let package = Package(
    name: "PointfreeConcurrencybasics",
    products: [
        // Products define the executables and libraries a package produces, and make them visible to other packages.
        .library(
            name: "PointfreeConcurrencybasics",
            targets: ["PointfreeConcurrencybasics"]),
    ],
    dependencies: [
        // Dependencies declare other packages that this package depends on.
        // .package(url: /* package url */, from: "1.0.0"),
    ],
    targets: [
        // Targets are the basic building blocks of a package. A target can define a module or a test suite.
        // Targets can depend on other targets in this package, and on products in packages this package depends on.
        .target(
            name: "PointfreeConcurrencybasics",
            dependencies: []),
        .testTarget(
            name: "PointfreeConcurrencybasicsTests",
            dependencies: ["PointfreeConcurrencybasics"]),
    ]
)
```

## Mixed language targets

Targets can contain Swift, Objective-C/C++, or C/C++ code, but **an individual target can’t mix Swift with C-family languages.**

For example, a Swift package can have two targets, one that contains Objective-C, Objective-C++, and C code, and a second one that contains Swift code.

```swift
// package.swift
products: [
    .library(
        name: "MyLibrary",
        targets: ["MyLibrarySwift", "MyLibraryObjC"]),
],
.target(name: "MyLibraryObjC",
        path: "Sources/MyLibraryObjC"
),
.target(name: "MyLibrarySwift",
        path: "Sources/MyLibrarySwift"
)
```
