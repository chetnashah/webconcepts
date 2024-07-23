Autoconf is a tool for producing shell scripts that automatically configure software source code packages to adapt to many kinds of Posix-like systems. Here's a detailed explanation of how Autoconf works, with examples:

1. Overview of Autoconf:
   Autoconf is part of the GNU Build System (also known as the Autotools). It generates a configuration script from a template file that lists the operating system features that the package can use.

2. Main Components:
   - configure.ac: The configuration template
   - autoconf: The tool that processes configure.ac
   - configure: The generated shell script

3. Writing configure.ac:
   This is the main input file for autoconf. It's written in a mixture of M4 macro language and shell script.

   Example configure.ac:
   ```autoconf
   AC_INIT([myproject], [1.0], [bug-report@example.com])
   AC_CONFIG_SRCDIR([src/main.c])
   AC_CONFIG_HEADERS([config.h])

   # Checks for programs
   AC_PROG_CC

   # Checks for libraries
   AC_CHECK_LIB([m], [cos])

   # Checks for header files
   AC_CHECK_HEADERS([stdlib.h stdio.h])

   # Checks for typedefs, structures, and compiler characteristics
   AC_TYPE_SIZE_T

   # Checks for library functions
   AC_FUNC_MALLOC
   AC_CHECK_FUNCS([strchr])

   AC_CONFIG_FILES([Makefile src/Makefile])
   AC_OUTPUT
   ```

4. Macros in configure.ac:
   - AC_INIT: Initializes Autoconf
   - AC_CONFIG_SRCDIR: Sanity check to ensure the source directory is correct
   - AC_CONFIG_HEADERS: Creates a config.h file
   - AC_PROG_CC: Checks for a C compiler
   - AC_CHECK_LIB: Checks for a specific library
   - AC_CHECK_HEADERS: Checks for specific header files
   - AC_TYPE_SIZE_T: Checks for the size_t type
   - AC_FUNC_MALLOC: Checks for a working malloc
   - AC_CHECK_FUNCS: Checks for specific functions
   - AC_CONFIG_FILES: Specifies which files to generate
   - AC_OUTPUT: Generates the output files

5. Running Autoconf:
   Once you have your configure.ac file, you run autoconf:
   ```
   $ autoconf
   ```
   This generates the configure script.

6. The configure Script:
   The generated configure script is a portable shell script that can be run on the target system. It performs all the checks specified in configure.ac.

7. Running configure:
   Users of your software package run the configure script:
   ```
   $ ./configure
   ```
   This script checks the system and creates config.h and Makefile(s).

8. Config.h:
   This header file contains #define directives based on the system checks. Your source code can then use these defines for conditional compilation.

   Example config.h:
   ```c
   /* Define to 1 if you have the <stdlib.h> header file. */
   #define HAVE_STDLIB_H 1

   /* Define to 1 if you have the `malloc' function. */
   #define HAVE_MALLOC 1
   ```

9. Makefile.in and Generated Makefile:
   You provide Makefile.in templates. The configure script uses these to generate the final Makefiles, substituting variables as needed.

   Example Makefile.in:
   ```makefile
   CC = @CC@
   CFLAGS = @CFLAGS@
   
   myprogram: main.o
       $(CC) $(CFLAGS) -o $@ $^
   ```

   The @CC@ and @CFLAGS@ are replaced by the values determined by configure.

10. Using Autoconf with Automake:
    Automake is often used alongside Autoconf to generate Makefile.in files from a higher-level description file called Makefile.am.

This process allows developers to write portable code that can adapt to different Unix-like systems without manual intervention. It checks for system-specific features and creates a build environment tailored to each system where the software is compiled.