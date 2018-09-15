**AngularJS is Angular 1.x**


### angular.element

Wraps a raw DOM element or HTML string as a jQuery element.

If jQuery is available, `angular.element` is an alias for the jQuery function. If jQuery is not available, `angular.element` delegates to AngularJS's built-in subset of jQuery, called "jQuery lite" or `jqLite`.

**Note: Keep in mind that this function will not find elements by tag name / CSS selector. For lookups by tag name, try instead angular.element(document).find(...) or $document.find(), or use the standard DOM APIs, e.g. document.querySelectorAll().**

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

### $scope.$apply, $scope.$watch and $scope.$digest

http://tutorials.jenkov.com/angularjs/watch-digest-apply.html

#### $scope.$apply

Execute a function in context of angularjs.
The `$scope.$apply()` function takes a function as parameter which is executed, and after that `$scope.$digest()` is called internally. That makes it easier for you to make sure that all watches are checked, and thus all data bindings refreshed.

#### $scope.$watch

`$watch(watchExpression, listener, [objectEquality]);`
`$scope.$watch` takes in two arguments, a `value function`, which should return an expression that is supposed to be watched, and a `listener function`, which will be executed whenever the value of the expression returned by value function changed.

```js
module.controller('CounterController', ['$scope' ,function($scope){
    $scope.count = 0;
    $scope.$watch(function($scope){// value fn -return expr to be watched
        return $scope.count;
    },function(newValue, oldValue){// listener function
        console.log('watch expression value changed! '+ oldValue + ' -> '+newValue);
    });
    // setTimeout is outside control of angularjs, put inside code
    // in a $apply
    setInterval(function(){
        $scope.$apply(function(){
            $scope.count = $scope.count + 5;
        });
    }, 1500);
}]);
```


#### $scope.$digest

The `$scope.$digest()` function iterates through all the watches in the `$scope` object, and its child `$scope` objects (if it has any). When `$digest()` iterates over the watches, it calls the value function for each watch. If the value returned by the value function is different than the value it returned the last time it was called, the listener function for that watch is called.

The `$digest()` function is called whenever AngularJS thinks it is necessary. For instance, after a button click handler has been executed, or after an AJAX call returns (after the `done()` / `fail()` callback function has been executed).

You may encounter some corner cases where AngularJS does not call the $digest() function for you. You will usually detect that by noticing that the data bindings do not upate the displayed values. In that case, call `$scope.$digest()` and it should work. Or, you can perhaps use `$scope.$apply()` instead which I will explain in the next section.

### custom directives

When should I use an attribute versus an element? Use an element when you are creating a component that is in control of the template. The common case for this is when you are creating a Domain-Specific Language for parts of your template. Use an attribute when you are decorating an existing element with new functionality.

#### Directive definition Object

The correct way to define custom directives,
Here is a sample that contains all possible fields:
```js
var myModule = angular.module(...);

myModule.directive('directiveName', function factory(injectables) {
  var directiveDefinitionObject = {
    priority: 0,
    template: '<div></div>', // or // function(tElement, tAttrs) { ... },
    // or
    // templateUrl: 'directive.html', // or // function(tElement, tAttrs) { ... },
    transclude: false,
    restrict: 'A',
    templateNamespace: 'html',
    scope: false,
    controller: function($scope, $element, $attrs, $transclude, otherInjectables) { ... },
    controllerAs: 'stringAlias',
    require: 'siblingDirectiveName', // or // ['^parentDirectiveName', '?optionalDirectiveName', '?^optionalParent'],
    compile: function compile(tElement, tAttrs, transclude) {
      return {
        pre: function preLink(scope, iElement, iAttrs, controller) { ... },
        post: function postLink(scope, iElement, iAttrs, controller) { ... }
      }
      // or
      // return function postLink( ... ) { ... }
    },
    // or
    // link: {
    //  pre: function preLink(scope, iElement, iAttrs, controller) { ... },
    //  post: function postLink(scope, iElement, iAttrs, controller) { ... }
    // }
    // or (most frequently used)
    // link: function postLink( ... ) { ... }
  };
  return directiveDefinitionObject;
});
```

#### scope option for custom directive

creates isolated scope for directive

1. If you specify true, it is a child scope (prototype inheritance)
2. but if you specify object or something else, it is an isolated scope.

#### Isolated scope parameters (@, =, &)

Communication between isolated scope and outside world

