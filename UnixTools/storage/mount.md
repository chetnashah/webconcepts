
## only `mount` lists all mounted drives/disks/partitions

```bash
user@user-MS-7D32:~/Documents/programming/linuxfromscratch$ mount | grep 'sdb1'
/dev/sdb1 on /mnt/lfs type ext4 (rw,relatime)
```

## mount diskname pathname

needs sudo.
mount a given disk at a given path.

## auto mount on boot with `/etc/fstab` file

`/etc/fstab` (filesystem table) defines how disk partitions should be mounted during boot:

1. Role of /etc/fstab:
- Automatically mounts filesystems during boot
- Defines mount points, options, and boot behavior
- Allows regular users to mount pre-configured filesystems
- Format: `<device> <mountpoint> <filesystem> <options> <dump> <fsck>`

2. Disk Identifiers:
Device paths (/dev/sdX) can change across reboots due to:
- Adding/removing drives
- BIOS/UEFI boot order changes
- Hardware changes

Better identifiers (recommended for /etc/fstab):
```bash
# UUID (most reliable)
UUID=123e4567-e89b-12d3-a456-426614174000

# LABEL (if filesystem is labeled)
LABEL=my_drive

# PARTUUID (GPT partition UUID)
PARTUUID=7280201c-fc5d-467e-a5e2-bc705139d49f
```

Find identifiers using:
```bash
# Show all identifiers for all block devices
blkid

# Or for specific device
blkid /dev/sda1

# List mounted devices with UUIDs
lsblk -f
```

Example /etc/fstab entry using UUID:
```bash
UUID=123e4567-e89b-12d3-a456-426614174000  /mnt/data  ext4  defaults  0  2
```