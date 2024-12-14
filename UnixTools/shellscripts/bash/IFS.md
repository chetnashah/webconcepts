
## IFS

The IFS variable - which stands for Internal Field Separator - controls what Bash calls word splitting. 

When set to a string, each character in the string is considered by Bash to separate words. This governs how bash will iterate through a sequence. 

The default IFS is space i.e. `" "`.

**Note**: setting IFS needs `$` and single quotes e.g. `IFS=$'\n'`

```sh
#!/bin/bash
names=(
  "Aaron Maxwell"
  "Wayne Gretzky"
  "David Beckham"
  "Anderson da Silva"
)

# by default IFS is space i.e. " ", so we see 8 words here
echo "With default IFS value..."
for name in ${names[@]}; do
  echo "$name"
done

echo ""
echo "With strict-mode IFS value..."
IFS=$'\n\t'
# now IFS is new line, so we see 4 names 
for name in ${names[@]}; do
  echo "$name"
done
```

Output:
```sh
With default IFS value...
Aaron
Maxwell
Wayne
Gretzky
David
Beckham
Anderson
da
Silva

With strict-mode IFS value...
Aaron Maxwell
Wayne Gretzky
David Beckham
Anderson da Silva
```