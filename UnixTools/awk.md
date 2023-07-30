
## Process lines 


## Extract columns


Extract first column from a file,
Note the processor program is in **single quotes**
```
cat go.sum | awk '{ print $1 }'
```

## Filter lines/rows based on field values

```
awk '{ if ($7 == 6) { print } }' pos_cut1-5.txt | head
```

## Built-in variables

### NF - number of fields

NF is an AWK built in variable and it stands for number of fields

