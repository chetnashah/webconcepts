

### One has to write two plugins

One on the native/remote device (FlipperClient)

One on the desktop/electron Flipper app.

### FlipperObject

Works similar to a JSON dictionary and has limited set 
of supported types like strings, integers and arrays.
It is serializable so can be sent to desktop

### FlipperPlugin Interface

On android, make a class that implements `FlipperPlugin` Interface.

`getId() -> String, onConnect(flipperConn), onDisconnect(), runInBackGround() -> Boolean` are the main methods.

`getId` should be same as the package-name of the js plugin we are going to write for the desktop.

`newRow` sends a message to Desktop side.

### Registering Plugin and starting Client

```kt
var flipperClient = AndroidFlipperClient.getInstance(this);
flipperClient.addPlugin(SeaMammalFlipperPlugin())
flipperClient.start();
```

### JS/Desktop side plugin

