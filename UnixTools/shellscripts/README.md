
**By default a script will keep executing even if any of the statements have non-zero exit code**, to change this behavior add `set -e` on top

## bash and sh are different and they have their own syntax for some forms

## exit codes

By convention, commands that execute successfully return a 0 exit status.  
If some sort of error is encountered, then a non-zero exit status is returned.

If you want to find out what the various exit statuses mean, you have to consult the documentation for the given command or look at its source code.

**The special variable $? contains the return code of the previously executed command.**
```sh
ls /not/here  
echo "$?"  

Output: ls: /not/here: No such file or directory  
2
```

## exit codes (of shell scripts)

**Not only do normal commands return an exit status, but shell scripts do as well.**  
You can control the exit status of your shell script by using the exit command.

```sh
#!/bin/bash  
HOST="google.com"  
ping -c 1 $HOST  
if [ "$?" -ne "0" ]  
then     
    echo "$HOST unreachable."     
    exit 1  # exit code of the script
fi
exit 0 # exit code of the script
```
## `true` is a command with exit code 0, `false` is a command with exit code 1

```sh
true
echo $? # 0

false
echo $? # 1
```

### exit code when `-e` is set on the script

If the script ends pre-maturely due to a command returning non-zero exit code,
The exit code of the script will be the 
exit code of the last command that caused the script to exit.

```sh
#!/bin/bash
set -e

echo "This will run."
false  # This command fails with exit code 1
echo "This will not run."
```

## Semicolon for command separation without error checking

Separating commands with a semicolon is the same as putting the command on separate lines.

There is no error checking involved.
Commands get executed no matter if prev command failed or passed.

## Working with subcommand invocations and subscript invocations

### Be mindful of same environment vs sub-shell (separate) environment

`./script.sh` and `sh script.sh` will result in separte environment.
Where as `source script.sh` will execute in same environment.

### Error handling with shell and subshell

Errors are returned upstream with status / exit codes.

## Subshells and environment variables

Yes, subshells inherit environment variables from their parent shell, but with some important nuances:

1. They inherit the exported variables only
2. Changes made to variables in a subshell do not affect the parent shell
3. Variables that were not exported using `export` are not inherited

For example:

```bash
# Parent shell
regular_var="not inherited"
export exported_var="inherited"

# This subshell will only see exported_var
(echo $regular_var; echo $exported_var)

# Changes in subshell don't affect parent
(exported_var="changed")
echo $exported_var  # Still shows original value
```

## Scoping of variables (MYVAR=VALUE vs export MYVAR=VALUE)

The key difference is that `export` makes the variable available to child processes (subshells), while simple assignment only makes it available in the current shell:

```bash
# Simple assignment - only available in current shell
MYVAR="hello"
(echo $MYVAR)  # Empty output - subshell can't see it

# Export - available to child processes
export MYVAR="hello"
(echo $MYVAR)  # Prints "hello" - subshell can see it

# Or combine assignment and export
export MYVAR=hello  # One-line version
```

Think of it as:
- `MYVAR=VALUE`: Local scope (current shell only)
- `export MYVAR=VALUE`: Global scope (current shell and all child processes)

## Command local environment variables with inline variables before command

Key-value pairs set in front of a shell command are environment variables that only exist for the duration of that specific command. They create a temporary environment modification without affecting the current shell. For example:

```bash
FOO=bar command
# FOO will be set to "bar" only for this command's execution

# Multiple variables can be set:
API_KEY=123 DEBUG=true python script.py
# Both API_KEY and DEBUG are only set for script.py's execution

# Compare with:
FOO=bar
command
# This sets FOO in the current shell environment
```

## Commands that you expect to have non zero status, but have `-e` set

Commands You Expect To Have Nonzero Exit Status, e.g. `grep` returns non-zero when no match found.
With `-e` set, What happens when you want to run a command that will fail, or which you know will have a nonzero exit code? You don't want it to stop your script, because that's actually correct behavior.

There are two choices here. The simplest, which you will usually want to use, is to append "|| true" after the command:
```sh
# "grep -c" reports the number of matching lines. If the number is 0,
# then grep's exit status is 1, but we don't care - we just want to
# know the number of matches, even if that number is zero.

# Under strict mode, the next line aborts with an error:
count=$(grep -c some-string some-file)

# But this one behaves more nicely:
count=$(grep -c some-string some-file || true)

echo "count: $count"
```
This short-circuiting with the boolean operator makes the expression inside $( ... ) always evaluate successfully.

You will probably find that trick almost always solves your problem. But what if you want to know the return value of a command, even if that return value is nonzero? Then you can temporarily disable the exit-immediately option:
```sh
# We had started out this script with set -e . And then...

set +e
count=$(grep -c some-string some-file)
retval=$?
set -e

# grep's return code is 0 when one or more lines match;
# 1 if no lines match; and 2 on an error. This pattern
# lets us distinguish between them.

echo "return value: $retval"
echo "count: $count"
```