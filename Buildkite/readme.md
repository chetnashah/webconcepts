
## Starting buildkite agent on mac
```
brew services start buildkite/buildkite/buildkite-agent
```
or 
```
buildkite-agent start
```

## All steps are parellel by default

Can only be sequential if explicitly or implicitly specified via `wait` or `depends_on` or `block` step types.

## Token needs to be replaced in config file

```
sed -i '' "s/xxx/my-token-value-abadkfadfjl/g" "$(brew --prefix)"/etc/buildkite-agent/buildkite-agent.cfg
```

## Installed via brew

Configuration file (to configure agent token, meta-data, priority, name, etc):
    /opt/homebrew/etc/buildkite-agent/buildkite-agent.cfg

Hooks directory (for customising the agent):
    /opt/homebrew/etc/buildkite-agent/hooks

Builds directory:
    /opt/homebrew/var/buildkite-agent/builds

Log paths:
    /opt/homebrew/var/log/buildkite-agent.log
    /opt/homebrew/var/log/buildkite-agent.error.log


## Sleep prevention using caffeniete

To prevent your machine from sleeping or logging out, use `caffeinate`. For
example, running `caffeinate -i buildkite-agent start` runs buildkite-agent
and prevents the system from idling until it exits..

## Running multiple agents

To run multiple agents simply run the buildkite-agent start command
multiple times, or duplicate the LaunchAgent plist to create another
that starts on login.

## Add code coverage 

```groovy
plugins {
    jacoco
}

// hooking into test task
tasks.named("test") {
    finalizedBy(tasks.named("jacocoTestReport"))
}
```

You can do test coverage verification using `JacocoCoverageVerification` type task.

## test task usually runs after i.e. depends on compile task

## check task usually runs after i.e. depends on test
