
## `&` is the shell script call operator

e.g.
```pwsh
# used to execute a command, script or an executable
& "~/setupenv.ps1"
```
e.g. for an executable
```pwsh
$notep = "notepad.exe"
& $notep
```

With scripts:
```pwsh
$scriptPath = "c:\scripts\myscript.ps1"
$arg1 = "1"
$arg2 = "hey"

& $scriptPath $arg1 $arg2
```

## `Resolve-Path` to convert relative paths to absolute paths

```pwsh
PS /Users/jayshah> Resolve-Path "."
Path
----
/Users/jayshah
```