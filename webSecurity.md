
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