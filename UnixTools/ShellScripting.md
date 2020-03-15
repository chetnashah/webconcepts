
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