
Equivalent to lambda

All the functions code resides inside `functions/` directory in the project root.

A project root is where you can find `.firebaserc` and `firebase.json`.

works well with other firebase projects.

Needs `firebase-tools` for various tooling and inspection purposes.

A project can be created with `firebase init` which walks you 
through a wizard and helps create project.



### Logging

`firebase functions:log`

### SDK usage

```js
// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');
```

### deployment

```sh
firebase deploy --only functions
```

This gives a random public url like: `https://us-central1-projName-somProjID.cloudfunctions.net/helloWorld` which you can call to check your function behavior.

