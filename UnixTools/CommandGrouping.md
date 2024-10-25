Here's a detailed breakdown of command grouping methods and their differences:

1. Parentheses ( ) - Subshell Grouping
```bash
# Creates new subshell, changes don't affect parent shell
(cd /tmp; ls; pwd); pwd
# Result: Shows /tmp contents and /tmp path, then original path

# Variable scope is limited to subshell
(VAR=123; echo $VAR); echo $VAR
# Result: Prints 123, then empty line
```

2. Curly Braces { } - Current Shell Grouping
```bash
# Executes in current shell, changes persist
{ cd /tmp; ls; pwd; }; pwd
# Result: Shows /tmp contents and /tmp path twice

# Variables remain in current shell
{ VAR=123; echo $VAR; }; echo $VAR
# Result: Prints 123 twice
```

3. Semicolon (;) - Sequential Execution
```bash
# Simple sequential execution, regardless of success/failure
cd /tmp; ls; pwd
echo "one"; echo "two"; echo "three"

# Difference from && and ||:
false; echo "runs anyway"  # Will execute
false && echo "won't run"  # Won't execute
false || echo "will run"   # Will execute
```

4. Logical Operators && and ||
```bash
# && executes next command only if previous succeeds (AND)
mkdir dir && cd dir && touch file
# All commands must succeed

# || executes next command only if previous fails (OR)
cd existing_dir || mkdir new_dir
# Second command runs only if first fails
```

5. Command Substitution $( )
```bash
# Executes command and returns output for use
echo "Files: $(ls | wc -l)"
# Can be nested
echo "$(echo "$(date)")"

# Alternative older syntax using backticks (not recommended)
echo "Files: `ls | wc -l`"
```

Key Differences:
1. Scope:
   - `( )` or `$()` creates new subshell: variables and directory changes are temporary
   - `{ }` executes in current shell: changes persist
   - `;` simply separates commands in current shell

2. Syntax:
   - `( )` doesn't require spaces or final semicolon
   - `{ }` requires spaces and final semicolon
   - `&&` and `||` don't need spaces but are clearer with them

3. Error handling:
   - `;` executes all commands regardless of errors
   - `&&` only continues if previous command succeeds
   - `||` only continues if previous command fails

4. Performance:
   - `( )` is slower as it creates new subshell
   - `{ }` is faster as it uses current shell
   - `;` has minimal overhead

5. Use cases:
   - `( )` for isolated environment needs, if you need output use `$()`
   - `{ }` for grouped operations affecting current shell
   - `&&` for dependent commands
   - `||` for fallback commands
   - `$( )` for capturing command output

## Pipe behavior

1. Each pipe segment runs in its own subshell
2. Variables and directory changes in pipe commands don't affect parent shell
3. Each pipe command has its own PID
4. Command groups inside pipes still maintain their grouping behavior, but within a subshell


## Comprehensive summary 

Here's a comprehensive summary of shell command combining methods:

1. Semicolon (;) - Simple Sequential Execution
```bash
# Just runs commands in sequence
# No dependency between commands
# Runs in current shell
# Continues even if commands fail
cmd1; cmd2; cmd3
```

2. Logical AND (&&) - Conditional Execution
```bash
# Runs next command only if previous succeeds
# Stops at first failure
# Runs in current shell
mkdir dir && cd dir && touch file
```

3. Logical OR (||) - Fallback Execution
```bash
# Runs next command only if previous fails
# Good for fallbacks/alternatives
# Runs in current shell
cd existing_dir || mkdir new_dir || echo "failed"
```

4. Curly Braces { } - Current Shell Grouping
```bash
# Groups commands in current shell
# Changes persist (vars, directory)
# Requires spaces and trailing semicolon
{ cd /tmp; ls; pwd; }
```

5. Parentheses ( ) - Subshell Grouping
```bash
# Creates new subshell
# Changes don't persist
# Isolates environment
(cd /tmp; ls) # pwd unchanged after
```

6. Command Substitution $( ) - Output Capture
```bash
# Creates subshell
# Captures output for use
# Changes don't persist
dir=$(cd /tmp && pwd)
```

7. Pipes (|) - Stream Connection
```bash
# Each command runs in subshell (except maybe last with lastpipe)
# Connects stdout to stdin
# Changes don't persist between pipe segments
echo "test" | grep "test" | sed 's/test/done/'
```

Key Differences:

1. Shell Scope:
- Current shell: ;, &&, ||, { }
- Subshell: ( ), $( ), pipe segments

2. State Changes:
- Persist: ;, &&, ||, { }
- Temporary: ( ), $( ), pipe segments

3. Error Handling:
- Continues always: ;
- Stops on failure: &&
- Continues on failure: ||
- Depends on commands: { }, ( ), |

4. Common Use Cases:
```bash
# Sequential steps
setup; run; cleanup

# Dependent operations
compile && test && deploy

# Fallbacks
primary_cmd || backup_cmd || error_cmd

# Grouped operations
{ config; start; }

# Isolated operations
(backup_tasks)

# Command output
files=$(find . -type f)

# Data processing
cat file | sort | uniq
```

5. Combined Usage:
```bash
# Complex examples combining multiple methods
{ (backup_db) && process_data; } | tee log.txt

find . -type f | while read file; do
    { md5sum "$file" || echo "failed: $file"; } >> checksums.txt
done

status=$(command && echo "OK" || echo "FAIL")
```

Remember:
- Use ; for simple sequences
- Use && for dependent commands
- Use || for fallbacks
- Use { } when changes should persist
- Use ( ) for isolation
- Use $( ) to capture output
- Use | for data flow between commands