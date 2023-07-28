
## tee allows you to read from stdin and write to stdout and files simultaneously.

Think of `T` shape as a pipe with a branch.

```
# writes to stdout and file
ls -al | tee -a sample.txt
```

