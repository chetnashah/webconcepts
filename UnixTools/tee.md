
The tee utility copies standard input to standard output, making a copy in zero or more files.  The output is unbuffered.

## tee allows you to read from stdin and write to stdout and files simultaneously.

Think of `T` shape as a pipe with a branch.

```
# writes to stdout and file
ls -al | tee -a sample.txt
```

