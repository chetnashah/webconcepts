

## ReactActivityHandler

An API to override default ReactActivityDelegate behaviors.

`onDidCreateReactActivityDelegate` -> returned activityDelegate will override the current activityDelegate. This logic is in `expo.modules.ReactActivityDelegateWrapper.kt`.

```java
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