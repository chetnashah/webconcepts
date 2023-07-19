

## Terminals

https://lucasfcosta.com/2019/04/07/streams-introduction.html

Use `tty` command to see the terminal you are in.

## How to redirect from one terminal to other?
To redirect to a different terminal, determine the file descriptor of the terminal with the command tty:
```sh
~$ tty
/dev/pts/0
```
Then redirect error messages to that terminal as in
```sh
~$ echo Hello World! >/dev/pts/0
```

## Process group

https://biriukov.dev/docs/fd-pipe-session-terminal/3-process-groups-jobs-and-sessions/


a process group is a set of processes. a process group and its members can be members of a single session.
A process group has its process group identificator `PGID` and a leader who created this group

A process group lives as long as it has at least one member. It means that even if the group leader terminates, the process group is valid and continues carrying out its duties. A process can leave its process group by:

joining another group;
creating its own new group;
terminating.

## Session

A session is a **collection of related process groups (jobs)**. All of the processes in a session have the same session identifier . 

**Sessions usually have a controlling terminal**

### Session leader (process)
A session leader is the process that created the session, and its process ID becomes the session ID. 

