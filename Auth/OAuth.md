
## Terminology

## Different kinds of grants to acquire access token

1. Authorization code grant - user goes to authroization server, gets redirected to client with authorization code, client exchanges authorization code for access token.
2. Implicit grant - No authorization code, access token is returned directly.
3. Resource owner credentials grant - This grant is a great user experience for trusted first party clients both on the web and in native device applications. where credentials are directly exchanged for access token.
4. Client (App/Business) credentials grant - This grant is suitable for machine-to-machine authentication where a specific user’s permission to access data is not required.
5. Refresh token grant - for getting access token on expiry.

https://blog.postman.com/pkce-oauth-how-to/