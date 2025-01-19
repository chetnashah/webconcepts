## Use repl via `nix repl`

Use `nix repl` to evaluate Nix expressions interactively

## Run `.nix` files with `nix-instantiate --eval filename.nix`

```bash
user@user-MS-7D32:~$ echo 1+2 >> sample.nix
user@user-MS-7D32:~$ nix-instantiate --eval sample.nix
3
```

Use `--strict` for eager evaluation instead of lazy eval:
```bash
echo "{ a.b.c = 1; }" > file.nix
nix-instantiate --eval --strict file.nix # strict eval i.e non-lazy
{ a = { b = { c = 1; }; }; }
```

## Value types

Values in the Nix language can be 
1. primitive data types, 
2. lists, 
3. attribute sets, and 
4. functions.

## Name bindings/assignments with let expressions

Attribute sets and let expressions are used to assign names to values. Assignments are denoted by a single equal sign (=).

Whenever you encounter an equal sign (=) in Nix language code:

1. On its left is the assigned name.
2. On its right is the value, delimited by a semicolon (;).

### Attribut set is like a dictionary/object of key value pairs


Attribute names usually do not need quotes
```nix
{
  string = "hello";
  integer = 1;
  float = 3.141;
  bool = true;
  null = null;
  list = [ 1 "two" false ];
  attribute-set = { # object
    a = "hello";
    b = 2;
    c = 2.718;
    d = false;
  }; # comments are supported
}
```

### Recursive-ness in objects allowed due to laziness

`rec` keyword is necessary where recursive attribute access is needed!

```nix
rec { # note "rec" keyword is necessary!
  one = 1;
  two = one + 1; # depends on another internal attribute
  three = two + 1; # depends on another internal attribute
}
```

## let bindings for name<->value binding in a scope

**Note: Please use spaces around "="**

Assignment Operator (=) Spacing: While some languages are lenient with spacing, Nix expects clear separation around operators to parse the expression correctly.

```
let
  b = a + 1; # note: for each binding semicolon ending is necessary!
  a = 1;
in
a + b # no semicolon for expression
```

## Functions defined via "args: body" e.g. `x: x+1` and called via spaces 

### function definition via `:`

Wherever you find a colon (:) in Nix language code:
On its left is the function argument
On its right is the function body.

Function arguments are the third way, apart from attribute sets and let expressions, to assign names to values. Notably, values are not known in advance: the names are placeholders that are filled when calling a function.
**Note: `args: body` spacing is important!** 

### function calling via spaces

```nix
nix-repl> let
            f = x: x + 1; # note: need to have a semicolon and space ": " between arguments and body
          in f 1          # note: function application between name and arg with spaces
2

nix-repl> let
            f = x: x.a;
          in
          f { a = 1; }
1
```

**Note**: since list elements are also separated by whitespace, sometimes using parentheses is useful
```
let
 f = x: x + 1;
 a = 1;
in [ (f a) ] # calling (f a) and put it in list
```

## Attribute set destructuring

```
let
  f = {a, b}: a + b;
in
f { a = 1; b = 2; }
3
```

## Rest parameters naming with `@`

```
let
  f = {a, b, ...}@args: a + b + args.c;
in
f { a = 1; b = 2; c = 3; }
6
```