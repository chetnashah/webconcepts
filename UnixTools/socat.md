
http://www.dest-unreach.org/socat/doc/socat.html#ADDRESS_TCP_LISTEN

http://www.dest-unreach.org/socat/doc/socat.html#EXAMPLES

More powerful than `netcat`.

socat so versatile is the fact that an address can represent a network socket, any file descriptor, a Unix domain datagram or stream socket, TCP and UDP (over both IPv4 and IPv6), SOCKS 4/4a over IPv4/IPv6, SCTP, PTY, datagram and stream sockets, named and unnamed pipes, raw IP sockets, OpenSSL, or on Linux even any arbitrary network device

### Syntax

```
socat [options] <address> <address>
```

`-` is used as a placeholder address for `STDIO`

* invoking socat STDIN STDOUT opens both the addresses for reading and writing.

Invoking socat with `-u` ensures that the first address can only be used for reading and the second address can only be used for writing.

`-d` prints error messages, `-d -d` prints info + error, similarly more 
### Socat Address

An address comprises of three components:

1. the address type, followed by a :
2. zero or more required address parameters separated by :
3. zero or more address options separated by , in `option_name=value` format.
e.g.
`TYPE:ADDR1:ADDR2:ADDR3,OPT1`

`TYPE` values: TCP, TCP4, TCP-LISTEN, CREATE, EXEC, GOPEN(`Generic file Open`), STDIN, STDOUT, PIPE, PTY, UDP4. Every address type has a set of option groups.

`optional TYPE`:
Address specifications starting with a number are assumed to be of type FD(raw file descriptor) addresses. Similarly, if a /is found before the first :or , , then the address type is assumed to be GOPEN (generic file open).


`ADDR` parameter values: depend upon the `TYPE` mentioned above. e.g. `www.example.com:80` has two addresses, host address and port address.

`OPT` values: Each option belongs to an option group.
Example: `reuseport` option belongs to `SOCKET` option group.
Some examples of option Groups: `SOCKET`, `OPEN`.

### Option and Option Group
Mentioned are option group with respective options.
1. TCP option group
    - `nodelay` : turn off nagle
    - `keepinit` : sets time to wait for answer of server during `connect()` before giving up.
    - `keepcnt=<count>` : sets number of keepalives before shutting down socket to `count`.
    - `keepidle=<seconds>`: sets idle time before sending first keepalive to `seconds`
    - `keepintvl=<seconds>`: sets interval between two keepalives to `seconds`.

2. UDP, TCP and SCTP option group
    - `sourceport=<port>` : for outgoing TCP or UDP connections, it sets the source port using an extra bind() call.
    For incoming connections, socat will shutdown connection if client does not use this port.

3. EXEC Option Group
    - `path=<string>`: Overrides the `PATH` environment variable for searching the program with `<string>`. This `$PATH` value is effective in the child process too.

4. FORK option group
    - `nofork`
    - `pipes`
    - `pty`
    - `ctty`
    - `stderr`
    - `fdin=<fdnum>`: assigns the sub process input channel to its file descriptor `<fdnum>` instead of stdin.
    - `fdout=<fdnum>`
    - `sighup, sigint, sigquit`: has socat pass signals of this type to subprocess, if no address has this option, socat terminates on these signals.

5. CHILD option group
    - `fork`: After establishing connection, handles its channel in a child process and keeps parent process attempting to produce more connections.

6. HTTP Option group
    - `proxyport=<TCP Service>`:
    - 

7. IP4 and IP6 option group
    - `ttl=<ttl>`

8. SOCKET option group: mostly with `setsockopt()`
    - `bind=<sockname>`: binds the socket to given socket address using `bind()` system call.
    - `connect-timeout=<seconds>`: abort connection attempt after `<seconds>` timeval.
    - `debug`: enables socket debugging
    - `keepalive`: enables sending keepalives on socket.
    - `reuseaddr`: allows other sockets to bind to an address even if parts of it (e.g. local port) are already in use by socat.
    - `pf=<string>`: force usage of "ip4" etc.
    - `reuseport`: set the `SO_REUSEPORT` option.

9. APPLICATION Option Group

    - `cr`: carriage return conversion
    - `readbytes=<bytes>`: only read so many bytes from this address.
    - `lockfile=<filename>`: if lockfile exists, exits with error, if not creates it and continues, unlinks lockfile on exit.

10. PROCESS option group
    - `chroot=<dir>`
    - `setgid=<group>`
    - `setuid=<user>`
    - `su=<user>`
    - `setpgid=<pid_t>`
    - `setsid`: makes process leader of new session.

11. FD Option group

    - `setlk`
    - 

12. LISTEN Option group
    - `backlog=<count>`: set backlog value passed to `listen()` system call to `<count>`. Default is 5
    - `max-children=<count>`: LImits number of concurrent child process. Default is no limit.


### connect to host
```
// connect to 10.1.1.1 on port 80 and relay to and from stdio
$ socat - TCP:10.1.1.1:80	# similar to "netcat 10.1.1.1 80"
```

### Redirect connections to a different host

```sh
socat TCP-LISTEN:80,fork TCP:202.54.1.5:80
```

### fork when getting an incoming connection
followingaddress allows one to set up a TCP listening socket and fork a child process to handle all incoming client connections
```
socat TCP-LISTEN:5555,fork
```