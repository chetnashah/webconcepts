Expansion is performed on the command line after it has been split into tokens. There are seven kinds of expansion performed:

## Order of expansions
1. brace expansion
2. tilde expansion
3. parameter and variable expansion
4. arithmetic expansion
5. command substitution
6. word splitting
7. filename expansion

**Note** - Only brace expansion, word splitting, and filename expansion can increase the number of words of the expansion; other expansions expand a single word to a single word. The only exceptions to this are the expansions of `"$@"` and `$*` (see Special Parameters), and `"${name[@]}"` and `${name[*]}`(see Arrays).

