
## Provides a way to create runtime builds

JS updates can be loaded on top of runtime builds using any source location.

Core of this UX is `expo-dev-launcher`.
It listens to activity onCreate and launches a dev activity.

## DevLauncherReactActivityNOPDelegate

A class that extends `ReactActivityDelegate`, but does not forward anything to `ReactDelegate`. i.e. empty no-op implementation.

```kt
open class DevLauncherReactActivityNOPDelegate(activity: ReactActivity) :
  ReactActivityDelegate(activity, null) {

  override fun onCreate(savedInstanceState: Bundle?) {}
  override fun onResume() {}
  override fun onPause() {}
  override fun onDestroy() {}
  override fun onNewIntent(intent: Intent?): Boolean = true
  override fun onBackPressed(): Boolean = true
  override fun onWindowFocusChanged(hasFocus: Boolean) {}
  override fun onRequestPermissionsResult(requestCode: Int, permissions: Array<out String>?, grantResults: IntArray?) {}
  override fun onConfigurationChanged(newConfig: Configuration?) {}
}
```