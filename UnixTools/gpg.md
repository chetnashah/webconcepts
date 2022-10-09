https://www.gnupg.org/gph/en/manual.html

Basically Assymmetric PKI management system.
* can be used for encrypting/decrypting for symmetric/assymetric encrption.
* It can also be used for signing and verifying docs.

## Keyservers

Servers that hold collection of all public keys.
e.g. https://keys.openpgp.org/


## How do I know if my `.gpg` file is a publickey, or a signature, or something else?

Use file command:
e.g. for public key:
```sh
jayh@j-MacBook-Pro ~ % file mykey.gpg
mykey.gpg: OpenPGP Public Key Version 4, Created Sun Oct  9 08:35:49 2022, RSA (Encrypt or Sign, 3072 bits); User ID; Signature; OpenPGP Certificate
```

For signature, it will return data:
```sh
jah@j-MacBook-Pro ~ % file test.txt.gpg
test.txt.gpg: data
```

## Main dir holding all info

`~/.gnupg` folder

## Create public private key pair

```
gpg --full-generate-key
```

Creation output

```
gpg: revocation certificate stored as '/Users/abcd/.gnupg/openpgp-revocs.d/75FC2EB82A9CAEC68BA72168660BD3B488CB2B68.rev'
public and secret key created and signed.

pub   rsa3072 2022-10-09 [SC] [expires: 2032-10-06]
      75FC2EB82A9CAEC68BA72168660BD3B488CB2B68
uid                      jayshah (my key) <abc67@gmail.com>
sub   rsa3072 2022-10-09 [E] [expires: 2032-10-06]
```

## pubring

holds all public keys

## Secring

holds all private keys


## Exporting public key

export in plaintext:
```
gpg --armor --export alice@cyb.org
```


export in binary/.gpg format
```
gpg --output alice.gpg --export alice@cyb.org
```


## Importing public key

```
alice% gpg --import blake.gpg
gpg: key 9E98BC16: public key imported
gpg: Total number processed: 1
gpg:               imported: 1
```

## List all public keys in keyring

```
gpg -k
or
gpg --list-keys
```

## List all secret keys

```
gpg -K
or
gpg --list-secret-keys
```

example output:
```
pub   dsa2048 2010-08-19 [SC] [expires: 2024-05-11]
      85E38F69046B44C1EC9FB07B76D78F0500D026C4
uid           [ unknown] GPGTools Team <team@gpgtools.org>
uid           [ unknown] [jpeg image of size 6329]
sub   rsa4096 2014-04-08 [S] [expires: 2024-05-11]
sub   rsa4096 2020-05-11 [E] [expires: 2024-05-11]

pub   rsa4096 2020-05-04 [SC] [expires: 2024-05-03]
      B97E9964ACAD1907970D37CC8A9E3745558E41AF
uid           [ unknown] GPGTools Support <support@gpgtools.org>
sub   rsa4096 2020-05-04 [E] [expires: 2024-05-03]

pub   rsa4096 2022-10-09 [SC] [expires: 2026-10-09]
      08587DF7BAB9F454D422BB35A1A68A9749F105320
uid           [ultimate] samplegpgkeypair
sub   rsa4096 2022-10-09 [E] [expires: 2026-10-09]

pub   rsa3072 2022-10-09 [SC] [expires: 2032-10-06]
      75FC2EB82A9CAEC68AABB168660BD3B488CB2B68
uid           [ultimate] abcd (my key) <abcd@gmail.com>
sub   rsa3072 2022-10-09 [E] [expires: 2032-10-06]
```

## Encrypt a file



## Signing

* Why is signing better than hashing?
Because hashing has no sense of user identity/authenticity of the content under question.

### Signing process

signing needs a private key and some content to sign, the output will be a signature which can later be verified using the public key of the signer.

```
gpg --output doc.sig --sign fileOrContentToSign.txt 
```
`Note`: if no output file is specified, it will output signature in `fileOrContentToSign.txt.gpg` instead of `doc.sig`. 

Signing with a specific key:
```
gpg --local-user 0xDEADBEE5 --sign file
```

### Verification process

```
gpg --verify doc.sig
or
gpg --verify file.txt.gpg
```

### Decrypting a signature is similar

specifiying the key holders name/uid and the signature file to decrypt.
```
gpg --local-user jayshah --decrypt test.cpp.gpg
```


## File encryption/decryption

https://www.youtube.com/watch?v=DMGIlj7u7Eo

