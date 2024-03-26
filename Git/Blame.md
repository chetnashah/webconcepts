
## git blame

`git blame` is a command that shows you the author of each line in a file. It is useful to find out who wrote a specific line of code, or to find out when a line was last modified.

Tell me who wrote this line of code:

```sh
# tell who wrote the code for line (-L) 15 to 25 for src/types.ts
# C C C is to follow whitespace/rename
git blame -w -C -C -C -L 15,25 src/types.ts
```