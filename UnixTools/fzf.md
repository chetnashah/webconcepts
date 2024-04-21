Fuzzy Finder finds all things fuzzily.

Prefer `-e` for exact matching e.g.

`ls -R | fzf -e` triggers an interactive list filter.

`Ctrl-J`/`Ctrl-K` to move up and down in list

**If you press the ENTER key after making your choice, the selection is simply spit back using the standard output (STDOUT).**

Good article - https://thevaluable.dev/practical-guide-fzf-example/

## Default behavior (without any input)

If you run fzf without giving it any input, it will run a default command (with the CLI find) to get all the files and subdirectories of the working directory by default. All hidden files will be skipped.

## You can pipe data to fzf

```
echo "hello\nbonjour\nbonsoir" | fzf
```

We give here a string to fzf’s input, creating three entries all separated with a newline \n: hello, bonjour, and bonsoir. The TUI of fzf will then be displayed, allowing us to type our query to fuzzy search the entry we want

## Use fzf as a search selector to pipe to different commands

```sh
vim $(find . -type f | fzf)
```

## Provide an upfront query

```sh
vim $(find . -type f | fzf --query "mouseless")
```

## Select/Search a directory (via fzf) and switch to it.

```sh
find . -type d | fzf | cd
```
