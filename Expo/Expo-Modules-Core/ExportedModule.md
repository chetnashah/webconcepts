
`ExportedModule` is an abstract class for modules which export some methods to client code(JS).

Each exported module implements `RegistryLifecycleListener` with following callbacks:
1. `onCreatE(ModuleRegistry moduleRegistry)`
2. `onDestroy()`


Common Expo modules that extend `ExportedModule` are:
1. CameraModule
2. FileSystemModule
3. LocationModule
4. ApplicationModule
5. ImageManipulatorModule
6. ....


