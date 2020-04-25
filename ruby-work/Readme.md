RubyGems is a hosted ruby library service.
It centralizes where you look for a library, and installing
ruby libraries / apps.

### What is a Ruby gem ?
Each gem has a `name`, `version` and a `platform`.
For e.g. `rake`, `0.8.7`, `ruby`.

### What does a gem contain ?
It contains
1. code
2. docs
3. `.gemspec` - gem metadata much like podspec

### What is $LOAD_PATH ?
It is a global variable in Ruby that points to an array of path strings
which can also have path of ruby gems installed on your home/system.
Also this is how `require` picks up your code.

When Rubygems activates a gem, it adds your gem package's `lib` folder to
the `$LOAD_PATH` ready to be required normally by another lib or app.
It is safe to assume one can `require` any file in the `lib` folder.

### Install gems to a user location instead of system

When you use `--user-install`, RubyGems will install gems to dir inside home dir
i.e. `~/.gem/ruby/1.9.1` and the commands would end up in `~/.gem/ruby/1.9.1/bin` which if you want to execute should be a part of `PATH`.


### Rbenv

Rbenv does not install ruby, only change the global ruby version on per user basis.



Use `RVM` for ruby version managment like `nvm` is for node. but it does not work
very vell. prefer `rbenv` instead.

packages are known as `gems`.

`gem install pkgname`.

`bundler` is a famous package manager

`bundle install` will install the gems specified in your `Gemfile`.
By default `bundle install` installs gems to same location as `gem install`.
`bundle install --deployment` installs gems to `vendor/bundle` dir in app, not in system location.
You should never use `sudo bundle install`.



