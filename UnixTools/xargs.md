https://linuxhandbook.com/xargs-command/

You’ll often find xargs command being used with the find command. The find command gives you a list of filenames and the **xargs command lets you use those filenames, one by one, as if it was input to the other command.**

e..g

## Get list of files and get their space size

```
ls | xargs du -h
```

Usage:
```
my-app % ls | xargs du -h
4.0K	alldeps.txt
4.0K	go.mod
4.0K	go.sum
4.0K	main.go
4.0K	seed.txt
```