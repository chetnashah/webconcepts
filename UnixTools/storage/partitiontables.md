
1. **MBR (Master Boot Record)**
   - **Description:** 
     - The traditional partitioning scheme used by BIOS firmware.
     - Often referred to interchangeably with MSDOS partition table.
   - **Features:**
     - Limited to **4 primary partitions**; or **3 primary partitions and 1 extended partition** containing multiple logical partitions.
     - **Maximum partition size:** 2 TB.
     - **Compatibility:** Widely supported by most operating systems and older hardware.
     - **Limitations:** Does not support modern features like UEFI secure boot.

2. **MSDOS Partition Table**
   - **Description:**
     - Essentially synonymous with the MBR partitioning scheme.
     - Sometimes specifically referred to as the "MS-DOS" partition table in certain contexts or tools.
   - **Features:**
     - Shares all characteristics with MBR, including partition limits and size constraints.
     - Named after its origin with Microsoft DOS systems.
     - Commonly used in systems that require compatibility with older software or hardware.

3. **GPT (GUID Partition Table)**
   - **Description:** 
     - A modern partitioning scheme designed to replace MBR.
     - Required for systems using UEFI firmware.
   - **Features:**
     - Supports up to **128 primary partitions** by default.
     - **Maximum partition size:** 9.4 Zettabytes (theoretical limit).
     - **Enhanced Reliability:** Stores a primary and a backup partition table for redundancy.
     - **Data Integrity:** Uses CRC32 checksums to detect partition table corruption.
     - **Supports UEFI Secure Boot and modern hardware features.

4. **BSD Disklabel**
   - **Description:** 
     - Used primarily by BSD (Berkeley Software Distribution) operating systems.
   - **Features:**
     - Typically supports **8 or 16 partitions**, depending on the BSD variant.
     - Simpler design compared to MBR/GPT.
     - Can be embedded within an MBR partition for compatibility.
     - Not commonly used outside of BSD environments.

5. **APM (Apple Partition Map)**
   - **Description:** 
     - The legacy partitioning scheme used by older Apple Macintosh systems.
   - **Features:**
     - Supports up to **63 partitions**.
     - Replaced by GPT on modern Mac systems starting with the transition to Intel processors.
     - Designed specifically for compatibility with Macintosh hardware and firmware.

### Summary

- **MBR/MSDOS:** Best for compatibility with older systems and BIOS firmware but limited in partition number and size.
- **GPT:** Ideal for modern systems with UEFI firmware, supporting large disks and numerous partitions with enhanced reliability.
- **BSD Disklabel & APM:** Specialized for BSD and older Apple systems, respectively.

For most contemporary applications and hardware, **GPT** is the recommended partition table type due to its advanced features and support for large storage devices. However, if you need compatibility with older operating systems or hardware that only support BIOS firmware, **MBR/MSDOS** remains a viable option.

If you have any specific questions about these partition table types or need guidance on selecting the right one for your setup, feel free to ask!

## Commands

Here are commands to read and print partition tables:

Basic partition table info:
```bash
sudo fdisk -l           # Lists all partition tables and partitions
sudo sfdisk -l          # Similar to fdisk, more detailed output
sudo parted -l          # Shows partition tables in all drives
gdisk -l /dev/sdX      # For GPT partitions specifically
```

Detailed partition info:
```bash
cat /proc/partitions    # Shows all partitions recognized by kernel
hexdump -C -n 512 /dev/sdX  # Raw hex dump of partition table
mmls /dev/sdX          # Shows partition layout forensically
```

Device-specific partition mapping:
```bash
kpartx -l /dev/sdX     # Lists partition mappings
dmsetup ls             # Shows device mapper partition layout
```

Replace /dev/sdX with your specific device (like /dev/sda).
