
A (client + server) framework to build realtime apps.
Used along with a view-layer framework like React.

Meteor uses node + mongodb for backend.
Communicates to frontend via live socket connection.

Create a meteor project with `meteor create app-name` on command-line.

The generated app folders like `client` and `server`.
The generated app folder `.meteor` contains metadata for the meteor project.

### Directory names

* `public`: any file in this folder is treated as a public asset.

* `client`: files in this directory only get loaded on the client.

* `server`: files in this directory only get loaded on the server.

* `imports`: To fully use the module system and ensure that our code only runs when we ask it to, we recommend that all of your application code should be placed inside the imports/ directory. This means that the Meteor build system will only bundle and include that file if it is referenced from another file using an import (also called “lazy evaluation or loading”). i.e. If you want to stop code being loaded without explicitly specified via require/import, put that code in this `imports` directory.

* Any other folder: any other folder code is automatically loaded by server as well as client (eager loading). This is usually not recommended.

### What is minimongo ?

Minimongo is essentially an in-memory, non-persistent implementation of Mongo in pure JavaScript. It serves as a local cache that stores just the subset of the database that this client is working with. Queries (find) on these collections are served directly out of this cache, without talking to the server.

### Mongo API

The import is following:
```js
import { Mongo } from 'meteor/mongo';
```

### Meteor Tracker

Usage:
```js
import { Tracker } from 'meteor/tracker'
Tracker.autorun(cbfn);
```

Helps us enable transparent reactive programming.
Think of it as a live query that has subscribed to a reactive data source.
When you call a function that supports reactive updates (such as a database query), it automatically saves the current Computation object, if any (representing, for example, the current template being rendered). Later, when the data changes, the function can “invalidate” the Computation, causing it to rerun/autorun.

It is an independent library of its own also and it is bundled with meteor for convinience.

#### Tracker.computation

A computation is an object that is run in response to reactive data changes.
Computation don't return values, they just perform actions.

Computations are created using `Tracker.autorun()`. Use `stop` from further re-running of a computation.

Each time a computation runs, it may access various reactive data sources that serve as inputs to the computation, which are called its dependencies. At some future time, one of these dependencies may trigger the computation to be rerun by invalidating it. When this happens, the dependencies are cleared, and the computation is scheduled to be rerun at flush time.



### Client

`startup` is important function on Meteor, which is equivalent to `domReady` of jquery, hence all Dom manipulation should be done in function passed to startup function.

### Server

`startup` is called when server initialization is finished. `startup` takes a callback which is called when init is finished.

### Account management

Recommended package is `accounts-base` takes care of everything from hashing password, storing etc. finally populates Metero.user and Metero.userId if loggedIn.

Checking user status in dev-tools console:
`require('meteor/meteor').Meteor.user()` which prints user info if logged in and null if logged out.

Meteor stores loginTokens and userId info in localStorage.

#### Signing Up

```js
import { Accounts } from 'meteor/accounts-base';

Accounts.createUser({ email, password}, (err) => {
    console.log('signup callback', err);
});
```

#### Logging In

```js
import { Meteor } from 'meteor/meteor';

Meteor.loginWithPassword(email, password, (err) => {
    console.log('login callback', err);
})
```

#### Logging out

```js
import { Accounts } from 'meteor/accounts-base';

Accounts.logout();
```

