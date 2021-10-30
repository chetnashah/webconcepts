
```ts
interface Ident { // e.g @types/node
  /**
   * Unique hash of a package scope and name. Used as key in various places,
   * so that two idents can be quickly compared.
   */
  identHash: IdentHash,

  /**
   * Scope of the package, without the `@` prefix (eg. `types`).
   */
  scope: string | null,

  /**
   * Name of the package (eg. `node`).
   */
  name: string,
}


/**
 * Unique hash of a package descriptor. Used as key in various places so that
 * two descriptors can be quickly compared.
 */
export type DescriptorHash = string & { __descriptorHash: string };
/**
 * Descriptors are just like idents (including their `identHash`), except that
 * they also contain a range and an additional comparator hash.
 *
 * Use `parseRange` to turn a descriptor string into this data structure,
 * `makeDescriptor` to create a new one from an ident and a range, or
 * `stringifyDescriptor` to generate a string representation of it.
 */
export interface Descriptor extends Ident { // @types/node^1.0.1
  /**
   * Unique hash of a package descriptor. Used as key in various places, so
   * that two descriptors can be quickly compared.
   */
  descriptorHash: DescriptorHash,

  /**
   * The range associated with this descriptor. (eg. `^1.0.0`)
   */
  range: string,
}




/**
 * Unique hash of a package locator. Used as key in various places so that
 * two locators can be quickly compared.
 */
export type LocatorHash = string & { __locatorHash: string };

// locators can only reference a single package.
export interface Locator extends Ident {
  /**
   * Unique hash of a package locator. Used as key in various places so that
   * two locators can be quickly compared.
   */
  locatorHash: LocatorHash,

  /**
   * A package reference uniquely identifies a package (eg. `1.2.3`).
   */
  reference: string,
}

```

### package

```ts
/**
 * This data structure is a valid locator (so a reference to a unique package)
 * that went through the resolution pipeline in order to extract all the extra
 * metadata stored on the registry. It's typically what you can find stored
 * inside the lockfile.
 */
export interface Package extends Locator {
  /**
   * The version of the package, if available.
   */
  version: string | null,

  /**
   * The "language" of the package (eg. `node`), for use with multi-linkers.
   * Currently experimental; will probably be renamed before stable release.
   */
  languageName: string,

  /**
   * Describes the type of the file system link for a package.
   */
  linkType: LinkType,

  /**
   * A set of constraints indicating whether the package supports the host
   * environment.
   */
  conditions: string | null,

  /**
   * A map of the package's dependencies. There's no distinction between prod
   * dependencies and dev dependencies, because those have already been merged
   * together during the resolution process.
   */
  dependencies: Map<IdentHash, Descriptor>,

  /**
   * A map of the package's peer dependencies.
   */
  peerDependencies: Map<IdentHash, Descriptor>,

  /**
   * Map with additional information about direct dependencies.
   */
  dependenciesMeta: Map<string, Map<string | null, DependencyMeta>>,

  /**
   * Map with additional information about peer dependencies.
   *
   * The keys are stringified idents, for example: `@scope/name`
   */
  peerDependenciesMeta: Map<string, PeerDependencyMeta>,

  /**
   * All `bin` entries  defined by the package
   *
   * While we don't need the binaries during the resolution, keeping them
   * within the lockfile is critical to make `yarn run` fast (otherwise we
   * need to inspect the zip content of every dependency to figure out which
   * binaries they export, which is too slow for a command that might be
   * called at every keystroke)
   */
  bin: Map<string, PortablePath>,
}
```

### InstallOptions

```ts
export type InstallOptions = {
  /**
   * Instance of the cache that the project will use when packages have to be
   * fetched. Some fetches may occur even during the resolution, for example
   * when resolving git packages.
   */
  cache: Cache,

  /**
   * An optional override for the default fetching pipeline. This is for
   * overrides only - if you need to _add_ resolvers, prefer adding them
   * through regular plugins instead.
   */
  fetcher?: Fetcher,

  /**
   * An optional override for the default resolution pipeline. This is for
   * overrides only - if you need to _add_ resolvers, prefer adding them
   * through regular plugins instead.
   */
  resolver?: Resolver

  /**
   * Provide a report instance that'll be use to store the information emitted
   * during the install process.
   */
  report: Report,

  /**
   * If true, Yarn will check that the lockfile won't change after the
   * resolution step. Additionally, after the link step, Yarn will retrieve
   * the list of files in `immutablePatterns` and check that they didn't get
   * modified either.
   */
  immutable?: boolean,

  /**
   * If true, Yarn will exclusively use the lockfile metadata. Setting this
   * flag will cause it to ignore any change in the manifests, and to abort
   * if any dependency isn't present in the lockfile.
   */
  lockfileOnly?: boolean,

  /**
   * Changes which artifacts are generated during the install. Check the
   * enumeration documentation for details.
   */
  mode?: InstallMode,

  /**
   * If true (the default), Yarn will update the workspace manifests once the
   * install has completed.
   */
  persistProject?: boolean,

  /**
   * @deprecated Use `mode=skip-build`
   */
  skipBuild?: never,
};
```


### Resolver

Resolvers are the components that do all the lifting needed in order to
produce a lockfile. In clear, they transfom the following: `webpack@^4.0.0`
into this: `webpack@4.28.0 | dependencies: ajv@^6.1.0, ajv-keyword@^3.1.0, ...`
