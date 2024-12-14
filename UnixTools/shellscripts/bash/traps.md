
## Useful for resources cleanup

Syntax: `trap [-lp] [arg] [sigspec …]`

**The commands in arg are to be read and executed when the shell receives signal sigspec.**

There is a simple, useful idiom to make your bash scripts more robust - ensuring they always perform necessary cleanup operations, even when something unexpected goes wrong. The secret sauce is a pseudo-signal provided by bash, called `EXIT`, that you can trap; commands or functions trapped on it will execute when the script exits for any reason. Let's see how this works.

The basic code structure is like this:
```bash
#!/bin/bash
function finish {
  # Your cleanup code here
}
trap finish EXIT
```
You place any code that you want to be certain to run in this "finish" function. A good common example: creating a temporary scratch directory, then deleting it after.
```bash
#!/bin/bash
scratch=$(mktemp -d -t tmp.XXXXXXXXXX)
function finish {
  rm -rf "$scratch"
}
trap finish EXIT
```