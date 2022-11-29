
## SingletonModule

```java
public interface SingletonModule {
  String getName();
}
```

## RegistryLifecycleListener

```java
public interface RegistryLifecycleListener {

  default void onCreate(ModuleRegistry moduleRegistry) {
    // do nothing
  }

  default void onDestroy() {
    // do nothing
  }

}
```

## JavascriptContextProvider

```java
public interface JavaScriptContextProvider {
  long getJavaScriptContextRef();

  CallInvokerHolderImpl getJSCallInvokerHolder();
}
```

## ApplicationLifecycleListener

```java

public interface ApplicationLifecycleListener {
  default void onCreate(Application application) {}

  default void onConfigurationChanged(Configuration newConfig) {}
}

```


## LifecycleEventListener

```java
public interface LifecycleEventListener {
  void onHostResume();
  void onHostPause();
  void onHostDestroy();
}
```

## Package

```java
public interface Package {

  default List<? extends InternalModule> createInternalModules(Context context) {
    return Collections.emptyList();
  }

  default List<? extends ExportedModule> createExportedModules(Context context) {
    return Collections.emptyList();
  }

  /**
   * @param context A context which you can use when initializing view managers,
   *                however remember NOT TO KEEP REFERENCES TO IT. View managers
   *                are reused between refreshes of the application, so keeping
   *                reference to the context in view managers makes it leak.
   */
  default List<? extends ViewManager> createViewManagers(Context context) {
    return Collections.emptyList();
  }

  default List<? extends expo.modules.core.interfaces.SingletonModule> createSingletonModules(Context context) {
    return Collections.emptyList();
  }

  default List<? extends ApplicationLifecycleListener> createApplicationLifecycleListeners(Context context) {
    return Collections.emptyList();
  }

  default List<? extends ReactNativeHostHandler> createReactNativeHostHandlers(Context context) {
    return Collections.emptyList();
  }

  default List<? extends ReactActivityLifecycleListener> createReactActivityLifecycleListeners(Context activityContext) {
    return Collections.emptyList();
  }

  default List<? extends ReactActivityHandler> createReactActivityHandlers(Context activityContext) {
    return Collections.emptyList();
  }
}
```

## ReactActivityHandler

```java

/**
 * A handler API for modules to override default ReactActivityDelegate behaviors.
 * Used by {@link ReactActivityDelegateWrapper}
 */
public interface ReactActivityHandler {
  /**
   * Given modules a chance to override the default {@link ReactRootView}
   * @return the override ReactRootView instance or null if not to override
   */
  @Nullable
  default ReactRootView createReactRootView(Activity activity) {
    return null;
  }

  /**
   * Gives modules a chance to create a ViewGroup that is used as a container for the ReactRootView,
   * which is added as a child to the container if non-null.
   * @return a ViewGroup to be used as a container, or null if no container is needed
   */
  @Nullable
  default ViewGroup createReactRootViewContainer(Activity activity) {
    return null;
  }

  /**
   * Gives modules a chance to respond to `onKeyUp` events. Every listener will receive this
   * callback, but the delegate will not receive the event unless if any of the listeners consume it
   * (i.e. return `true` from this method).
   * `ReactActivityDelegateWrapper.onKeyUp` will return `true` if any module returns `true`.
   *
   * @return true if this module wants to return `true` from `ReactActivityDelegateWrapper.onKeyUp`
   */
  default boolean onKeyUp(int keyCode, KeyEvent event) {
    return false;
  }

  /**
   * Gives modules a chance to override the wrapped ReactActivityDelegate instance.
   * @return a new ReactActivityDelegate instance, or null if not to override
   */
  @Nullable
  default ReactActivityDelegate onDidCreateReactActivityDelegate(ReactActivity activity, ReactActivityDelegate delegate) {
    return null;
  }
}
```


## ReactActivityLifecycleListener

```java
public interface ReactActivityLifecycleListener {
  default void onCreate(Activity activity, Bundle savedInstanceState) {}

  default void onResume(Activity activity) {}

  default void onPause(Activity activity) {}

  default void onDestroy(Activity activity) {}

  /**
   * Called when {@link com.facebook.react.ReactActivity} received `onNewIntent`
   * Every listener will receive this callback.
   * `ReactActivityDelegateWrapper.onNewIntent` will get `true` if there's some module returns `true`
   *
   * @return true if this module wants to return `true` from `ReactActivityDelegateWrapper.onNewIntent`
   */
  default boolean onNewIntent(Intent intent) {
    return false;
  }

  /**
   * Called when {@link com.facebook.react.ReactActivity} received `onBackPressed`
   * Every listener will receive this callback.
   * `ReactActivityDelegateWrapper.onBackPressed` will get `true` if there's some module returns `true`
   *
   * @return true if this module wants to return `true` from `ReactActivityDelegateWrapper.onBackPressed`
   */
  default boolean onBackPressed() {
    return false;
  }
}
```


