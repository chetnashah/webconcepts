
pkg-config is a system for managing library compile and link flags that are needed to build applications. It simplifies the process of finding and using libraries on Unix-like systems by providing a consistent interface for querying information about installed libraries. This information includes compiler flags, linker flags, and other configuration details necessary for compiling and linking against a particular library.

## pkg-config support

Yes, pkg-config is supported on both macOS and Linux systems. It is a widely used and accepted tool in the Unix-like development ecosystem, and it helps simplify the process of configuring build systems to use external libraries. Here are details about pkg-config support on both platforms:


On macOS, pkg-config is not included by default, but it can be easily installed using package managers such as Homebrew.

## print info

```
pkg-config --cflags --libs library-name

```