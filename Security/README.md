

## Certificate file formats

**They tell you only about encoding, nothing about the content!**

### Base64/Ascii human readable formats

PEM based: (can have anything inside - public or private key or both!)
* `.pem`
* `.crt`
* `.ca-bundle`

PKCS#7 based:
* `.p7b`
* `.p7s`

### Binary encoded

DER based:
* `.der`
* `.cer` - usually contains only public key, inspect by using `openssl x509 -inform DER -text -in myfile.cer`

PKCS12 based:
* `.pfx`
* `.p12` - usually contains both private and public key. To dump all info, use `openssl pkcs12 -info -nodes -in myfile.p12`.

**Note** - ANy of these can contain either private or public key or both, only way is to inspect them via keychain and/or `openssl` tool.