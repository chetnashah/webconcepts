
Will mostly run in node environment on laptop

Require implementation present in 
`metro/src/lib/polyfills/require.js`:

guardedLoadModule -> loadModuleImplementation


Core types:

1. ModuleID: number


Resolution logic: `metro-resolver` package - `resolve.js`
Takes care of diff stuff like platform specific file/module resolution etc.

```
type Resolution = FileResolution | {|type: 'empty'|}
type FileResolution = 
    | {|type: 'sourceFile', filePath: String|}
    | {|type: 'assetFiles', filePaths: AssetFileResolution|}
```

### metro/src/node-haste module system used by metro

```
type Package = {
    path: String;
    _root: String;
    _content: ?PackageContent
}
type PackageContent {
    name: string;
    'react-native': mixed;
    browser: mixed,
    main: ?string
}
class Module {
    path: string,
    _moduleCache: ModuleCache,
    _sourceCode: ?string
}
class ModuleCacheMap {
    _moduleCache: {
        [filePath: string]: Module
    },
    _packageCache: {
        [filePath: string]: Package
    },
    _packageModuleMap: WeakMap<Module, string>
}
```

#### DependencyGraph

originModulePath - path of the first starting root file from where the graph traversal starts. e.g. `index.android.js`

The resolver used here internaly is `metro-resolver` package.
```
//ModuleResolution.js
type ModuleMap = {
    getModule(name, platform) => string,
    getPackage(name, platform) => string
}
// used in the ModuleResolver Constructor
type Options {
    dirExists: DirExistsFn
    doesFIleExist: DoesFileExist,
    extraNodeModules: ?Object,
    isAssetFile: IsAssetFile,
    mainFields: $ReadOnlyArray<string>,
    moduleCache: ModuleishCache<TModule, TPackage>,
    projectRoot: string,
    preferNativePlatform: boolean,
    resolveAsset: ResolveAsset,
    moduleMap: ModuleMap,
    resolveRequest: CustomResolver,
    sourceExts: ReadOnlyArray<string>
}
class ModuleResolver {
    _redirectRequire(fromModule: TModule, modulePath: string) => string | false,
    resolveDependency(fromModule: TModule, moduleName: string, allowHaste, platform) => TModule  {
        // use require('metro-resolver').resolve(.....)
    }
}
```

