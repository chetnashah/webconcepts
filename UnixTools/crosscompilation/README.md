A compiler typically needs to be built as a cross-compiler first to properly cross-compile. Here's the explanation:

Regular Compiler vs Cross Compiler:
```
build  = system where you're building the compiler (x86_64)
host   = system where compiler will run (x86_64)
target = system for compiled programs (including the compiler) to run (aarch64)

Examples:
1. Native compiler:
   build = host = target (all x86_64)

2. Cross compiler:
   build = host (x86_64)
   target (aarch64)

3. Canadian cross:
   build (x86_64) -> build a cross-compiler to be run on host
   host (arm64) -> this is where we generate binaries (we can also create gcc) that are supposed to be run on target 
   target (riscv64)

   a. we have cc1 = runs on x86, produces binaries that run on x86.
   b. use cc1 to create cc2 which runs on x86, produces binaries for arm.
   c. use cc2 to creae cc3 which runs on 
```
