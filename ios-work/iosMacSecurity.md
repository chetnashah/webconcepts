
Keychain Access is the name of app that manages keychains i.e. `/usr/bin/security`.

Where are keychain files stored?
```
~/Library/Keychains/
/Library/Keychains/
/System/Library/Keychains/
```
Some examples are `System.keychain`, `Login.keychain`, `SystemCACertificates.keychain`.


What is a keychain?
A keychain is an encrypted container that holds
passowrds, crypto keys, certs.

### Keychain structure:
1. A keychain contains keychain items.
2. A keychain item contains data and attributes.
Attributes are never encrypted so can always be read (even if keychain is locked)
3. Some keychain items have their data encrypted, some do not.
4. Each item and the keychain itself has 1 access object associated
5. An access object contains access control list entries (ACL entries)
ACL entry contains authorization tags and a set of trusted applications.
The ACL is looked up whenever an app tries to CRUD an item
6. There are some standard attributes exposed by the UI

* Name
* Kind
* Account
* Where
* Comments

#### Item types

Items are grouped into classes (labeled as "kind" in the UI). The "kind" field is free form text so you can add anything you want to it.

These are the default classes used by Apple:

1. Internet password
2. generic passwords
3. network passwords
4. AirPort network password
5. iTunes iAd password
6. certificate
7. Application password
8. Airplay Client Peer
9. Airplay Client Identity
10. Token
11. private key
12. public key
13. secure note
You can think of classes/kinds as a "tag" on the item.

### Certificates vs My Certificates
Q: What is diff between Certificates and My Certificates in keychain access?

A: My Certificates is the subset of Certificates that I also have associated private keys for.

### Keychain on IOS

This keychain is automatically unlocked when the user unlocks the device and then locked when the device is locked. An app can access only its own keychain items, or those shared with a group to which the app belongs. It can't manage the keychain container itself.

In iOS the user does not have to enter keychain password, the system generates its own password for the keychain, directly linked to your unlocking/locking.

### Keychain exports keys and certs

Exporting certificates and keys from keychian
When you export a .cer from keychain you export a X509 certificated in DER format. It does not contain the private key. You can inspect the file with
```
openssl x509 -inform der -noout -text -in file.cer
```


Whe you export a .p12 you get a PKCS12 certificate, encrypted with a password that contains both public and private key. You can inspect the file using
```
openssl pkcs12 -in file.p12 -info
# you will be prompted for password for the file and then a password for the private key
```
You can export a single public key as PEM file.




