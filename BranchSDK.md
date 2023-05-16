
## Core idea

Single link , multiple destinations.
Used to manage deep links.
Also supports deferred deeplinking.

## Android internals

Core `Branch` class is a singleton

### Init on process init

Done on app oncreate to init the branch singleton.

### Session init

session init typically happens when application comes to foreground.

### ServerRequestQueue is a singleton

All add/remove calls are synchronized by a lockobject.

