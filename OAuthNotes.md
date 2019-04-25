
### Google OAuth

#### Online vs Offline access

Once your application has obtained a long-lived refresh token (step 4), it may access a Google API at any time. This means server-side applications do not require the end-user to be present when obtaining new access tokens. We’re calling this type of access offline.

The client-side flow, in contrast, requires the user to be present when obtaining an access token. This type of access is called online.

With this change, we will be exposing online and offline access as a separate parameter that’s available only in the server-side flow. 

When your application requests offline access, the consent page shown to a user will reflect that your application requests offline access and your application will receive an access and a refresh token. Once your application has a refresh token, it may obtain a new access token at any time.

When your application requests online access, your application will only receive an access token. No refresh token will be returned. This means that a user must be present in order for your application to obtain a new access token.

If unspecified in the request, online is the default.

consent will be auto-approved for returning users unless the user has revoked access. Refresh tokens are not returned for responses that were auto-approved.

### OAuth on the client

Google comes to redirect url with accesstoken in the query fragment. So server is not able to see it.

This is for use case where client is directly talking to google services, rather than involving a server in between.

