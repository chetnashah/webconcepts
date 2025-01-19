
## make adhoc shell environments with `nix-shell -p`
`-p` is for packages, for all packages search them on https://search.nixos.org/packages

```
user@user-MS-7D32:~$ nix-shell -p cowsay

[nix-shell:~]$ cowsay hola
 ______
< hola >
 ------
        \   ^__^
         \  (oo)\_______
            (__)\       )\/\
                ||----w |
                ||     ||


[nix-shell:~]$ exit

user@user-MS-7D32:~$  cowsay hola
The program ‘cowsay’ is currently not installed.

```
