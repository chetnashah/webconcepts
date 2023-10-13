
## Running a shell script launches/forks off a new process, subshell

A subshell is a new process launched when running a shell script.
This makes sense, as the new shell script code needs its own process-id with which it can be managed. Essentially that new process is also a subshell

**Note** - A builtin does not spawn/fork a new process but executes in same process as the shell where it was invoked.

## Parellel processing with subshells

Because a subshell is run in a new process, these can be used for parallel processing.

## `()` or `$()` creates a subshell

`()` creates a subshell

`( command1; command2; command3; ... )`
A command list embedded between parentheses runs as a subshell.



**Note** - `{}` creates a code block within the current shell, and does not spawn a subshell

`$()` allows a subshell to be used for command substitution, for saving the output as a variable



## Ways to create subshell

There are several other constructs that create a subshell. I think this is the full list for bash:

1. Subshell for grouping: `( … )` does nothing but create a subshell and wait for it to terminate. Contrast with `{ … }` which groups commands purely for syntactic purposes and does not create a subshell.
2. Background: `… &` creates a subshell and does not wait for it to terminate.
3. Pipeline: `… | …` creates two subshells, one for the left-hand side and one for the right-hand side, and waits for both to terminate. The shell creates a pipe and connects the left-hand side's standard output to the write end of the pipe and the right-hand side's standard input to the read end. In some shells (ksh88, ksh93, zsh, bash with the lastpipe option set and effective), the right-hand side runs in the original shell, so the pipeline construct only creates one subshell.
4. Command substitution: `$(…)` (also spelled `…`) creates a subshell with its standard output set to a pipe, collects the output in the parent and expands to that output, minus its trailing newlines. (And the output may be further subject to splitting and globbing, but that's another story.)
5. Process substitution: `<(…)` creates a subshell with its standard output set to a pipe and expands to the name of the pipe. The parent (or some other process) may open the pipe to communicate with the subshell. `>(…)` does the same but with the pipe on standard input.
6. Coprocess: `coproc …` creates a subshell and does not wait for it to terminate. The subshell's standard input and output are each set to a pipe with the parent being connected to the other end of each pipe.

