
If login is not connected by keys,
ssh login will resort to username and password on the host.
 
OpenSSH consists of following tools:

1. commands: Remote operations are done using `ssh`, `scp`, and `sftp`.

2. Key Management: Key management with `ssh-add`, `ssh-keysign`, `ssh-keyscan`, and `ssh-keygen`.

3. Server side/daemon: The service side consists of `sshd`, `sftp-server`, and `ssh-agent`.

How client reads config:

`ssh(1)` obtains configuration data from the following sources in the following order:
1. command-line options
2. user's configuration file (`~/.ssh/config`)
3. system-wide configuration file (`/etc/ssh/ssh_config`)
For each parameter, the first obtained value will be used

Server side daemon config:
`etc/ssh/sshd_config`

`/usr/username/.ssh/authorized_keys` file, is a file that OpenSShServer/daemon looks for when ssh request comes.

`known_hosts` file on client machine

`ssh-agent`: An authentication agent that can store private keys.

`ssh-add`: Adds key to `ssh-agent`.

`ssh-keygen`: Key generation tool.

`ssh-keyscan`: Utility for gathering public host keys from a number of hosts

### SSH login with keys in cli

Providing ssh Identity-key as a cli arg
Which is followed by passphrase to unlock it.
```sh
ssh -i ~/.ssh/id_rsa user@our_host_ip
```
Alternate option to above is using ssh-agent.

### Host keys

host keys are usually stored in the `/etc/ssh` directory, in files starting with `ssh_host_<rsa/dsa/ecdsa/ed25519>_key`

### Identity Key

An identity key is a private key.
identity keys are used for authenticating users, whereas host keys are used for authenticating computers.

The default location for identity keys on Unix/Linux systems is the  `.ssh` directory in each user's home directory. Identity key names typically start with `id_`, but this does not need to be the case.

location of identity keys is configured using the `IdentityFile`

### ssh-agent

**The ssh-agent is a helper program that keeps track of user's identity/private keys and their passphrases.** The agent can then use the keys to log into other servers without having the user type in a password or passphrase again.

The agent initially does not have any private keys. Keys are added using `ssh(1)` (see `AddKeysToAgent` in `ssh_config(5)` for details) or `ssh-add(1)`. Multiple identities may be stored in `ssh-agent` concurrently and `ssh(1)` will automatically use them if present. `ssh-add(1)` is also used to remove keys from ssh-agent and to query the keys that are held in one.

`Agent Forwarding`: Your private key never leaves your local computer. That's right. By design, the agent never ever discloses your private key, it never ever hands it over to a remote ssh or similar. Instead, ssh is designed such as when an agent is detected, the information that needs to be encrypted or verified through the agent is forwarded to the agent. That's why it is called agent forwarding, and that's why it is considered a safer option.

agent and forwarding: ssh-agent is a program that can hold a user's private key, so that the private key passphrase only needs to be supplied once. A connection to the agent can also be forwarded when logging into a server, allowing SSH commands on the server to use the agent running on the user's desktop.

### ssh-add

`ssh-add` will ask your passphrase, and store your `private key` into the `ssh-agent` you started earlier. `ssh`, and all its friends (including `git`, `rsync`, `scp`...) will just magically use your agent friend when you try to ssh somewhere.

### Agent forwarding

Prerequisites:
1. Your local `ssh-agent` must be running
2. Your keys must be added to `ssh-agent`

`Client side`:
You should only add servers you trust and that you intend to use with agent forwarding.

```sh
# .ssh/config
Host example.com
  ForwardAgent yes
```

`Daemon/server side`:
Agent forwarding may also be blocked on your server. You can check that agent forwarding is permitted by SSHing into the server and running `sshd_config`. The output from this command should indicate that `AllowAgentForwarding` is set.

How to check:
`cat /etc/ssh/sshd_config | grep -i 'forward'`


#### Running ssh-agent on windows with powershell

It is disabled by default.

```powershell
Get-Service -Name ssh-agent | Set-Service -StartupType Manual
Start-Service ssh-agent
```

### ssh-copy-id

Copy public keys to remote servers.

### Daemon (sshd) security hardening

```sh
# This is sshd_config
# only key based login, no password based login
PubkeyAuthentication yes
PasswordAuthentication no

# only use normal user login with sudo instead of root
PermitRootLogin no
PermitEmptyPasswords no

X11Forwarding no
```


### OpenSSH vs Openssl

OpenSSH is a `program` depending on OpenSSL the `library`, specifically OpenSSH uses the `libcrypto` part of OpenSSL.
It's worth mentioning that OpenSSH does not use the TLS protocol thats used for HTTPS etc. OpenSSH uses some of the OpenSSL cryptographic primatives.

### Remote host reflashed.

WE will get message like:
```
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@    WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED!     @
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
IT IS POSSIBLE THAT SOMEONE IS DOING SOMETHING NASTY!
```

Reset known_hosts file for that particular host via:
```
ssh-keygen -R 192.168.3.10
```

After that you will be reprompted for host identification via:
```
ja@ja-MacBook-Pro ~ % ssh linaro@192.168.0.104
The authenticity of host '192.168.0.104 (192.168.0.104)' can't be established.
ED25519 key fingerprint is SHA256:YDjOWSWLwukasdfadffm1FKOOT9NstxWS9nHfQOCM38.
This key is not known by any other names
Are you sure you want to continue connecting (yes/no/[fingerprint])? y
Please type 'yes', 'no' or the fingerprint: yes
Warning: Permanently added '192.168.0.104' (ED25519) to the list of known hosts.
linaro@192.168.0.104's password:
Linux linaro-alip 4.4.194 #75 SMP Thu Jun 24 14:03:34 UTC 2021 armv7l
```


## Key pair creation

We use `ssh-keygen` command to create key pair

### Select algorithm for keypair using `-t`

### Select filename for keypair using `-f`

e.g.

```
ssh-keygen -f ~/tatu-key-ecdsa -t ecdsa
```


## Copying public key to another server

```
ssh-copy-id -i ~/.ssh/tatu-key-ecdsa user@host
```


