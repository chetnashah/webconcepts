
### Starting traditional node apps

```js
var http = require('http');

var server = http.createServer(function(req, res){
  console.log('this is a request handler for all requests');
});
// need to specify listen with port to actually listen
server.listen(3000, () => {
  console.log('server listening now!!');
})
```

### Starting express apps

Two ways:

1. just use express, no node requires
```js
var express = require('express');
var app = express();

app.get('/', (req, res) => { /* doSomething */ });
app.listen(3000);
```

2. express combined with nodejs

```js
var express = require('express')
  , http = require('http');

var app = express(); 
app.get('/', (req, res) => { /* doSomething */ });

var server = http.createServer(app);// app is the request handler
server.listen(3000);
```


### express.Router

Use this class to create a modular, mountable route handlers. 
A router is a complete middleware and routing system,
for this reason often referred to as mini-app.

e.g. in `birds.js`
``` js
var express = require('express')
var router = express.Router()

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})
// define the home page route
router.get('/', function (req, res) {
  res.send('Birds home page')
})
// define the about route
router.get('/about', function (req, res) {
  res.send('About birds')
})

module.exports = router
```

Now the above routes can be mounted on top of `/birds` route as shown in below code in app.
``` js
var birds = require('birds');
app.use('/birds', birds); // takes care of /birds, /birds/about and shows timelogs for birds
```

### Express route parameters via colon(:)

Route parameters are named URL segments used to capture the values specified at their position in the URL. 
The named segments are prefixed with a colon and then the name (e.g. `/:your_parameter_name/`. The captured values are stored in the req.params object using the parameter names as keys (e.g. `req.params.your_parameter_name`).



### MiddleWare

Middleware functions are functions that have access to req, res and next middleware function.
They can:
1. Execute any code
2. Make changes to request and response objects.
3. End the request response cycle.
4. Call next middleware function.

A middleware should end cycle or call next, otherwise request will be left hanging.

Any middleware function signature looks like following
``` js
const myloggermiddleware = function(req, res, next) {
    // log some property on req
    // call end() or call next()
}
```

app.use is generally used for middlewares, and app.method is for method & routing
``` js
app.use(middlewarefunction);// executes for all requests
// or
app.use('/some/path', middlewarefunction); // path is optional, when specified middleware function only executes for specified path
// or middlewarefunction array or middlewarefunction seperated by commas
app.use(m1, m2, m3);
app.use([m1, m2, m3]);
// or a router is also a valid middlewarefunction
var router = express.Router();
router.get('/', function(req, res, next){
    next();
});
app.use(router)
```

https://hackernoon.com/middleware-the-core-of-node-js-apps-ab01fee39200

### Serving static files in express

The main thing to add is :
``` js
app.use(express.static('public'))
// This means there is a folder named public, and all 
// file paths relative to url are resolved relative to this path
// e.g.
http://localhost:3000/images/kitten.jpg -> public/images/kitten.jpg
http://localhost:3000/css/style.css -> public/css/styles.css
http://localhost:3000/js/app.js -> public/js/app.js
http://localhost:3000/hello.html -> public/hello.html
```
**NOTE** : Express looks up the files relative to the static directory, so the name of the static directory is not part of the URL.

To unambiguosly specify a route prefix for all static assets, the optional path in app.use API can be used. e.g.
``` js
app.use('/static', express.static('public'))
// http://localhost:3000/static/images/kitten.jpg
// http://localhost:3000/static/css/style.css
```

### Error handling in Express


Let's say your middleware queries some data from server and could
not find it, and the db api returned an error, then how do u handle it?

``` js
// all middlewares have a next, so 
// in case of an error make an Error object and pass it to next.
app.get('/users/:id', (req, res, next) => {
  const userId = req.params.id
  if (!userId) {
    const error = new Error('missing id')
    error.httpStatusCode = 400
    return next(error)
  }
  Users.get(userId, (err, user) => {
    if (err) {
      err.httpStatusCode = 500
      return next(err)
    }
    res.send(users)
  })
})
```

Usually you should add last middlewares (to catch) 
that will be reached only when all of the above middlewares could not successfully send a 
response.
``` js
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler - always four arguments
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
```

#### Serving dynamic web pages

Depending on what request wants,
Usually `res.send(string)` only sends the static string down the wire,
but we can send html parametrized with values fetched from db. which
shows as a web page on the server, this process is known as server side rendering of html,
usually via templates or other technology.

The convention is to put the template files inside `views` directory.
Specify views directory to express using  `app.set('views', viewsDirPathString)`):

