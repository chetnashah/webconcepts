
### Workers

Workers runtime uses the V8 engine.
The Workers runtime also implements many of the standard APIs available in most modern browsers.

Workers functions run on Cloudflare's Edge Network.

#### Isolates

V8 orchestrates `isolates`: lightweight contexts that provide your code with variables it can access and a safe environment to be executed within. You could even consider an isolate a sandbox for your function to run in.

* A single runtime can run hundreds or thousands of isolates, seamlessly switching between them. 

* Each isolate's memory is completely isolated, so each piece of code is protected from other untrusted or user-written code on the runtime

**Instead of creating a virtual machine for each function, an isolate is created within an existing environment. This model eliminates the cold starts of the virtual machine model**

Workers pays the overhead of a JavaScript runtime once on the start of an edge container. Workers processes are able to run essentially limitless scripts with almost no individual overhead by creating an isolate for each Workers function call.

A given `isolate has its own scope`, but isolates are not necessarily long-lived. 

An isolate may be spun down and evicted for a number of reasons:
1. resource limitations on the machine.
2. a suspicious script - anything seen as trying to break out of the Isolate sandbox.
3. individual resource limits.

**Because of this, it is generally advised that you not store mutable state in your global scope unless you have accounted for this contingency.**

#### Compute per request

#### Distritbuted execution


### Workers KV

Key value storage

#### Wrangler cli

Wrangler cli needs to be installed on laptop and needs to be logged in
```sh
wrangler login
# generate project from template
wrangler generate my-app https://github.com/cloudflare/worker-typescript-template
```

Development and deployment
```
wrangler dev
wrangler publish
```

### R2 storage

