
## What is TPM?

TPM is a chip on the motherboard that stores cryptographic keys. It is used to store keys for disk encryption, email encryption, and digital signatures. It is also used to store BitLocker encryption keys. Also for biometric authentication. TPM provides secure certificate storage.

TPMs are designed to perform various cryptographic functions, including generating and storing cryptographic keys, performing digital signatures, and securely storing sensitive information such as passwords and certificates

### Device attestation

TPMs support a feature called device attestation, which allows a device to prove its identity and integrity to external entities. This is particularly useful in scenarios where the trustworthiness of a device needs to be verified.

### Secure boot

TPMs are often used in conjunction with secure boot processes. During the boot sequence, the TPM can be involved in verifying the integrity of the bootloader and operating system, ensuring that only trusted software is executed.

### Root of trust

TPMs are often referred to as a root of trust. This is because they are the first component in a chain of trust that can be used to verify the integrity of a system. The TPM is the root of this chain of trust, and it can be used to verify the integrity of other components in the chain.