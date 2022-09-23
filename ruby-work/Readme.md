RubyGems is a hosted ruby library service.
It centralizes where you look for a library, and installing
ruby libraries / apps.

### Minimalistic ruby program

```sh
$ mkdir hello-world
$ cd hello-world/
$ mkdir lib
$ echo puts \"Hello, world\!\" >> lib/hello_world.rb
$ ruby hello_world.rb
> Hello, world!
```

### Minimalistic ruby program using modules

```rb
# hello_world.rb
require 'colorize'
puts "Hello, world!".colorize(:red)
puts "hello world"
```

Since we have not explicitly installed or mentioned colorize module as a dependency, we will get this error:
```
jayshah@jays-MBP lib % ruby hello_world.rb
Traceback (most recent call last):
	2: from hello_world.rb:1:in `<main>'
	1: from /Users/jayshah/.rbenv/versions/2.7.5/lib/ruby/2.7.0/rubygems/core_ext/kernel_require.rb:83:in `require'
/Users/jayshah/.rbenv/versions/2.7.5/lib/ruby/2.7.0/rubygems/core_ext/kernel_require.rb:83:in `require': cannot load such file -- colorize (LoadError)
```

So add a **Gemfile** using `bundle init`

`Gemfile` will look something like:
```
# frozen_string_literal: true
source "https://rubygems.org"

# gem "rails"
```

Adding dependency from cli to the `Gemfile` using `bundle add gemname` or `bundle install` (after adding gemname to Gemfile).

**Note** `bundle add` automatically seems to be running `bundle install`
```
jayshah@jays-MBP hello-world-ruby % bundle add colorize
Fetching gem metadata from https://rubygems.org/.......
Resolving dependencies...
Fetching gem metadata from https://rubygems.org/.......
Resolving dependencies...
Using bundler 2.3.22
Fetching colorize 0.8.1
Installing colorize 0.8.1
```

Gemfile now looks like:
```
# frozen_string_literal: true
source "https://rubygems.org"
gem "colorize", "~> 0.8.1"
```

Now running ruby file works:
```
jayshah@jays-MBP hello-world-ruby % ruby lib/hello_world.rb
Hello, world!
hello world
```

### What is a Ruby gem ?
Each gem has a `name`, `version` and a `platform`.
For e.g. `rake`, `0.8.7`, `ruby`.

### What does a gem contain ?
It contains
1. code
2. docs
3. `.gemspec` - gem metadata much like podspec

### what is irb?

Short for 'interactive ruby' interpreter.


### What is $LOAD_PATH ?
It is a global variable in Ruby that points to an array of path strings
which can also have path of ruby gems installed on your home/system.
Also this is how `require` picks up your code.

When Rubygems activates a gem, it adds your gem package's `lib` folder to
the `$LOAD_PATH` ready to be required normally by another lib or app.
It is safe to assume one can `require` any file in the `lib` folder.

#### How to check $LOAD_PATH?
```
$irb
$> p $LOAD_PATH
=> ["/opt/homebrew/Cellar/rbenv/1.2.0/rbenv.d/exec/gem-rehash", "/Users/jayshah/.rbenv/versions/2.7.5/lib/ruby/site_ruby/2.7.0", "/Users/jayshah/.rbenv/versions/2.7.5/lib/ruby/site_ruby/2.7.0/arm64-darwin21", "/Users/jayshah/.rbenv/versions/2.7.5/lib/ruby/site_ruby", "/Users/jayshah/.rbenv/versions/2.7.5/lib/ruby/vendor_ruby/2.7.0", "/Users/jayshah/.rbenv/versions/2.7.5/lib/ruby/vendor_ruby/2.7.0/arm64-darwin21", "/Users/jayshah/.rbenv/versions/2.7.5/lib/ruby/vendor_ruby", "/Users/jayshah/.rbenv/versions/2.7.5/lib/ruby/2.7.0", "/Users/jayshah/.rbenv/versions/2.7.5/lib/ruby/2.7.0/arm64-darwin21"]
```

### Install gems to a user location instead of system

When you use `--user-install`, RubyGems will install gems to dir inside home dir
i.e. `~/.gem/ruby/1.9.1` and the commands would end up in `~/.gem/ruby/1.9.1/bin` which if you want to execute should be a part of `PATH`.


### List gems for a user (machine level)

`gem list`

### Where does `gem install` download packages (for user level install)?

Some place like: `/Users/jayshah/.rbenv/versions/2.7.5/lib/ruby/2.7.0/...`.
But best way to know is `gem which gemname`.

### What if we have more than one project that need gems of different versions?

This is really important for reproducible builds.


### Printing user gem environment

`$ gem env`: Get gems env.

```
RubyGems Environment:
  - RUBYGEMS VERSION: 3.1.6
  - RUBY VERSION: 2.7.5 (2021-11-24 patchlevel 203) [arm64-darwin21]
  - INSTALLATION DIRECTORY: /Users/jayshah/.gem
  - USER INSTALLATION DIRECTORY: /Users/jayshah/.gem/ruby/2.7.0
  - RUBY EXECUTABLE: /Users/jayshah/.rbenv/versions/2.7.5/bin/ruby
  - GIT EXECUTABLE: /opt/homebrew/bin/git
  - EXECUTABLE DIRECTORY: /Users/jayshah/.gem/bin
  - SPEC CACHE DIRECTORY: /Users/jayshah/.gem/specs
  - SYSTEM CONFIGURATION DIRECTORY: /Users/jayshah/.rbenv/versions/2.7.5/etc
  - RUBYGEMS PLATFORMS:
    - ruby
    - arm64-darwin-21
  - GEM PATHS:
     - /Users/jayshah/.gem
     - /Users/jayshah/.gem/ruby/2.7.0
     - /Users/jayshah/.rbenv/versions/2.7.5/lib/ruby/gems/2.7.0
  - GEM CONFIGURATION:
     - :update_sources => true
     - :verbose => true
     - :backtrace => false
     - :bulk_threshold => 1000
  - REMOTE SOURCES:
     - https://rubygems.org/
  - SHELL PATH:
     - /Users/jayshah/.rbenv/versions/2.7.5/bin
     - /opt/homebrew/Cellar/rbenv/1.2.0/libexec
     - /Users/jayshah/.rbenv/shims
     - /Users/jayshah/opt/anaconda3/bin
     - /Users/jayshah/.gem/bin
     - /Users/jayshah/.volta/bin
     - /Users/jayshah/.rbenv/shims
     - /Users/jayshah/.nvm/versions/node/v16.13.1/bin
     - /opt/homebrew/bin
     - /opt/homebrew/sbin
     - /usr/local/bin
     - /usr/bin
     - /bin
     - /usr/sbin
     - /sbin
     - /Library/TeX/texbin
     - /usr/local/go/bin
     - /usr/local/share/dotnet
     - ~/.dotnet/tools
     - /Library/Apple/usr/bin
     - /Library/Frameworks/Mono.framework/Versions/Current/Commands
     - /Applications/Wireshark.app/Contents/MacOS
     - /Users/jayshah/.cargo/bin
     - /Users/jayshah/Library/Android/sdk/emulator
     - /Users/jayshah/Library/Android/sdk/tools
     - /Users/jayshah/Library/Android/sdk/tools/bin
     - /Users/jayshah/Library/Android/sdk/platform-tools
     - /Users/jayshah/Documents/depot_tools
     - /Users/jayshah/Documents/depot_tools
