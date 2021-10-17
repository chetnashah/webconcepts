
recommended Ways:

1. tag/element - for creating new dom usually
2. attributes - for modification

directive name in JS is in camel case e.g. `userInfoCard`
and its usage in html is `user-info-card`

if you return `template` field from directive factory, it is considered, template expansion.

`replace` field (Deprecated): useful if you have a single root element in your template field, `replace: true` will makde directive replace the tag when directive is used as an attribute.

If we see a binding in a `template` of the directive e.g. `{{ name}}` it is resolved from the nearby scope holder e.g. a controller's scope.

`module.directive` takes the normalized directive name followed by a factory function. 
This factory function should return an object with the different options to tell $compile how the directive should behave when matched.

Have your own app prefix, e.g.`ng` prefix example: `ngIf` is for `<ng-if>`
similarly your app should have your own prefix.


`$interpolate`: takes input a markup with interpolation bindings e.g. `Hi {{ name }}` and returns a function, which when taking context, returns final string i.e. $interpolate's type is `markup => context => finalstring` function
e.g.
```js
var $interpolate = ...; // injected
var context = {greeting: 'Hello', name: undefined };

// default "forgiving" mode
var exp = $interpolate('{{greeting}} {{name}}!');
expect(exp(context)).toEqual('Hello !');
```


`$compile` uses `$interpolate` function above for data binding.

During the compilation process the compiler uses the    `$interpolate` service to see if text nodes and element attributes contain interpolation markup with embedded expressions.

If that is the case, the compiler adds an `interpolateDirective` to the node and registers watches on the computed interpolation function, which will update the corresponding text nodes or attribute values as part of the normal digest cycle.



interpolateDirective has a priority of 100 and sets up the watch in the preLink function

### When to add `controller` to directive?
When a directive needs its own scope/state to be managed e.g. checkbox and other stateful ui widgets, it can declare its own controller.i.e. useful for encapsulation.
controller can be inline function at a field level.

* controller is the right place to manipulate scope, including adding methods on scope, to be used to manipulate scope.
* If you need to change the scope from the link function, call a method of controller.
* since the controller is executed before the link function, you should initialized the scope in the former so the latter can get a valid model to work on
* avoid DOM manipulation in the controller, right place is the link function
* i.e. controller should have no acess to directive or dom, only setup scope & have methods to manipulate scope.

#### What is a directive controller?
It is a simple function that has a dependency injected `$scope` to manage. the scope might be parent ng-controller's created (shared) scope or directive level (isolate or inherited) scope(encapsulation) depending on html/declaration.
Controller supposed to only work with scope, it does not have access to directive or the dom.

### scope seen by directive
scope seen by directive can be the nearest ng-controller's scope, if nothing explicit is defined in directive. 

Each scope has a unique `id`.

angularjs will not allow two isolated scopes on same element via multiple attr directives.
two inherited scopes allowed by attr directives but that will be a same reference to scope

component directiives should prefer isolate scope
decorator directives should prefer shared/inherited scope

Scope inheritance in angularjs use protoLink i.e. `__proto__`, and can also be followed via `$parent`.

#### $scope
Scope is the glue between application controller and the view. During the template `linking phase the directives set up $watch expressions on the scope`. 
The `$watch allows the directives to be notified of property changes, which allows the directive to render the updated value to the DOM`.

**Both controllers and directives have reference to the scope, but not to each other**. 
This arrangement isolates the controller from the directive as well as from the DOM. 
This is an important point since it makes the controllers view agnostic, which greatly improves the testing story of the applications.

#### Isolate scope

1. bring simple value in to isolate scope:
```js
    scope: {
        user: '=person'
    },
    controller: function($scope){
        $scope.printMe = function() {
            console.log($scope.user); // name inside directive can be different then outers interface
        }
    }
```
```html
<my-directive person=sompersonobj>
```

#### $parse vs $interpolate vs $compile

* `$compile` - it can take the whole markup and turn it into a linking function that, when executed against a certain scope will turn a piece of HTML text into dynamic, live DOM with all the directives (here: ng-src) reacting to model changes. One would invoke it as follows: $compile(imgHtml)($scope) and would get a DOM element with all the DOM event bounds as a result. $compile is making use of $interpolate (among other things) to do its job.
* `$interpolate` knows how to process a string with embedded interpolation expressions, ex.: `/path/{{name}}.{{extension}}`. In other words it can take a string with interpolation expressions, a scope and turn it into the resulting text. One can think of the $interpolation service as a very simple, string-based template language. Given the above example one would use this service like: `$interpolate("/path/{{name}}.{{extension}}")($scope)` to get the `path/image.jpg` string as a result.
* `$parse` is used by $interpolate to evaluate individual/single expressions `name, extension` against a scope. It can be used to both read and set values for a given expression. For example, to evaluate the name expression one would do: `$parse('name')($scope)` to get the "image" value. To set the value one would do: `$parse('name').assign($scope, 'image2')`
All those services are working together to provide a live UI in AngularJS. But they operate on different levels:

