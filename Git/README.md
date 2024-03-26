

## `.gitconfig` is your global configuration, `.git/config` is your local config

One will be present in your `workingdir/.git/config`(repo local) and another in `~/.gitconfig` (global).

### How to print out the full resolved config?

```sh
git config -l
```

## Aliases help you to create short commands

Create an alias by editing global config:
```
git config --global --edit
```
Then in the config file, add your alias:
```
# ~/.gitconfig
[alias]
    co = checkout
    br = branch
    st = status
    last = log -1 HEAD
	bb = !~/better-branch.sh
```

Now when you run `git bb`, it will run `~/better-branch.sh`.

