
### How JSON Web Tokens work

When first succesfully logged in with credentials, return a webtoken which is stored in local storage.
instead of traditional approach of cookie with session in the server.

Whenever user wants to access protected route, it should send JWT, in Authorization header using the Bearer word,
```
Authorization: Bearer <token>
```

JWTs are self contained, all the necessary info is there (uid + signature), reducing need to go back and forth to db.
A JWT looks like `header.payload.signature`