`$parse` is concerned with **individual expressions only** `(name, extension)`. It is a read-write service.
`$interpolate` is read only and is concerned with strings containing **multiple expressions** `(/path/{{name}}.{{extension}})`
$compile is at the heart of AngularJS machinery and can turn HTML strings (with directives and interpolation expressions) into live DOM.


#### What is transclusion and when do I need it?

You can think of this pattern as similar to managing `this.props.children` equivalent in React.

Consider a directive called myDirective in an element, and that element is enclosing some other content, let's say:

```html
<div my-directive>
    <button>some button</button>
    <a href="#">and a link</a>
</div>
```
If myDirective is using a template, you'll see that the content of <div my-directive> will be replaced by your directive template. So having:
```js
app.directive('myDirective', function(){
    return{
        template: '<div class="something"> This is my directive content</div>'
    }
});
```
will result in this render:
```html
<div class="something"> This is my directive content</div> 
```
Notice that the content of your original element `<div my-directive>` will be lost (or better said, replaced). So, say good-bye to these buddies:
```html
<button>some button</button>
<a href="#">and a link</a>
```
So, what if you want to keep your `<button>...` and `<a href>...` in the DOM? You'll need something called transclusion. The concept is pretty simple: Include the content from one place into another. So now your directive will look something like this:
```js
app.directive('myDirective', function(){
    return{
        transclude: true,// notice this directive gets priority
        // and it is directive's decision on whether to replace or transclude
        template: '<div class="something"> This is my directive content <div class="something" ng-transclude></div></div>'

    }
});
```
This would render:
```html
<div class="something"> This is my directive content
    <button>some button</button>
    <a href="#">and a link</a>
</div>
``` 
In conclusion, you basically use transclude when you want to preserve the contents of an element when you're using a directive.

`ng-transclude` attribute tells where the included/transcluded content will go.

**Note: directive has the control on whether or not to include original content**

### AngularJS expressions vs JS expressions
AngularJS expressions are JavaScript-like code snippets that are mainly placed in interpolation bindings such as `<span title="{{ attrBinding }}">{{ textBinding }}</span>`, but also used directly in directive attributes such as `ng-click="functionExpression()"`. you can get more info on context/scope of expression of evaluation by seeing `{{ this }}`.


### structural directives

Some examples are `ng-if`, `ng-repeat`, `ng-switch` directive.
Structural directives are made using `transclude function`, in cases where
you have dynamic transclusion, instead of simple transclusion.

Usually appear as attribute directives.

Full params of link function are: `scope, el, attrs, controller, transcludeFn`.
i.e SEACT.
controller stands for the `required` controller.


### decorator directives

Usually in attribute form e.g. `ng-app`, `ng-controller`, `ng-click`(all event handling directives are decorator directives, e.g. `ng-model`), `ng-show`, `ng-hide` as well.

Dom is modified using link function, which gets four params:
1. scope
2. iElement - instance element
3. iAttrs - instance attributes
4. controller

`event pause` pause handler directive
```js
angular.module('plunker').directive('eventPause', function(){
  return {
    restrict: 'A',
    scope: {// bad practice for non-element directives i.e. attr based directives
            // because two attrs directives with isolate scope clash & break directive
      eventPause: '&'
    },
    link: function(scope, el, attrs) {// use attrs instead of isolate scope
      const videoEl = el[0];
      videoEl.addEventListener('pause', event=> {
        console.log('video pause event fired');
        // all dom listeners modifying or interacting
        // with scope, should involve digest.
        scope.$apply(function(){
          scope.eventPause();
        });
      })
    }
  }
})
```
```html
      <video spacebar-support event-pause="handlePause()" id="vid" controls preload="none">
        <source src="http://media.w3.org/2010/05/sintel/trailer.mp4" type="video/mp4"></source>
      </video>
``` 

