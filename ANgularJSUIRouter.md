### State Activation

**When a state is activated, its templates are automatically inserted into the ui-view of its parent state's template.** If it's a top-level state—which `contacts` is because it has no parent state–then its parent template is `index.html`.

#### Ways of activating/navigating a state:
There are three main ways to activate a state:

1. Call `$state.go()`. High-level convenience method.
2. Click a link containing the `ui-sref` directive.
3. `Navigate` to the url associated with the state.

#### Activating/navigation to state with params
Assuming the name of the state is `contacts`,
and the url is specified as `/contacts/:param1`,

1. `<a ui-sref="contacts({param1: value1})">View Contacts</a>` i.e. statename is called as if it were a method.
2. `$state.go('contacts', {param1: value1})`
3. `site.com/contacts/value1` where url was specified as `/contacts/:param1`.


### Parent MUST Exist
If you register only a single state, like `contacts.list`, you MUST define a state called `contacts` at some point, or else no states will be registered. The state `contacts.list` will get queued until `contacts` is defined.

You can register states in any order and across modules. You can register children before the parent state exists. It will queue them up and once the parent state is registered then the child will be registered.


### State naming

No two states can have the same name. Even if the parents are different.
you can't have two different states named `edit` even if they have different parents


### Nested States and Views

When the application is in a particular state—when a state is `active`—all of its ancestor states are implicitly active as well. Below, when the `contacts.list` state is active, the `contacts` state is implicitly active as well, because it's the parent state to `contacts.list`.

### Named views

If you define a `views` object, your state's `templateUrl`, `template` and `templateProvider` will be **ignored**. 

So in the case that you need a parent layout of these views, you can define an abstract state that contains a template, and a child state under the layout state that contains the `views` object. 

i.e. **Views will override state's template properties like `template`, `templateUrl` and `templateProvider`**

The general syntax for namedviews is `viewname@statename`. if `statename` is empty means, views on the root template i.e. `index.html` are bing targeted.

```js
  .state('report',{		
    views: {		
      'filters@': { },		
      'tabledata@': { },		
      'graph@': { }		
    }		
  })
```

Notice that the view names are now specified as absolute names, as opposed to the relative name. It is targeting the `filters`, `tabledata`, and `graph` views located in the root unnamed template. Since it's unnamed, there is nothing following the `@`. The root unnamed template is your `index.html`.

### Abstract State

An abstract state can have child states but cannot get activated itself. An 'abstract' state is simply a state that can't be transitioned to. It is activated implicitly when one of its descendants are activated.



