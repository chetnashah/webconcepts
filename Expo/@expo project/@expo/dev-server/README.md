

## Has a `@expo/dev-server` project

Package moved from `expo-cli` project to `@expo/expo`.

* This will be used if we pass **--dev-client** to `expo start`.
* This will be used if SDK version is greater than 39.

### Can run Metro server

Has a `MetroDevServer.ts`, which can start metro server via:
```ts
function runMetroDevServerAsync{
    // ...
    Metro.runServer(metroConfig, {
        hmrEnabled: true,
        websocketEndpoints,
    });
    // ...
}
```

### Can also bundle

Within `MetroDevServer.ts`, running `bundleAsync` will invoke:
```ts
    const { code, map } = await metroServer.build(bundleOptions);
```

