
## usr merge convention

The /usr merge (also called usr-merge) is a modern Linux filesystem design where traditionally separate root directories are consolidated under /usr. Here's a detailed explanation:

Traditional Layout:
```
/bin    -> Essential user commands
/sbin   -> System binaries
/lib    -> Essential shared libraries
/usr/bin -> Most user commands
/usr/sbin -> Non-essential system binaries
/usr/lib -> Most libraries
```

Modern Layout (after usr-merge):
```
/bin    -> symlink to /usr/bin
/sbin   -> symlink to /usr/sbin
/lib    -> symlink to /usr/lib
/usr    -> contains all actual files
```
You can verify by seeing
```sh
root@user-MS-7D32:~# ls -al /bin
lrwxrwxrwx 1 root root 7 Oct  8  2022 /bin -> usr/bin
root@user-MS-7D32:~# ls -al /sbin
lrwxrwxrwx 1 root root 8 Oct  8  2022 /sbin -> usr/sbin
```

Benefits:
1. Simplification
   - Single hierarchy instead of split locations
   - Easier system management
   - Cleaner separation between OS and user data

2. Technical Advantages
   - Easier system snapshots
   - Simpler OS updates
   - Better support for read-only root filesystem
   - Simplified path handling

3. Historical Context:
   - Original split was due to disk space limitations
   - /bin and /lib were on small root partition
   - /usr could be on separate, larger disk
   - Modern systems don't need this separation

Major distributions adopting usr-merge:
- Fedora (since F17)
- Debian
- Ubuntu
- Arch Linux
- RHEL/CentOS

To check if your system uses usr-merge:
```bash
ls -l /bin /sbin /lib
# Should show symlinks to /usr counterparts
```