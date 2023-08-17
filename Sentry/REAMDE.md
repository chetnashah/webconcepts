

## Configuraiton checklist

1. DSN configured on client
2. project made on sentry.io
3. sentry init done for your env with right DSN.
4. sentry-cli uploads sourcemaps
5. sentry release to be done from cli
6. sentry-cli does upload debug symbols (dsym/progaurd) for android/ios.
7. Verify uploaded sourcemaps, releases and uploaded dif files using sentry dashboard UI.
8. If you are using `sentry-cli` in your CI/build-scripts, make sure `SENTRY_PROPERTIES` points to a file with correct config to use.

