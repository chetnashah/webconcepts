

## Authentication is who you are

## Authorization is what you can do

## 401 vs 403

`401 Unauthorized`: I don't know who you are. This an authentication error.
`403 Forbidden`: I know who you are, but you don't have permission to access this resource. This is an authorization error.

Note: HTTP 401 responses must always include a `WWW-Authenticate` header, that instructs the client how to authenticate. 

HTTP 403 responses do not include the WWW-Authenticate header.

## Types of MFA

1. TOTP (Time-based One-Time Password) - Google Authenticator, Authy, Microsoft Authenticator
2. HOTP (HMAC-based One-Time Password) - Yubikey
3. Push notification - Duo, Okta Verify, Microsoft Authenticator
4. SMS - Authy, Google Authenticator, Microsoft Authenticator
5. Fido2 (Phishing resistant) - Yubikey, Google Titan, Microsoft Hello 

