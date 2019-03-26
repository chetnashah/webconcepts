
### Sites to check

`httpsecurityreport.com`

### SSL Certificates

check ssl readyness of your site on : ssllabs 
`https://www.ssllabs.com/ssltest/`

Needed for `https`.
Find certificate issuance info on `crt.sh`.

Procedure for deployment:
1. Pay money to CA.
2. Prove identity.
3. Certificate Signing Request.
4. Configure network server

Types of SSL certificates:
1. DV Certificates: Domain Validation.
2. OV Certificates: Organization validated.
3. EV Certificates: Extended validation.

### Setting up SSL with your load balancer

In below site, select your lb, select browser level, and you get config.
https://mozilla.github.io/server-side-tls/ssl-config-generator/

### CSP directive (content security policy)

https://developers.google.com/web/fundamentals/security/csp/


#### Let's Encrypt and the ACME protocol(Automatic Certificate Management Environment)

**Let’s Encrypt is a CA**.
Let's Encrypt will only issue DV since it is automated.

In order to get a certificate for your website’s domain from Let’s Encrypt, you have to demonstrate control over the domain. 

90 days cert lifetime.

Clients request certificates from Let's Encrypt via ACME

3 categories of ACME clients:
1. Simple: drop cert in current dir.
2. Full featured: configure the server for you.
3. Built in: web server just does it.

### Password management and bcrypt

http://dustwell.com/how-to-handle-passwords-bcrypt.html

### What is XSS(cross site scripting) ?

Find more at (Thanks to https://excess-xss.com/).
Cross-site scripting (XSS) is a code injection attack that allows an attacker to execute malicious JavaScript in another user's browser.

The attacker does not directly target his victim. Instead, he exploits a vulnerability in a website that the victim visits, in order to get the website to deliver the malicious JavaScript for him. To the victim's browser, the malicious JavaScript appears to be a legitimate part of the website, and the website has thus acted as an unintentional accomplice to the attacker.

A good example is: Suppose the website does not sanitize user input, and we have a chat/comment section, the attacker will do a comment that contains malicious script, and it is stored as is by website server, and served to other users, then the malicious script (seems legit since it is served by website server), now executes on browsers of all people in comment/chat and can do harmful things.

Primary consequences are:
1. cookie theft.
2. Keylogging.
3. Phishing.

Types of XSS:
1. Persistent XSS: Malicious string originates from website's database.
2. Reflected XSS: malicious string originates from victim's request.
3. DOM based XSS: where vulnerability is in client side code rather than server side code. (Increasingly more and more client side JS is executed in modern apps, which may have vulnerability, no need to go to server.)

There is a special case of DOM-based XSS in which the malicious string is never sent to the website's server to begin with: when the malicious string is contained in a URL's fragment identifier (anything after the # character). Browsers do not send this part of the URL to servers, so the website has no way of accessing it using server-side code. The client-side code, however, has access to it and can thus cause XSS vulnerabilities by handling it unsafely. (Keeping state in history, URL, LocalStorage) - all of which can contain malicious strings.



### Articles

https://jakearchibald.com/2018/third-party-css-is-not-safe/

### Server security

https://www.digitalocean.com/community/questions/best-practices-for-hardening-new-sever-in-2017