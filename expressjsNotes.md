


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
app.use(middlewarefunction);
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
