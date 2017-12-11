


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