If `scope` property of DDO is set to {} (object hash), then a new "isolate" scope is created. The 'isolate' scope differs from normal scope in that it does not prototypically inherit from the parent scope. This is useful when creating reusable components, which should not accidentally read or modify data in the parent scope.

- `@` : bind a local scope property to the value of DOM attribute. The result is always a string since DOM attributes are strings. 

- `=` or `=attr`: set up bi-directional binding between a local scope property and the parent scope property of name defined via the value of the attr attribute.

- `&` or `&attr` - provides a way to execute an expression in the context of the parent scope.

#### link vs controller

Savvy readers may be wondering what the difference is between link and controller. The basic difference is that controller can expose an API, and link functions can interact with controllers using require.

Best Practice: use controller when you want to expose an API to other directives. Otherwise use link.

### Transclusion

Transclusion is the process of extracting a collection of DOM element from one part of the DOM and copying them to another part of the DOM, while maintaining their connection to the original AngularJS scope from where they were taken.

Transclusion is used (often with ngTransclude) to insert the original contents of a directive's element into a specified place in the template of the directive. `The benefit of transclusion, over simply moving the DOM elements manually, is that the transcluded content has access to the properties on the scope from which it was taken, even if the directive has isolated scope`.
This makes it possible for the widget to have private state for its template, while the transcluded content has access to its originating scope.

When `transclude` property is true in DDO,
transclusion function is provided to controller and link function.

This transclusion function is a special linking function that will return the compiled contents linked to a new transclusion scope.

When to use transclusion function?
If you are just using ngTransclude then you don't need to worry about this function, since ngTransclude will deal with it for us.
If you want to manually control the insertion and removal of the transcluded content in your directive then you must use this transclude function. When you call a transclude function it returns a a jqLite/JQuery object that contains the compiled DOM, which is linked to the correct transclusion scope.


### Firing events in angular

`$emit` fires upwards w.r.t scope.
`$broadcast` fires downwards w.r.t scope

```js
// firing an event upwards
$scope.$emit('myCustomEvent', 'Data to send');

// firing an event downwards
$scope.$broadcast('myCustomEvent', {
  someProp: 'Sending you an Object!' // send whatever you want
});

// listen for the event in the relevant $scope
$scope.$on('myCustomEvent', function (event, data) {
  console.log(data); // 'Data to send'
});
```

#### firing events with `$scope`

The key thing to remember when using $scope to fire your events, is that they will communicate only with descendant parent or child scopes only! Scopes aren’t always child and parent. We might have sibling scopes. Using $scope to fire an event will miss out sibling scopes, and just carry on up! 

#### rootScope broadcast and rootScope emit

The $rootScope Object has the identical $emit, $broadcast, $on methods, but they work slightly differently to how $scope implements them. 

As $rootScope has no $parent, using an $emit would be pointless, right? Nope, instead, `$rootScope.$emit` will fire an event for all `$rootScope.$on` listeners only. The interesting part is that `$rootScope.$broadcast` will notify all `$rootScope.$on` as well as `$scope.$on` listeners, subtle but very important difference if you want to avoid issues in your application.

#### Unsubscribing on destroy

```js
app.controller('ParentCtrl',
  function ParentCtrl ($scope) {

  // $rootScope $on
  var myListener = $rootScope.$on('child', function (event, data) {
    //
  });

  // $scope $destroy
  $scope.$on('$destroy', myListener);

});
```

### AngularJS Controller As syntax

Pre v1.2 controllers
```js
// <div ng-controller="MainCtrl"></div>
app.controller('MainCtrl', function ($scope) {
  $scope.title = 'Some title';
});
```

New way: (Also known as namespacing stuff)
We use controller as varname with `this` in controller constructor function.

```html
<div ng-controller="MainCtrl as main">
  // MainCtrl doesn't exist, we get the `main` instance only
  {{main.title}}
</div>
```
```js
// we declare as usual, just using the `this` Object instead of `$scope`
app.controller('MainCtrl', function () {
  this.title = 'Some title';
});
```



### AngularJS components

Easier form/standardization for specifying directives.
Isolate scoped by default.
1. using `this` for model. ditching `$scope` variable name
2. using `$ctrl` for controller scope.
3. Can be only used as html elements.
4. components do not have link functions, they have lifecycle hooks.

#### Defining a component
Note the definition takes an object  and not a function.

```js
myModule.component('myComponent', {
  template: "...",
  bindings: { /* ... */ },
  controller: function(){ /* ... */ },
});
```
