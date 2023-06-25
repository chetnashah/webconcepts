Idea of a `package` is similar to that of one in an npm/node ecosystem, meaning a package is a reusable peice of software in go (some think library or module). Do not confuse this with a java package which is usually a folder.


An `executable package` is one that can be run as an executable, should always be a `package main` and should always have a `main` function that will be entry point of the executable.

Non-executable libraries should always have a non-main package name.

A package statement is the first line in any go file.
A package can have more than one files.
