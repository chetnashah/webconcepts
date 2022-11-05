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

