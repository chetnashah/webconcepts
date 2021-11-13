Main things needed:
1. kernel
2. C library
3. bin utils
4. toolchain (build utils for compiling stuff)
5. shell?

Building kernel:
1. make defconfig - results in config setup
2. make -j 8 - build the kernel

4 kinds of filesystem:

1. block backed: usually the backing system is the disk.
2. pipe backed: protocol at the other end of the program provides file system
3. RAM backed: linux disk cache directly writes to memory blocks. e.g. initramfs, tmpfs, useful when disk is not yet configured.
4. synthetic file system: device implements open/write system calls that driver does arbitrarily anything.

root file system should have the init program.

### ptrace


`ptrace` system call provides means by which one process may observe and control execution of other process(tracee), and change the tracee's memory and registers.

Two use cases:
1. breakpoint debugging
2. syscall tracing