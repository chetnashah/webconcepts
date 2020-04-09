RubyGems is a hosted ruby library service.
It centralizes where you look for a library, and installing
ruby libraries / apps.

Use `RVM` for ruby version managment like `nvm` is for node.

packages are known as `gems`.

`gem install pkgname`.

`bundler` is a famous package manager

`bundle install` will install the gems specified in your `Gemfile`.
By default `bundle install` installs gems to same location as `gem install`.
`bundle install --deployment` installs gems to `vendor/bundle` dir in app, not in system location.
You should never use `sudo bundle install`.



