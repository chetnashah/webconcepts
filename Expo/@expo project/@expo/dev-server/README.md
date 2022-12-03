

## Has a `@expo/dev-server` project

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

