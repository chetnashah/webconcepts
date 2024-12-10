
## `netstat` print network status related data structures

### `-a` - show all sockets, including server ones

### `-i` for print interfaces


### `-r` for routing tables/info

### `-n` to not go thorugh DNS, just print raw numbers

### `-p` for protocol filtering

```
netstat -an -p TCP
```

### `-c` not available on mac

### `-e` not available on mac

### `-b` not available on mac

Prints program info, but not available on mac. Refer `lsof` instead [here](../lsof.md)

### `-o` is not available on mac

### `-f` not available on mac

`-f` stands for foriegn address

