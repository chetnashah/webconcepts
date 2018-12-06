session/window/terminal manager

Tmux config lives in `~/.tmux.conf`

creating a new session
`tmux new -s seessname`

list sessions
`tmux ls`

Kill sessions
`tmux kill-session`

`Ctrl-B` is the main prefix key when in tmux.

Make your tmux/vim config in such a way
that you can seemlessly move between vim and tmux splits using
`Ctrl-h`,`Ctrl-j`,`Ctrl-k`, `Ctrl-l`.

Use `Ctrl-B |` for vertical split.
Use `Ctrl-B -` for horizontal split.