#### Proper way for attrs directive expresion parsing to avoid scope conflicts
Correct way for expression handling of attr directives:
```js
angular.module('plunker').directive('eventPlay', function($parse){
  return {
    restrict: 'A',
    link: function(scope, el, attrs) {
      const fn = $parse(attrs['eventPlay']);
      const videoEl = el[0];
      videoEl.addEventListener('play', event=> {
        console.log('video play event fired');
        // all dom listeners modifying or interacting
        // with scope, should involve digest.
        scope.$apply(function(){
          fn(scope,{extra: 'args'});
        });
      })
    }
  }
})
```
```html
      <video spacebar-support event-play="handlePlay()" id="vid" controls preload="none">
        <source src="http://media.w3.org/2010/05/sintel/trailer.mp4" type="video/mp4"></source>
      </video>
``` 

#### ng-click clone

```html
<!DOCTYPE html>
<!-- index.html -->
<html>
  <head>
    <link rel="stylesheet" href="lib/style.css" />
    <script src="lib/script.js"></script>
  </head>

  <body ng-app="plunker" ng-cloak>
    <div ng-controller="MainCtrl">
      <h1>Hello {{name}}</h1>
      <p>Start editing and see your changes reflected here!</p>
      <button my-click="outsideHandler(evt)">click me</button>
    </div>
  </body>
</html>
```
```js
// script.js
import angular from 'angular';

angular.module('plunker', []).controller('MainCtrl', function($scope) {
  $scope.name = 'Plunker';
  $scope.outsideHandler = function(evt) {
    console.log('outside click handler: ', evt);
  }
});

angular.module('plunker').directive('myClick', function($parse) {
  return {
    restrict: 'A',
    link: function(scope, el, attrs) {
      const realEl = el[0];
      const fn = $parse(attrs['myClick']);
      realEl.addEventListener('click', evt => {
        scope.$apply(function(){
          fn(scope, {evt: evt});
        });
      })
    }
  }
})
```

#### Watching attribute values given by directive html

Use `scope.$watch(attrs['attrName'], (newVal, oldVal) => {/*  */})`, which
can be setup in a link function.

#### expression evaluation
AngularJS does not use JavaScript's `eval()` to evaluate expressions. Instead AngularJS's `$parse` service processes these expressions.

It is possible to access the context object using the identifier this and the locals object using the identifier $locals.




* AngularJS expressions are like JavaScript expressions with the following differences:

* Context: JavaScript expressions are evaluated against the global window. In AngularJS, expressions are evaluated against a scope object.

* Forgiving: In JavaScript, trying to evaluate undefined properties generates ReferenceError or TypeError. In AngularJS, expression evaluation is forgiving to undefined and null.

* Filters: You can use filters within expressions to format data before displaying it.

* No Control Flow Statements: You cannot use the following in an AngularJS expression: conditionals, loops, or exceptions.

* No Function Declarations: You cannot declare functions in an AngularJS expression, even inside ng-init directive.

* No RegExp Creation With Literal Notation: You cannot create regular expressions in an AngularJS expression. An exception to this rule is ng-pattern which accepts valid RegExp.

* No Object Creation With New Operator: You cannot use new operator in an AngularJS expression.

* No Bitwise, Comma, And Void Operators: You cannot use Bitwise, , or void operators in an AngularJS expression.

https://gist.github.com/CMCDragonkai/6282750


### difference between link and controller

what the difference is between link and controller. The basic difference is that controller can expose an API, and link functions can interact with controllers using require.

Best Practice: use controller when you want to expose an API to other directives. Otherwise use link.

Link can have two parts: pre-link and post-link function.
Post-link function is equivalent to `componentDidMount` of reactjs.
Also post-link function of children runs before parent's post-link function.
### $observe

`$observe()` is a method on the Attributes object, and as such, it can only be used to observe/watch the value change of a DOM attribute. It is only used/called inside directives. Use $observe when you need to observe/watch a DOM attribute that contains interpolation (i.e., `{{}}`'s).
E.g., `attr1="Name: {{name}}"`, then in a directive: attrs.`$observe('attr1', ...)`.
(If you try `scope.$watch(attrs.attr1, ...)` it won't work because of the `{{}}`s -- you'll get `undefined`.)

### $parse

https://docs.angularjs.org/api/ng/service/$parse
converts string to function

### $event

Directives like `ngClick` and `ngFocus` expose a `$event` object within the scope of that expression. The object is an instance of a jQuery Event Object when jQuery is present or a similar jqLite object.

### One time binding

An expression that starts with `::` is considered a `one-time expression`. One-time expressions will stop recalculating once they are stable, which happens after the first digest if the expression result is a non-undefined value (see value stabilization algorithm below).


