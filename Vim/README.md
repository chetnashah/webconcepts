nvim is recommended

## Init file

* `~/.config/nvim/init.vim` if using vimscript
* `~/.config/nvim/init.lua` if using lua

`init.lua` will override `init.vim` if both are present.

## Setting options in lua

https://www.imaginaryrobots.net/posts/2021-04-17-converting-vimrc-to-lua/

## Modular lua structure

```
# ~/.config/nvim

-- init.lua
-- lua/
    -- module_name/
        -- init.lua
        -- package_name.lua
        -- keymaps.lua
```