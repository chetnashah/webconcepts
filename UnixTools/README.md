
## print $PATH in a readable way

```sh
echo "$PATH" | tr ':' '\n'
```

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

## Check if current shell is login or non-login shell

There are several ways to determine if a shell is a login shell or non-login shell:

1. Check `$0` first character:
```bash
echo "$0"
# If starts with '-', it's a login shell
# Example: '-bash' = login shell
# Example: 'bash' = non-login shell
```

2. Check `$SHLVL` and `$_`:
```bash
echo "$SHLVL $_"
# Login shell typically has SHLVL=1
# $_ in login shell is often '-bash'
```

3. Check process:
```bash
ps -o args -p $$
# Login shell shows '-bash'
# Non-login shows 'bash'
```

4. Check `shopt` settings:
```bash
shopt login_shell
# Shows 'login_shell    on' for login shell
# Shows 'login_shell    off' for non-login shell
```

Common login shell scenarios:
- First shell after SSH login
- Console login
- `su -` or `su -l` (but not plain `su`)
- `bash -l` or `bash --login`

Non-login shell scenarios:
- Running `bash` from terminal
- New terminal window in GUI
- Shell scripts
- Plain `su` command

Login shells:
- Read `/etc/profile`
- Read first found of: `~/.bash_profile`, `~/.bash_login`, `~/.profile`

Non-login shells:
- Only read `~/.bashrc`

## Common shell types use cases and combinations

Here's a comprehensive breakdown of shell types in different scenarios:

Login Shells:
1. Direct System Login
   - TTY console login
   - SSH remote login
   - `su -` or `su -l username`
   - `bash --login` or `bash -l`

2. Display Manager Login
   - First shell in X session (depends on DM configuration)

Non-Login Shells:
1. Terminal Emulators
   - Opening terminal in GUI (gnome-terminal, konsole, xterm)
   - Additional terminal tabs/windows
   - Most terminal emulators start non-login shells by default

2. Script Execution
```bash
./script.sh          # Non-login shell
bash script.sh       # Non-login shell
source script.sh     # Not a new shell, runs in current shell
. script.sh          # Same as source
```

3. Subshells
```bash
bash                 # Non-login interactive shell
(command)            # Non-login, non-interactive subshell
$(command)           # Non-login, non-interactive subshell
`command`            # Non-login, non-interactive subshell
command | command    # Each pipe creates non-login subshell
```

4. Other Common Cases
```bash
su username          # Non-login shell (without -)
screen              # Non-login shell
tmux                # Non-login shell
cron jobs           # Non-login, non-interactive shell
```

Shell Types Matrix:
```
Type          Login   Interactive
─────────────────────────────────
SSH           Yes     Yes
TTY login     Yes     Yes
su -          Yes     Yes
Terminal      No      Yes
Script        No      No
Subshell      No      No
Pipe          No      No
Cron          No      No
```

Startup Files Read:
```
Login Shell:
1. /etc/profile
2. First found of:
   - ~/.bash_profile
   - ~/.bash_login
   - ~/.profile

Non-Login Shell:
1. ~/.bashrc
2. /etc/bashrc or /etc/bash.bashrc (distribution dependent)
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

