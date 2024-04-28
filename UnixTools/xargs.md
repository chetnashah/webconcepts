https://linuxhandbook.com/xargs-command/

You’ll often find xargs command being used with the find command. The find command gives you a list of filenames and the **xargs command lets you use those filenames, one by one, as if it was input to the other command.**

e..g

## Get list of files and get their space size

```
ls | xargs du -h
```

Usage:

```
my-app % ls | xargs du -h
4.0K	alldeps.txt
4.0K	go.mod
4.0K	go.sum
4.0K	main.go
4.0K	seed.txt
```

## usage

`xargs` is a command-line utility in Unix-like operating systems that allows you to build and execute command lines from standard input. It takes input from a pipe or from standard input, separates it into arguments, and executes a specified command with those arguments.

Here's the basic syntax of `xargs`:

```sql
command | xargs [options] [command [arguments]]
```

The basic usage of `xargs` is to take input from a command on its left, separate it into arguments, and pass those arguments as command-line arguments to a command on its right.

Here are some common options used with `xargs`:

- `-n num`: Specifies the maximum number of arguments to pass to each invocation of the command. The default is to use as many arguments as possible.
- `-I replacement`: Replace occurrences of `replacement` in the initial-arguments with names read from standard input.
- `-P num`: Specifies the maximum number of concurrent processes to run.
- `-t`: Print the command line on the standard error output before executing it.

Here are some examples of using `xargs`:

1. Delete multiple files matching a pattern:

```c
find . -name "*.txt" | xargs rm
```

This command finds all files with the extension `.txt` in the current directory and its subdirectories, passes their names as arguments to the `rm` command, and deletes them.

2. Count the number of lines in multiple files:

```c
ls *.txt | xargs wc -l
```

This command lists all the `.txt` files in the current directory, passes their names as arguments to the `wc -l` command, and prints the number of lines in each file.

3. Rename multiple files using a pattern:

```bash
ls *.txt | xargs -I {} mv {} {}.bak
```

This command lists all the `.txt` files in the current directory, passes their names as arguments to the `mv` command, and renames each file by appending the `.bak` extension to its name. The `-I` option is used to replace the occurrence of `{}` with the input argument.

4. Execute a command in parallel:

```c
find . -name "*.jpg" | xargs -P 4 convert -resize 800x800
```

This command finds all `.jpg` files in the current directory and its subdirectories, passes their names as arguments to the `convert` command, and resizes them to 800x800 pixels. The `-P` option is used to run up to 4 processes in parallel.
