## Ssessions and process groups

A **process group** is a collection of related processes which can all be signalled at once.

A **session** is a collection of process groups, which are either attached to a single terminal device (known as the controlling terminal) or not attached to any terminal.

Sessions are used for job control: one of the process groups in the session is the foreground process group, and can be sent signals by terminal control characters. You can think of a session with a controlling terminal as corresponding to a "login" on that terminal. (Daemons normally disassociate themselves from any controlling terminal by creating a new session without one.)

e.g. if you run some_app from the shell, the shell creates a new process group for it, and makes that the foreground process group of the session. (some_app might create some child processes; by default they will be part of the same process group.) If you then press ^Z, some_app's process group is signalled to stop it; and the shell's process group is switched to be the foreground process group again. Then e.g.bg %1 would start some_app's process group again, but keep it running in the background.

https://pubs.opengroup.org/onlinepubs/9699919799/basedefs/V1_chap11.html#tag_11

https://unix.stackexchange.com/questions/82844/what-is-the-purpose-of-abstractions-session-session-leader-and-process-groups


https://unix.stackexchange.com/q/405755/170373

## Login vs non-login shell

https://unix.stackexchange.com/questions/38175/difference-between-login-shell-and-non-login-shell/

https://linuxhandbook.com/login-shell/


## who is logged in and doing what/where?

### tty

http://www.linusakesson.net/programming/tty/
 
prints current terminal info

```
jayshah@192 ~ % tty
/dev/ttys005
```

### w - who is logged in doing what

```
jayshah@192 ~ % w
13:09  up 8 days, 16:18, 3 users, load averages: 2.74 2.77 3.27
USER     TTY      FROM              LOGIN@  IDLE WHAT
jayshah  console  -                19Jun23 8days -
jayshah  s005     -                13:03       - w
jayshah  s006     -                13:07       1 -zsh M_S      ��    /bin/zsh
```

## io

1. Redirect stdout to one file and stderr to another file:

`command > out 2>error`

2. Redirect stderr to stdout (&1), and then redirect stdout to a file:

`command >out 2>&1`

3. Redirect both to a file:

`command &> out`

### groupadd

Creates a group in unix system

```sh
sudo groupadd docker
```

### usermod



### Virtual Box Ubuntu

Guest -> Host(Windows) connections are blocked by windows firewall.

### dig command

Query dns records for a domain

`dig google.com` - output also shows dns server resolving.
`dig google.com +short`
Query specific nameserver: `dig @ns1.mediatemple.net mt-example.com`

Get DNS info with nameserverS:
`dig google.com ANY +noall +answer`


### Inspecting binaries

on mac:
```sh
objdump -macho -section-headers /bin/ls
```
on unix:
```sh
nm binaryname
```

`.a` files is known as static library or static archive, typically we combine mulitple `.o` file into a `.a` file.

The linker `ld` copies and relocates all the code in executable object while making `.a` result in larger executable.

1. When linking a static library, everything is copied into the target executable/binary. (verify all address using `nm/objdump`)

2. When linking a dynamic library, you usually have open references
that would be resolved at dynamic lib loading or runtime.(Verify all address using `nm/objdump`)

`Dynamic Library`: also referred to as shared library, shared object, dynamically linked library, .dll, .so etc is archive of object files that can be loaded at arbitrary memory address
and lnked with a program in memory at loadtime or runtime.
It is done by `dyld` on macOS. `man dlopen` also.


## Work with archive files using `ar` command

ar command is used to create, modify and extract the files from the archives.

e.g. extract `.o` files from `.a` files.

