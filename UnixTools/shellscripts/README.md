
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