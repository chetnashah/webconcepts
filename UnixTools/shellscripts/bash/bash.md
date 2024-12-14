
## Sensible defaults
```bash
#!/bin/bash
set -euo pipefail # setup error reporting, undefined reporting and pipeline error reporting
IFS=$'\n\t' # split by lines instead of words.
```

## Read data (with prompt)

```sh
#!/bin/bash

# reading without prompt
echo "will ask for something"
read SOMETHING
echo "something is $SOMETHING"

# reading with prompt
read -p "Enter your name: " NAME
echo "Your name is $NAME"
```

## Argument access

"$@": This represents all the arguments as separate quoted strings, preserving spaces, excluding program name.

```sh
for arg in "$@"; do
    echo "$arg"
done
```

## Condition checks

### `-e` for any file type existence
Use -e when you want to check for the existence of any type of file.

### `-f` for regular file existence
Use -f when you want to ensure that the file is a regular file and not a directory or other type.

