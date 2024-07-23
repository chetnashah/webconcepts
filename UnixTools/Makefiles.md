

## Syntax overview

Makefile syntax is used in build automation. Here's an overview of its key components:

1. Rules:
   ```makefile
   target: dependencies
       commands
   ```
   - `target`: The file to be created or the action to be executed
   - `dependencies`: Files that the target depends on
   - `commands`: Shell commands to create the target (must be indented with a tab)

2. Variables:
   ```makefile
   VARIABLE_NAME = value
   ```
   Used with `$(VARIABLE_NAME)` or `${VARIABLE_NAME}`

3. Comments:
   ```makefile
   # This is a comment
   ```

4. Phony Targets:
   ```makefile
   .PHONY: clean
   clean:
       rm *.o
   ```
   Targets that don't represent files

5. Pattern Rules:
   ```makefile
   %.o: %.c
       $(CC) -c $< -o $@
   ```
   Used for multiple files with the same rule

6. Automatic Variables:
   - `$@`: The target filename
   - `$<`: The first dependency filename
   - `$^`: All dependencies' filenames

7. Conditionals:
   ```makefile
   ifeq ($(CC),gcc)
       # gcc specific commands
   else
       # other commands
   endif
   ```

8. Include:
   ```makefile
   include other_makefile
   ```
   Includes another makefile

9. Functions:
   ```makefile
   FILES = $(wildcard *.c)
   ```
   Built-in functions for string manipulation, file operations, etc.

10. Suffix Rules (older style):
    ```makefile
    .c.o:
        $(CC) -c $<
    ```

This syntax allows for creating complex build processes, managing dependencies, and automating compilation tasks.

## make install

When you install software with make install or sudo make install, different files are placed in different directories. Executables that provide commands the user is intended to run usually go in a bin directory, libraries usually go in a lib directory, manual pages usually go in a man directory, and so forth.

When you run ./configure, the --prefix option lets you specify where those directories are. It is called `--prefix` because it lets you give the prefix that appears in the paths to each of the directories where files from the program or library that you are building are to be installed. Most configure scripts support --prefix, and omitting it and 
**just running `./configure` is typically equivalent to `./configure --prefix=/usr/local`.**

To answer this more fully, I've reproduced two sections from my answer to How to install tar file “globally”? (on Unix & Linux), which address this question specifically:

### Configuring Your Build
When you have source code that is compiled by running ./configure and make, you will usually use make install (or sudo make install) to install it. This copies files from the build directory into the install location. When the thing you are installing provides executable commands, those executables are typically copied into a directory that is in $PATH or that you should consider adding to $PATH.

Although building and installing software is often as simple as running ./configure, make, sometimes make check or make test, and then make install or sudo make install, you will sometimes want to pass options to the configure script to configure the build. In particular, as pfnuesel says, this is how you configure where the software is going to be installed. Even though the make install step actually installs the software, the locations where everything will be installed are typically established in the ./configure step.

The most common option for this is --prefix. The default prefix, when you don't tell configure what to use, is usually /usr/local. (Occasionally, a program or library's source code defaults to some other prefix. Fortunately this is rare.)

So ./configure is usually equivalent to ./configure --prefix=/usr/local. To install software in your home directory, you could use ./configure --prefix=/home/galahad (if /home/galahad is your home directory) or --prefix="$HOME". Then of course you must still build and install the software with make. I should say that not all software that is distributed in source code form is built this way. You should always look for documentation inside the extracted source code archive.

### What --prefix Means
When you run ./configure --prefix=directory, you are indicating that the software should be installed under the directory directory. But this rarely, if ever, places loose files in directory. Instead, it places files that serve different purposes in the different subdirectories of directory. If those subdirectories don't exist, it creates them.

Executables usually go in directory/bin, though they may go in directory/sbin if they're commonly used for system administration or they may go (more rarely, these days) in directory/games if they are games. Libraries go in directory/lib or another similarly named directory like directory/lib32. Header files go in directory/include. Manual pages go in directory/man. Data files used by the software go in directory/share.

That's what it means for directory to be a prefix. It's the parent directory that contains the locations in which different files will be installed. It thus appears as a prefix in the absolute paths of most files and directories created by running make install or sudo make install.

There are some exceptions to this. Systemwide configuration files--which are sometimes created when installing the software that will use them, though not always--usually go in /etc. This is not typically affected by specifying a different prefix. Even if you install a lot of software in /usr/local, it will still mostly use /etc, and your /usr/local/etc directory will probably be nonexistent, empty, or contain very few files.

On many systems, you can find more information about typical filesystem layout by running man hier. If you're using a GNU/Linux system you may be interested in the Filesystem Hierarchy Standard.

