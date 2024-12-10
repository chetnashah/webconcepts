
## Prints list of open files

lists all open files belonging to all active processes.

### `-p` lists all files held open by a given pid

### `-i` for all internet connections

### `-n` to skip dns conversion

inhibits the conversion of network numbers to host names for network files.  Inhibiting conversion may make lsof run faster.

### `-P` to skip port conversion

inhibits the conversion of port numbers to port names for network files.  Inhibiting the conversion may make lsof run a little faster.  It is
            also useful when port name lookup is not working properly.

### `-U` — This option selects all Unix Domain Socket files.

### Which programs have which connections?

```
lsof -i -n -P
```