## ReactNativeHostHandler

```java

public interface ReactNativeHostHandler {
  /**
   * Given chance for modules to customize {@link ReactInstanceManager}
   *
   * @param useDeveloperSupport true if {@link ReactNativeHost} enabled developer support
   * @return instance of {@link ReactInstanceManager}, or null if not to override
   */
  @Nullable
  default ReactInstanceManager createReactInstanceManager(boolean useDeveloperSupport) {
    return null;
  }

  /**
   * Given chance for modules to override react bundle file.
   * e.g. for expo-updates
   *
   * @param useDeveloperSupport true if {@link ReactNativeHost} enabled developer support
   * @return custom path to bundle file, or null if not to override
   */
  @Nullable
  default String getJSBundleFile(boolean useDeveloperSupport) {
    return null;
  }

  /**
   * Given chance for modules to override react bundle asset name.
   * e.g. for expo-updates
   *
   * @param useDeveloperSupport true if {@link ReactNativeHost} enabled developer support
   * @return custom bundle asset name, or null if not to override
   */
  @Nullable
  default String getBundleAssetName(boolean useDeveloperSupport) {
    return null;
  }

  /**
   * Give modules a chance to override the value for useDeveloperSupport,
   * e.g. for expo-dev-launcher
   *
   * @return value for useDeveloperSupport, or null if not to override
   */
  @Nullable
  default Boolean getUseDeveloperSupport() {
    return null;
  }

  /**
   * Given chance for modules to override react dev support manager factory.
   * e.g. for expo-dev-client
   *
   * Note: we can't specify the type here, because the `DevSupportManagerFactory`
   * doesn't exist in the React Native 0.66 or below.
   *
   * @return custom DevSupportManagerFactory, or null if not to override
   */
  @Nullable
  default Object getDevSupportManagerFactory() { return null; }

  /**
   * Given chance for modules to override the javascript executor factory.
   */
  @Nullable
  default JavaScriptExecutorFactory getJavaScriptExecutorFactory() { return null; }

  //region event listeners

  /**
   * Given chance for JSI modules to register, e.g. for react-native-reanimated
   *
   * @param useDeveloperSupport true if {@link ReactNativeHost} enabled developer support
   */
  default void onRegisterJSIModules(
    ReactApplicationContext reactApplicationContext,
    JavaScriptContextHolder jsContext,
    boolean useDeveloperSupport
  ) {
  }

  /**
   * Callback before {@link ReactInstanceManager} creation
   */
  default void onWillCreateReactInstanceManager(boolean useDeveloperSupport) {}

  /**
   * Callback after {@link ReactInstanceManager} creation
   */
  default void onDidCreateReactInstanceManager(ReactInstanceManager reactInstanceManager, boolean useDeveloperSupport) {}

  //endregion
}
```


## UIManager

```java
public interface UIManager {
  interface UIBlock<T> {
    void resolve(T view);

    void reject(Throwable throwable);
  }

  interface ViewHolder {
    View get(Object key);
  }

  interface GroupUIBlock {
    void execute(ViewHolder viewHolder);
  }

  <T> void addUIBlock(int viewTag, UIBlock<T> block, Class<T> tClass);

  void addUIBlock(GroupUIBlock block);

  void runOnUiQueueThread(Runnable runnable);

  void runOnClientCodeQueueThread(Runnable runnable);

  void runOnNativeModulesQueueThread(Runnable runnable);

  void registerLifecycleEventListener(LifecycleEventListener listener);

  void unregisterLifecycleEventListener(LifecycleEventListener listener);

  void registerActivityEventListener(ActivityEventListener activityEventListener);

  void unregisterActivityEventListener(ActivityEventListener activityEventListener);
}
```

## ACtivityEventListener

```java

public interface ActivityEventListener {
  public void onActivityResult(Activity activity, int requestCode, int resultCode, @Nullable Intent data);

  // Called when a new intent is passed to the activity
  public void onNewIntent(Intent intent);
}
```