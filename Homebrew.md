Where is stuff stored?

`/usr/local/Cellar`.
or `/opt/homebrew/Cellar`.

The correct prefix can be found using: `brew config`

Get info of a package

`brew info pkgname`

### Formula

A `formula` is package definition that is written in ruby.
e.g. path is `/usr/local/homebrew/Library/Taps/homebrew/homebrew-core/Formula/foo.rb`

### Bottle

In cases, we have pre-compiled binary (instead of building from source) for any package, we refer to it as bottle, and it is stored in registry e.g. Bintray etc.

### Cask

Extension of homebrew to install macOS native apps.

