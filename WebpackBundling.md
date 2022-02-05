

### Bundling process

Credits: indepth.dev

https://excalidraw.com/#json=4517412917477376,mF3yLd-gYuRzCzWZ11fo7Q

### A module according to webpack

Conceptually, a module in webpack is associated with a file. So, in the diagram 'a.js' will result in a new module and so will 'b.js' . For now, it is enough to retain that a module is an upgraded version of a file. 
**A module, once created and built, contains a lot of meaningful information besides the raw source code, such as: the loaders used, its dependencies, its exports(if any), its hash and much more**.

```js
// webpack.config.js
entry: {
	a: './a.js',
	b: './b.js',
	/* ... */
}
```

each item of the `entry` object will result in a tree of modules(all these trees are separated from each other).

Extensibility in webpack is implemented through `hooks`. hooks are grouped under their purpose, and for any well defined purpose there is a `plugin`.

the `EntryPlugin` starts the creation of a module tree, 
each of which will add information to the same single place, the ModuleGraph.

`EntryDependency`: The `EntryDependency` is in fact a type of `ModuleDependency`, meaning that it will for sure hold the module's `request` and the module factory it points to is `NormalModuleFactory`

`NormalModuleFactory`: the `NormalModuleFactory` knows exactly what to do in order to create something meaningful to webpack from just a path.

Details (credits indepth.dev): https://excalidraw.com/#json=4907940771266560,zqDQZYTbwHupJqyFprykWA

For the rest of the modules, there are other types of dependencies. 
For example, if you use an `import` statement, like `import defaultFn from './a.js'` , then there will be a `HarmonyImportSideEffectDependency` which holds the module's request(in this case, `'./a.js'`) and also maps to the `NormalModuleFactory`

`ModuleGraphModule`: It's important to clarify the distinction between a simple module(i.e a `NormalModule` instance) and a module that belongs to the `ModuleGraph`. A `ModuleGraph`'s node is called `ModuleGraphModule` and it is just a decorated `NormalModule` instance.
The `ModuleGraph` keeps track of these decorated modules with the help of a map, which has this signature: `Map<Module, ModuleGraphModule>`

`Connection`: A connection is another small entity of the ModuleGraph and it holds meaningful information such as: the origin module, the destination module and the dependency that connects the 2 beforementioned modules. 
And the above connection will be added to `A.outgoingConnections` set and to `B.incomingConnections` set.

```js
// a.js
import defaultBFn from '.b.js/';

// b.js
export default function () { console.log('Hello from B!'); }

// This is based on the diagram and the snippet from above.
Connection: {
	originModule: A,
	destinationModule: B,
	dependency: ImportDependency
}
```




