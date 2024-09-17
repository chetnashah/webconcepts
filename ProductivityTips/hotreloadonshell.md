
## Use `fswatch` to listen for file changes and run any command (lint, test, typecheck)

e.g
```sh
fswatch -o app/ tests/ | xargs -n1 -I{} sh -c 'yarn lint'
```