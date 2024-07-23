

## Common binutils

Here's a comparison of similar binary utility tools on Linux and macOS in a table format:

| Function                  | Linux Tool | macOS Tool        | Notes                                                  |
| ------------------------- | ---------- | ----------------- | ------------------------------------------------------ |
| List shared library deps  | ldd        | otool -L          | macOS also has dyld_info for more detailed information |
| Disassemble binary        | objdump    | otool -tV         | objdump is available on macOS if installed             |
| List symbols              | nm         | nm                | Similar functionality on both systems                  |
| Display file headers      | readelf -h | otool -h          | macOS's Mach-O format differs from ELF used in Linux   |
| Strip symbols             | strip      | strip             | Similar functionality on both systems                  |
| Display string contents   | strings    | strings           | Similar functionality on both systems                  |
| Create static libraries   | ar         | libtool           | ar is also available on macOS                          |
| Create shared libraries   | gcc/ld     | gcc/ld            | Use -dynamiclib flag on macOS instead of -shared       |
| Trace system calls        | strace     | dtruss            | dtruss is part of DTrace on macOS                      |
| Profile program execution | gprof      | sample            | Instruments (GUI) is often used on macOS               |
| Manipulate object files   | objcopy    | lipo              | lipo is specific to macOS for fat (universal) binaries |
| Display dynamic section   | readelf -d | otool -l          | Look for LC_LOAD_DYLIB in otool output                 |
| Address sanitizer         | asan       | asan              | Available in both gcc and clang                        |
| Link-time optimization    | lto        | lto               | Available in both gcc and clang                        |
| Debug information         | dwarf      | dwarf/dsym        | macOS uses dSYM bundles alongside DWARF                |
| Package management        | dpkg/rpm   | pkgbuild          | macOS also uses .pkg format                            |
| Dynamic linker            | ld.so      | dyld              | Different approaches to dynamic linking                |
| Binary patching           | patchelf   | install_name_tool | Used to modify dynamic linking information             |
| File type identification  | file       | file              | Similar functionality, but output differs              |

Additional notes:

1. Many GNU tools are available on macOS through package managers like Homebrew or MacPorts.
2. macOS uses the Mach-O binary format, while Linux typically uses ELF.
3. macOS has some unique tools like `codesign` for code signing and `jtool2` for binary analysis.
4. The LLVM toolchain (including clang) is the default on macOS, while both GCC and LLVM are common on Linux.
5. macOS includes additional security features like System Integrity Protection (SIP) that can affect how these tools operate.

Remember that while many tools have similar names or functions across both systems, the exact usage and output may differ. Always consult the man pages or documentation for the specific version of the tool you're using on your system.

## What is included in binutils?

Here's a list of the main tools typically included in Binutils:

1. `as` - The GNU assembler
2. `ld` - The GNU linker
3. `ar` - Create, modify, and extract from archives
4. `nm` - List symbols from object files
5. objcopy - Copy and translate object files
6. objdump - Display information from object files
7. ranlib - Generate index to archive contents
8. readelf - Display information about ELF files
9. size - List section sizes and total size
10. strings - Print the strings of printable characters in files
11. strip - Discard symbols and other data from object files
12. addr2line - Convert addresses to file and line
13. c++filt - Filter to demangle encoded C++ symbols
14. elfedit - Update the ELF header of ELF files
15. gprof - Display call graph profile data
16. windmc and windres - Windows-specific tools (for cross-compilation)
17. dlltool - Create .def files (for Windows DLLs)
18. nlmconv - Convert object code into an NLM (NetWare Loadable Module)
19. gold - An alternative linker (faster than ld in some cases)
20. bfd - The Binary File Descriptor library (not a standalone tool, but a core component)
