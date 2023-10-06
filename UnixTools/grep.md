
## general syntax


```
grep pattern [files]
```

##

**print all the lines that match patterns in given file(s)** - note we print full lines!

Note: it will print all lines that match, not just the first line that matches so the search is **global** in a sense.

## Gotcha behaviour with `set -e`

`set -e` errors out if any command has non-zero exist status.

`grep` has exit status `1` when no match was found.
**So grep can make your script fail if no match was found and "set -e" was done on script**

## Exact string search

Regex concerns: `.` is treated as `any` charachter, so `grep 127.0.0.1 filename` might match both `127.0.0.1` and `127a0a0a1`


**Fixed string matching** : `*` or `.` is one of regex meta charachters. To do a literal/exact search for raw text, use `grep -F pattern txt`, where **-F** stands for **Fixed string**

## Usage of regular expressions

the variant programs egrep, fgrep and rgrep are the same as “grep -E”,  “grep -F”,
       and  “grep -r”,  respectively.

In fact `fgrep` is just a shell script with following contents i.e calls grep with -F flag:
```sh
user@user-MS-7D32:~$ cat /usr/bin/fgrep 
#!/bin/sh
exec grep -F "$@"
```
Types of Regular expressions in Grep:
1. Basic regular expressions (BRE)
2. Extended regular expressions (ERE): `grep -E` flag, or `egrep` - allows groups, 
3. Perl compatible regular expressions(PCRE)


## Extended regulare expressions (ERE) with `grep -E` or `egrep`

e.g.
`grep -E '^(#|$)' file` - print empty lines or lines that start with `#`

example use case:
`Print all non-comment lines in a file`: `grep -Ev '^(#|$)' file`

e.g. a neat sshd config file can be printed using:
`grep -Ev '^(#|$)' /etc/ssh/sshd_config`

## When to use single quotes, double quotes or no quotes with grep?

Without single/double quotes, the first argument is treated as `pattern`, and remaining arguments are treated as files.
e.g.
`grep hello world hola`, will search for the pattern `hello` in two files `world` and `hola`.

Instead to group pattern into a single string to search, single quotes come in handy **recommended way to specify patterns is use single quotes**, 
e.g. `grep 'hello world' hola` will search for `hello world` in `hola` file.

`single` vs `double` quotes: The choice between single or double quotes is only important if the search string contains variables or other items that you expect to be evaluated.

**With single quotes, the string is taken literally and no expansion takes place. With double quotes, variables are expanded**.

Enclosing characters in single quotes (`'`) preserves the literal value of each character within the quotes. **A single quote may not occur between single quotes, even when preceded by a backslash.**

## How to report non-matching lines?

Use `-v`.
```
       -v, --invert-match
              Invert the sense of matching, to select non-matching
              lines.
```

## How to print lines above and below the match to get some context?

`-A` for above.
`-B` for below.
`-C` for both.

```
       -A NUM, --after-context=NUM
              Print NUM lines of trailing context after matching lines.
              Places a line containing a group separator (--) between
              contiguous groups of matches.  With the -o or
              --only-matching option, this has no effect and a warning
              is given.

       -B NUM, --before-context=NUM
              Print NUM lines of leading context before matching lines.
              Places a line containing a group separator (--) between
              contiguous groups of matches.  With the -o or
              --only-matching option, this has no effect and a warning
              is given.

       -C NUM, -NUM, --context=NUM
              Print NUM lines of output context.  Places a line
              containing a group separator (--) between contiguous
              groups of matches.  With the -o or --only-matching option,
              this has no effect and a warning is given.
```

## Show all files in a dir with given pattern

`-l` stands for list the file, not the content that matched.

```
grep -l 'pattern' *
```

## Grep recursively in a folder

```
grep -r 'pattern' folder
```

Note this will print matches along with the filename in which it matched

## Grep in folder/multiple files, but do not print filename with `-h`

`-h` -> not print filename\

```
       -H, --with-filename
              Print the file name for each match.  This is the default
              when there is more than one file to search.  This is a GNU
              extension.

       -h, --no-filename
              Suppress the prefixing of file names on output.  This is
              the default when there is only one file (or only standard
              input) to search.
```

## Grep IP address with regex

```sh
grep -E '[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}' ips.txt
```

## How to print only matched part?

```
       -o, --only-matching
              Print only the matched (non-empty) parts of a matching
              line, with each such part on a separate output line.
```

e.g. to print only matched ip addresses (not the line that matched):
```sh
grep -E '[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}' ips.txt
```

## filtering certain kind of files

```
# only search in text files in current directory
grep -r 'searchterm' --include=\*.txt ./
```
Another practical example:
search for `func` in all go files in current directory:
```
grep -rn 'func' --include=\*.go ./
```

