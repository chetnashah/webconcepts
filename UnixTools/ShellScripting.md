
https://www.youtube.com/watch?v=GXu1bZptwf4


## Sourcing vs executing a script

Execute `(./script.sh)` or `sh script.sh` or `bash script.sh` when you want isolation
Source `(. script.sh)` or `source script.sh` when you want changes to affect current shell

e.g. making a `script.sh` with:
```bash
MYVAR="hello"
```
and try `./script.sh` and `echo $MYVAR` - it won't print anything.
and try `source script.sh` and `echo $MYVAR` - it will print `hello`.


### Configuration files - source them
source ~/.bashrc
. /etc/profile

### Independent scripts - execute them
./backup.sh
bash process.sh

### Environment setup - source them
source ./set_env.sh
source ./activate

### check if shell is interactive 

This is useful because aliases are disabled in shellscripts (non interactive).
In nodejs and other languages, you can check if stdin is interactive via `process.stdin.isTTY`.

Use `$-` should contain `i` for interactive.
```bash
if [[ $- == *i* ]]
then
    do_interactive_stuff
fi
```

### Print user running the script

```sh
echo "Running script as $USER"
```

### Command substitution

```sh
$(command)
# or
`command`
```
Bash performs the expansion by executing command in a subshell environment and replacing the command substitution with the standard output of the command, with any trailing newlines deleted.

### Arithmetic

```sh
a=0
a=$((a + 1))

if [a -eq 0]
then
    echo $a
fi
```

Print odd numbers till 100:
```sh
a=1
while [ $a -lt 100 ] # $ in use of vars
do
    # echo $a
    if [ $(( a % 2 )) -eq 1 ]
    then
        echo $a
    fi
    a=$((a + 1)) # No $ when assigning to var
done
```

### Taking user input with `read`

```sh
read name
echo "Welcome $name"
```

### Echo without expanding variables/substitution

Use single quotes i.e. `'` to echo without substituting any variables, i.e. treated as a raw stirng!

e.g. 

```
echo 'export PATH=$PATH:/my/path' >> somefile.txt
```

will have somefile with exact contents i.e.
```
// somefile.txt
export PATH=$PATH:/my/path
```

`Note`: If you use double quotes i.e. `"` with `echo`, it will expand/susbtitute variables.


## Print all files that contain a certain text pattern

## Regex differences

https://unix.stackexchange.com/questions/119905/why-does-my-regular-expression-work-in-x-but-not-in-y

## Bash globbing

https://dwheeler.com/essays/filenames-in-shell.html

https://dwheeler.com/essays/filenames-in-shell.html#globbing
Bash does carry out filename expansion -- a process known as globbing -- but this does not use the standard RE set.
e.g. `ls -al *.txt`.

Strings containing `*` will not match filenames that start with a `dot`. 

e.g. `ls *rc` does not work, but `ls .*rc` will print all the rc files.

**Globbing is a simple language specifically designed for filename handling, primarily to create lists of unhidden files in a particular directory. In this language, “*” matches all non-hidden files in the current directory, “*.pdf” matches all non-hidden files in the current directory ending in “.pdf” - and so on.**

`Globbing and expansion`: glob expansion is built into the shell and done after field (IFS) expansion.


## Field expansion

Bash separates fields using an env variable named `IFS`, known as Internal field separator.

## Shell expansions

https://tldp.org/LDP/Bash-Beginners-Guide/html/sect_03_04.html

https://www.gnu.org/software/bash/manual/html_node/Shell-Parameter-Expansion.html

https://effective-shell.com/part-6-advanced-techniques/understanding-shell-expansion/

https://www.youtube.com/watch?v=yTijxqjZhRo

**Always wrap your variables in quotes**

## Command invocation

`$ KEY=VALUE command`

wills set `KEY=VALUE` only within the context of the command.

Otherwise, if `$KEY=VALUE` then the environment variable named `KEY` wiht value `VALUE` is set at shell level.
