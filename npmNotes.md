
### What to publish?

#### Using npmignore file
Lists glob patterns of files and folders that shouldn’t be published, like .gitignore (and .gitignore will be used by npm if there’s no .npmignore).



### Scopes

Scopes begin with @ and end with slash(/).
It is a namespace for the package that is followed after slash e.g. `@scope/package`.

As an individual user, the scope is the username.

**Private Modules have to be scoped.**

But scoped modules don't have to be private. They can be public also.

When you publish a scoped package for the first time, it will assume that you want this package to be private.

The package name in package.json should also have the scope. And same for consuming package using require.

A good example for an ecosystem of scoped packages is definitelytyped where all packages are scoped.
e.g. `@types/express`

### npm require resolution

On a package level, npm resolves to a file as below:

1. Look up package.json of the package.
2. Get the contents of the main field. If 3. it doesn’t exist, default to /index.js.
Resolve to the main file.

### Package management

Often projects contain more files than are required to execute them. To keep package downloads fast, you can exclude files related to documentation and testing as those can be reached through the package site.

### package.json fields

  /* Files to include to npm distribution. */
  /* Relative patterns like "./src" fail! */
  "files": ["dist/"]

  If a package.json has both "main" and "module" fields, files in the package will be loaded as CommonJS unless they are enumerated in the "module" field in which case they will be loaded as ES Modules, this may also include directories.



### script commands and shortcuts
Certain scripts, such as start and test, have shortcuts in npm. Examples:

npm t or npm test maps to npm run test.
npm start maps to npm run start.

npm supports the "scripts" property of the package.json file, for the following scripts:

* prepublish: Run BEFORE the package is packed and published, as well as on local npm install without any arguments. (See below)
* prepare: Run both BEFORE the package is packed and published, and on local npm install without any arguments (See below). This is run AFTER prepublish, but BEFORE prepublishOnly.
* prepublishOnly: Run BEFORE the package is prepared and packed, ONLY on npm publish. (See below.)
* prepack: run BEFORE a tarball is packed (on npm pack, npm publish, and when installing git dependencies)
* postpack: Run AFTER the tarball has been generated and moved to its final destination.
* publish, postpublish: Run AFTER the package is published.
* preinstall: Run BEFORE the package is installed
* install, postinstall: Run AFTER the package is installed.
* preuninstall, uninstall: Run BEFORE the package is uninstalled.
* postuninstall: Run AFTER the package is uninstalled.
* preversion: Run BEFORE bumping the package version.
* version: Run AFTER bumping the package version, but BEFORE commit.
* postversion: Run AFTER bumping the package version, and AFTER commit.
* pretest, test, posttest: Run by the npm test command.
* prestop, stop, poststop: Run by the npm stop command.
* prestart, start, poststart: Run by the npm start command.
* prerestart, restart, postrestart: Run by the npm restart command. Note: npm restart will run the stop and start scripts if no restart script is provided.
* preshrinkwrap, shrinkwrap, postshrinkwrap: Run by the npm shrinkwrap command.

Additionally, arbitrary scripts can be executed by running npm run-script <stage>. Pre and post commands with matching names will be run for those as well (e.g. premyscript, myscript, postmyscript).
