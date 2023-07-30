
`tr` stands for **translate chars**. It is used to replace or remove certain chars.

You can think of it as minimalistic sed for replacing/removing chars.

## convert uppercase to lowercase

```
curl -sL "https://www.gutenberg.org/files/11/11-0.txt" | tr '[:upper:]' '[:lower:]'
```