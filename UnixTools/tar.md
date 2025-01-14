
## `tar` combines multiple files into single file (can also zip at the same time)


When performed independently, tarring is followed by compression, and during extraction, decompression happens first, then un-tarring.

Archiving (tar):
- Combines multiple files/directories into a single file
- Doesn't compress by itself
- Common command: `tar -cf archive.tar files/`

Zipping (gzip):
- Compresses a single file
- Doesn't handle multiple files
- Common command: `gzip file`

Typical combined usage:
1. Archive multiple files with tar, then compress the archive with gzip:
```bash
# -z is for compress
# -c is for create
# -f for specifying filename
tar -czf archive.tar.gz files/    # (-z flag makes tar use gzip)
```

2. To extract:
```bash
# -x is for extract
# -z as unzip is involved
tar -xzf archive.tar.gz           # extracts and decompresses in one step
```

That's why you often see `.tar.gz` or `.tgz` extensions - it means the files were first archived (tar) then compressed (gzip).

## Listing files within the tar archive

To list files within a tar archive recursively, use the `-t` (list) flag:

For regular tar:
```bash
tar -tf archive.tar
```

For gzipped tar:
```bash
tar -tzf archive.tar.gz
```

The `f` flag specifies the archive file, and `z` is needed if it's gzipped. Adding `v` (verbose) will show more details:

```bash
tar -tvf archive.tar      # shows file sizes, permissions, dates
```

