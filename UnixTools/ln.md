## verbose usage with `-v` recommended

## for file linking

NAME
       `ln` - make links between files

SYNOPSIS
```
       ln [OPTION]... [-T] TARGET LINK_NAME
       ln [OPTION]... TARGET
       ln [OPTION]... TARGET... DIRECTORY
       ln [OPTION]... -t DIRECTORY TARGET...
```

## relative syntax


In `ln -sv usr/$i $LFS/$i`, the `usr` is a relative path from where the symlink will be created. Let's break it down:

Given `$LFS=/mnt/lfs` (typical LFS setup), when running:
```bash
ln -sv usr/bin $LFS/bin
```

This creates:
- Link location: `/mnt/lfs/bin`
- Link target: `usr/bin`
- The actual target path becomes: `/mnt/lfs/usr/bin`

The `usr` is relative to where the symlink is placed. So:
1. If you're in `/mnt/lfs/bin`, following the symlink means looking for `usr/bin` relative to that location
2. This resolves to `/mnt/lfs/usr/bin`

You could write it absolutely as:
```bash
ln -sv /usr/bin $LFS/bin   # WRONG for LFS
```
But this would be wrong because it would point to the host system's `/usr/bin`, not the LFS system's `/usr/bin`.

To visualize:
```
$LFS/bin -> usr/bin
           ^
           |
           relative to $LFS/bin's location
           resolves to $LFS/usr/bin
```

This relative path approach ensures the symlinks work correctly within the LFS system, independent of where $LFS is mounted.