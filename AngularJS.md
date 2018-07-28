**AngularJS is Angular 1.x**


### provider

The Provider recipe is syntactically defined as a custom type that implements a `$get` method. This method is a factory function just like the one we use in the Factory recipe. In fact, if you define a Factory recipe, an empty Provider type with the `$get` method set to your factory function is automatically created under the hood.

Provide any kind of values with provider.

### factories

A factory is a provider with less boilerplate.
Provide values like a provider with reduced boilerplate

### services

Service lets you return/provide a type/class/constructor function, not simplistic values.

The Service recipe produces a service just like the Value or Factory recipes, but it does so by invoking a constructor with the new operator. The constructor can take zero or more arguments, which represent dependencies needed by the instance of this type

```js
function UnicornLauncher(apiToken) {

  this.launchedCount = 0;
  this.launch = function() {
    // Make a request to the remote API and include the apiToken
    ...
    this.launchedCount++;
  }
}
// factory that returns an instance of UnicornLauncher type
myApp.factory('unicornLauncher', ["apiToken", function(apiToken) {
  return new UnicornLauncher(apiToken);
}]);
// equivalent service below
myApp.service('unicornLauncher', ["apiToken", UnicornLauncher]);
```

All services in AngularJS are singletons. That means that the injector uses each recipe at most once to create the object. The injector then caches the reference for all future needs.

https://www.youtube.com/watch?v=aqY5H95DZ8w

### configuration phase vs run phase

1. config phase
During application bootstrap, before AngularJS goes off creating all services, it configures and instantiates all providers. We call this the configuration phase of the application life-cycle. During this phase, services aren't accessible because they haven't been created yet.

2. run phase
Once the configuration phase is over, interaction with providers is disallowed and the process of creating services starts. We call this part of the application life-cycle the run phase.

