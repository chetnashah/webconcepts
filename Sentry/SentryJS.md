
### Hub

Hub is a central point that SDKs use to route an event to Sentry.
When `init()` is called, a a client and a blank scope are created in it.

A Hub is associated with current thread and will internally hold a stack
of scopes.


### Scope

A scope contains useful info that should be sent along with event (Also known as tags and contexts),
e.g. `contexts` or `breadcrumbs` are stored in scope.

When a scope is pushed, it inherits all data from parent scope,
and when pops, all modifications are reverted.
default SDK create and destroy scopes intelligently e.g. around routes and controllers.

### Client
It is the entity that builds events by applying scope and forwards it to transport.

### Tags

Tags are k/v pairs that are indexable and searchable. 
Useful for knowing distribution etc.

### Context

Custom context allow you to attach arbitrary data(strings, lists, dictionaries) to an event.

Typically you would want user info and environment atleast.

Device context: device info
OS Context: OS info
Runtime context
App Context: Things like app-id, app-name, app-version