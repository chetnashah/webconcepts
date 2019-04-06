
For authorized access, you must also tell Google your website's `protocol` and `domain`. In return, Google generates a `client ID`. Your application submits this to the Google Auth server to get an OAuth 2.0 access token.

### Can a public IP address be used as Google OAuth redirect URI?

**NO**

### Registering app via Cloud Console

Google needs to know about your app, in order to provide services.
You register your app/project via cloud console.

### API keys

The `API key` identifies your application for requests that don't require authorization.


### Auth tokens

In cases authorization is needed from a google user i.e. a potential customer of our app, it is necessary to follow OAuth flow.

Google essentially grants access tokens on behalf of end user.

App has to pass
1. client ID (Our app ID) obtained during registration. LOoks like `407408718192.apps.googleusercontent.com`
2. scope object specifying what data our app will use.

Call ` https://accounts.google.com/o/oauth2/v2/auth` with `redirect_uri` in params. Usually in clients this is done by SDK etc with things like `google_services.json` etc. 

Authorization codes are exchanged for access tokens.

The redirect includes an access token, which your app verifies and then uses to make API requests.

Access tokens are passed as bearer tokens  or access token in our app, e.g.
`Authorization: Bearer mo56.GlvjBtOUke2usHakLakaBoomBoomYix5mN5rdEz0OMp6dFuwYABADABADOO8AYWbaOPJmARUrpJaHVgf`

Once you have bearer token, you just call google api of your choice and pass Bearer token in Authorization header.

One can always check third party apps that have one's own data access by going to Account > Security > Third party with data access.




