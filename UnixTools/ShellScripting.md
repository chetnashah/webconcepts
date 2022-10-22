
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

