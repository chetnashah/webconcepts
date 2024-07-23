
## stdlib.h - system library (string, sorting, malloc, random number stuff)

1. Memory management: `malloc()`, `calloc()`, `realloc()`, `free()`
2. String conversion: `atoi()`, `atol()`, `atof()`, `strtol()`, `strtod()`
3. Random number generation: `rand()`, `srand()`
4. Sorting and searching: `qsort()`, `bsearch()`
5. Get environment: `getenv()`, `putenv()`, `setenv()`, `unsetenv()`

## unistd.h - (For Unix standard, i.e system calls) also supported on macOS

1. File operations: `read()`, `write()`, `close()`, `unlink()`, `lseek()`
2. Process control: `fork()`, exec family (`execl`, `execlp`, etc.), `pipe()`
3. Program execution: `sleep()`, `usleep()`
4. User information: `getuid()`, `getgid()`, `geteuid()`, `getegid()`
5. System information: `getpid()`, `getppid()`, `gethostname()`, `sysconf()`
6. Directory operations: `chdir()`, `getcwd()`, `rmdir()`
7. Symbolic links: `symlink()`, `readlink()`
8. File descriptors: `dup()`, `dup2()`
9.  System parameters: `sysconf()`

