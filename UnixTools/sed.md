
https://tldp.org/LDP/abs/html/x23170.html

https://tldp.org/LDP/abs/html/wrapper.html#EX3

## Invocation

```
sed SCRIPT INPUTFILE...
```

the script (or command) is also referred to as pattern regex, e.g.`s/a/b/g`

If you do not specify INPUTFILE, or if INPUTFILE is -, sed filters the contents of the standard input.

## Where does sed output?

**sed writes output to standard output.**.

Use `-i` to edit files in-place instead of printing to standard output.

## common flags

Explicity specify script/command/regex, helps in specifying multiple patterns
```
-e script, --expression=script
add the script to the commands to be executed
```
Specify file for script
```
-f script-file, --file=script-file
add the contents of script-file to the commands to be executed
```

## Sed works on line level

The sed utility works by sequentially reading a file, line by line, into memory. It then performs all actions specified for the line and places the line back in memory to dump to the terminal with the requested changes made.

So if you specify: `sed ‘s/Hello/Hi/’ file.txt`, it will only substitute only first occurence of `Hello` in a given line.

## Basic usage

Regular expressions in sed are specified between two slashes.

The following command prints lines containing the word ‘hello’:

```
sed -n '/hello/p'
```
The above example is equivalent to this grep command:

```
grep 'hello'
```

## Common examples

Common operators include `p`- print, `d` - delete and `s` - substitute.

| Notation | 	Effect |
|:---:|:---:|
| `8d`	 | Delete 8th line of input. |
| `/^$/d` |	Delete all blank lines. |
| `1,/^$/d` |	Delete from beginning of input up to, and including first blank line. |
| `/Jones/p` |	Print only lines containing "Jones" (with -n option). |
| `s/Windows/Linux/` | Substitute "Linux" for first instance of "Windows" found in each input line. |
| `s/BSOD/stability/g` |	Substitute "stability" for every instance of "BSOD" found in each input line. |
| `s/ *$//` |	Delete all spaces at the end of every line. |
| `s/00*/0/g` |	Compress all consecutive sequences of zeroes into a single zero. |
| `5i 'Linux is great.' file.txt` |	Inserts 'Linux is great.' at line 5 of the file file.txt. |
| `/GUI/d` |	Delete all lines containing "GUI". |
| `s/GUI//g` |	Delete all instances of "GUI", leaving the remainder of each line intact. |

## Regex concerns

**The power of regular expressions comes from the ability to include alternatives and repetitions in the pattern. These are encoded in the pattern by the use of special characters, which do not stand for themselves but instead are interpreted in some special way.**

In GNU sed, the only difference between basic and extended regular expressions is in the behavior of a few special characters: `?`, `+`, parentheses, braces (`{}`), and `|`.

With basic (BRE) syntax, these characters do not have special meaning unless prefixed with a backslash (`\`); 

While with extended (ERE) syntax it is reversed: these characters are special unless they are prefixed with backslash (`\`). 

### How to use extended regex?

```sh
# all are same
-E
-r
--regexp-extended
```

## How to execute silently?
`-n` option disables automatic printing, the `p` command is used instead to print
suppress automatic printing of pattern.
```sh
-n
--quiet
--silent
```

## Sed addresses

https://www.gnu.org/software/sed/manual/html_node/Addresses-overview.html#Addresses-overview

Addresses determine on which line(s) the sed command will be executed. The following command replaces the word ‘hello’ with ‘world’ only on line 144:
```
sed '144s/hello/world/' input.txt > output.txt
```
If no addresses are given, the command is performed on all lines. The following command replaces the word ‘hello’ with ‘world’ on all lines in the input file:
```
sed 's/hello/world/' input.txt > output.txt
```

## How sed works?

sed maintains two data buffers: the `active pattern space`, and the `auxiliary hold space`. Both are initially empty.

sed operates by performing the following cycle on each line of input: first, sed reads one line from the input stream, removes any trailing newline, and places it in the pattern space. 

Then commands are executed; each command can have an address associated to it: addresses are a kind of condition code, and a command is only executed if the condition is verified before the command is to be executed.

When the end of the script is reached, unless the -n option is in use, the contents of pattern space are printed out to the output stream, adding back the trailing newline if it was removed.8 Then the next cycle starts for the next input line.

Unless special commands (like ‘D’) are used, the pattern space is deleted between two cycles. The hold space, on the other hand, keeps its data between cycles (see commands ‘h’, ‘H’, ‘x’, ‘g’, ‘G’ to move data between both buffers). 


## Utilities