Using a template to render is as following: (assumes views directory is already specified)
`res.render(templateFileName, variablesToBeUsedByTemplateInJSON)`

Consolidate is a library that is a wrapper around a set of templating engines.
conviniently used as `var engines = require('consolidate')`


### passport js and sessions and cookies

Sessions
In a typical web application, the credentials used to authenticate a user will only be transmitted during the login request. If authentication succeeds, a session will be established and maintained via a cookie set in the user's browser.

Each subsequent request will not contain credentials, but rather the unique cookie that identifies the session. In order to support login sessions, Passport will serialize and deserialize user instances to and from the session.

Strategy configuration for passport happens via `passport.use(new StrategyName(opts, verifycb){})`

Express comes to know about passport via its list of middlewares
``` js
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());
```

* Purpose of `serializeUser` and `deserializeUser` : Convert a db record for a user to a cookie and vice-versa. Usually we take the record and just extract the id and send it as a cookie to browser. And when a client request comes with cookie containing user id, we deserialize the user record from db using the id inside the cookie that came in the request.

There is 1:1 relationship between cookie's sid <-> user, managed by passport.

#### Verify Callback in Passport

Strategies require what is known as a verify callback. The purpose of a verify callback is to find the user that possesses a set of credentials.

verifycb :: credentials -> done(user);

When Passport authenticates a request, it parses the credentials contained in the request. It then invokes the verify callback with those credentials as arguments, in this case username and password. If the credentials are valid, the verify callback invokes done to supply Passport with the user that authenticated.


#### 

`passport.session()` acts as a middleware to alter the req object and change the 'user' value that is currently the session id (from the client cookie) into the true deserialized user object.

Whilst the other answers make some good points I thought that some more specific detail could be provided.

`app.use(passport.session());`
is equivalent to

`app.use(passport.authenticate('session'));`
Where 'session' refers to the following strategy that is bundled with passportJS.

https://github.com/jaredhanson/passport/blob/master/lib/strategies/session.js

Specifically lines 59-60:
``` js
var property = req._passport.instance._userProperty || 'user';
req[property] = user;
```
Where it essentially acts as a middleware and alters the value of the 'user' property in the req object to contain the deserialized identity of the user. To allow this to work correctly you must include serializeUser and deserializeUser functions in your custom code.

``` js
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (user, done) {
    //If using Mongoose with MongoDB; if other you will need JS specific to that schema
    User.findById(id, function (err, user) {
        done(err, user);
    });
});
```
This will find the correct user from the database and pass it as a closure variable into the callback done(err,user); so the above code in the passport.session() can replace the 'user' value in the req object and pass on to the next middleware in the pile.

### Controlling access to routes via passport

We would want some routes of our application to be accessed only if the user is successfull authenticated e.g. `/home/settings` etc.

This is done by putting `passport.authenticate('abc')` in list of middleware before the route handler.

e.g.
```js
app.get('/home/settings', passport.authenticate('google'), (req, res) => {
  res.send('you are accessing settings bcoz u were authenticated');
});
// if user did not authenticate earlier to accessing route, 
// it will either start a process of asking for creds etc.
// or return unauthorized
```

### express-session vs cookie-session

The basic difference between both these relates to how and where is the session data being stored. Cookie session is basically used for lightweight session applications where the session data is stored in a cookie but within the client [browser], whereas, Express Session stores just a mere session identifier within a cookie in the client end, whilst storing the session data entirely on the server. Cookie Session is helpful in applications where no database is used in the back-end. However, the session data cannot exceed the cookie size. On conditions where a database is used, it acts like a cache to stop frequent database lookups which is expensive.

* cookie-session: Create a new cookie session middleware with the provided options. This middleware will attach the property session to req, which provides an object representing the loaded session. This session is either a new session if no valid session was provided in the request, or a loaded session from the request.

The middleware will automatically add a Set-Cookie header to the response if the contents of req.session were altered. Note that no Set-Cookie header will be in the response (and thus no session created for a specific user) unless there are contents in the session, so be sure to add something to req.session as soon as you have identifying information to store for the session.

e.g
``` js
var cookieSession = require('cookie-session')
var express = require('express')
var app = express()

app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}));

app.get('/', function (req, res, next) {
  // Update views
  req.session.views = (req.session.views || 0) + 1

  // Write response
  res.end(req.session.views + ' views');
});

app.listen(3000)
```


