
## Use to format a partition

To create an ext4 file system on the LFS partition, issue the
following command:
```bash
mkfs -v -t ext4 /dev/<xxx>
```
Replace `<xxx>` with the name of the LFS partition.