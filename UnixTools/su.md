## `su` stands for switch user

su allows commands to be run with a substitute user and group ID.

When called with no user specified, su defaults to running an interactive shell
as root. When user is specified, additional arguments can be supplied, in which
case they are passed to the shell.


## What is `su - xyz`?

`-` specifies to start login shell, `su - xyz`, switch to user xyz with login shell
Difference between login and non-login shell can be found in `info bash`

### More docs
```
-, -l, --login
           Start the shell as a login shell with an environment similar to a real login:

           •   clears all the environment variables except TERM and variables specified
               by --whitelist-environment

           •   initializes the environment variables HOME, SHELL, USER, LOGNAME, and
               PATH

           •   changes to the target user’s home directory

           •   sets argv[0] of the shell to '-' in order to make the shell a login shell
```