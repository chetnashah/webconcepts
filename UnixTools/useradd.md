## Create a new user

we will create a new user called lfs as a member of a new group (also named lfs) and
run commands as lfs during the installation process. As root, issue the following commands to add the new user:
```bash
groupadd lfs
useradd -s /bin/bash -g lfs -m -k /dev/null lfs
```

This is what the command line options mean:
`-s /bin/bash` - This makes bash the default shell for user lfs.

`-g lfs` - This option adds user lfs to group lfs.
`-m` - This creates a home directory for lfs.
`-k /dev/null` -This parameter prevents possible copying of files from a skeleton directory (the default is /etc/skel) by changing
the input location to the special null device.
`lfs` - This is the name of the new user.

## Setting passwd for the new user

If you want to log in as lfs or switch to lfs from a non-root user (as opposed to switching to user lfs when logged in
as root, which does not require the lfs user to have a password), you need to set a password for lfs. Issue the following
command as the root user to set the password:
```bash
passwd lfs
```