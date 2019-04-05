used to watch files.

inotifywait is the main tool

inotify stands for `inode notify`.

Default behaviour is to exit on first change observed.

example 1:
change in file access time of an inode
```
inotifywait test.txt
# cat test.txt (in a different console)
OPEN test.txt (inotify returns with change)
```

exampl 2: how different editors behave when editing files

https://github.com/guard/guard/wiki/Analysis-of-inotify-events-for-different-editors