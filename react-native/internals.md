

`shims` and `Libraries/Renderers/implementations` folder contains `ReactNativeRender-dev.fb.js` and `ReactNativeRender-prod.fb.js` etc which are use as core Renderer.
and other files which are actually bundled from official `react` repo in 
`packages/react-native-renderer`

API exposed by `react-native-renderer`:
1. findNodeHandle
2. render
3. dispatchCommand
4. unmountComponentAtNode
5. unstable_batchedUpdates



### Threading model

JS thread runs on a MessageQueueThread started by native.

CatalystInstance is started and
JSCExecutor is JS event loop.