```
### Rbenv

Rbenv does not install ruby, only change the global ruby version on per user basis.


packages are known as `gems`.

`gem install pkgname`.


### bundler

https://www.youtube.com/watch?v=4DqzaqeeMgY

`bundler` is a famous package manager

`bundle install` will install the gems specified in your `Gemfile`.
By default `bundle install` installs gems to same location as `gem install`.
`bundle install --deployment` installs gems to `vendor/bundle` dir in app, not in system location.
You should never use `sudo bundle install`.

#### Gemfile.lock

Given a gemfile, resolves all transitive and peer dependencies (along with constraintS?)
And captures this resolution (with exact versions) as a snapshot file.
This also helps us have a reproducible build. (in CI)

### Where does bundler install a gem?

Find info using `bundle info gemname` command:
```
jayshah@jays-MBP ios % bundle info fastlane
  * fastlane (2.210.1)
	Summary: The easiest way to automate beta deployments and releases for your iOS and Android apps
	Homepage: https://fastlane.tools
	Documentation: https://docs.fastlane.tools/
	Source Code: https://github.com/fastlane/fastlane
	Changelog: https://github.com/fastlane/fastlane/releases
	Bug Tracker: https://github.com/fastlane/fastlane/issues
	Path: /Users/jayshah/.gem/gems/fastlane-2.210.1
```

For CI it is recommended to store gems in `vendor/bundle`:
CI case: Gems are installed to vendor/bundle not your default system location
e.g. `bundle install --deployment`: **Note: this requires that a Gemfile.lock is present before hand! which will be used**

### How require loads a Gem?

https://ryanbigg.com/2017/11/how-require-loads-a-gem

### rubygems and require

RubyGems monkeypatches Kernel#require, so that it will try to find a gem which contains that file in the gem path and then "activates" that gem, which basically means to add that gem's library directory to the load path.

In other words, when you call require, you will not call the require from the core library, you will instead call the require from RubyGems which overwrites the one from the core library. And the require from RubyGems knows how to search through gems.

https://www.justinweiss.com/articles/how-do-gems-work/

### bundle exec command

This command executes the command, making all gems specified in the Gemfile(5) available to require in Ruby programs.
