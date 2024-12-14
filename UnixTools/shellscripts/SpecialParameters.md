
## Special parameters in bash

## `$*` vs `$@`

In shell scripting (especially in Bash), `$@` and `$*` are both used to refer to all the positional parameters (arguments) passed to a script or function. However, they behave differently when quoted.

### Differences

1. **Behavior Without Quotes:**
   - `$@`: Expands to all positional parameters as separate words.
   - `$*`: Expands to all positional parameters as a single word.

   Example:
   ```bash
   set -- "arg1" "arg2" "arg3 with spaces"
   echo "$@"  # Outputs: arg1 arg2 arg3 with spaces
   echo "$*"  # Outputs: arg1 arg2 arg3 with spaces
   ```

2. **Behavior With Quotes:**
   - `"${@}"`: Each positional parameter is treated as a separate quoted string, i.e. That is, `"$@"` is equivalent to `"$1" "$2" ….`
   - `"${*}"`: All positional parameters are combined into a single quoted string i.e. That is, `"$*"` is equivalent to `"$1c$2c…"`, where `c` is the first character of the value of the IFS variable

   Example:
   ```bash
   set -- "arg1" "arg2" "arg3 with spaces"
   for arg in "$@"; do
       echo "$arg"
   done
   # Outputs:
   # arg1
   # arg2
   # arg3 with spaces

   for arg in "$*"; do
       echo "$arg"
   done
   # Outputs:
   # arg1 arg2 arg3 with spaces
   ```

### Summary

- Use `$@` when you want to handle each argument separately, especially when they may contain spaces.
- Use `$*` when you want to treat all arguments as a single entity, but be cautious as this can lead to unexpected behavior if arguments contain spaces.

**Note** - In general, it's recommended to use `"$@"` in scripts to preserve the integrity of arguments, especially those containing spaces.

