
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
* avoid DOM manipulation in the controller
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




### AngularJS expressions vs JS expressions
AngularJS expressions are JavaScript-like code snippets that are mainly placed in interpolation bindings such as `<span title="{{ attrBinding }}">{{ textBinding }}</span>`, but also used directly in directive attributes such as `ng-click="functionExpression()"`. you can get more info on context/scope of expression of evaluation by seeing `{{ this }}`.

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


