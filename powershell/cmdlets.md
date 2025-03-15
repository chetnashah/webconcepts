
## list all cmdlets

```pwsh
Get-Command
```

## Get help about a cmdlet

```pwsh
PS /Users/jayshah> Get-Help Write-Host
```

## Get-Content

Equivalent to `cat`

```pwsh
PS /Users/jayshah> Get-Content ./test.cpp
#include<cstdio>


int main() {
 int k = 1+2;
        printf("k = %d", k);
}
```

## Cheatsheet

Here's a concise **Bash to PowerShell Cheat Sheet** for common operations:

---

### **Basic Operations**
| **Task**              | **Bash**                  | **PowerShell**              |
|-----------------------|---------------------------|------------------------------|
| List files            | `ls`                      | `Get-ChildItem` (or `ls`)    |
| Change directory      | `cd /path`                | `Set-Location -Path "C:\path"` (or `cd`) |
| Print working dir     | `pwd`                     | `Get-Location` (or `pwd`)    |
| Create directory      | `mkdir dir`               | `New-Item -ItemType Directory -Name "dir"` |
| Delete file           | `rm file`                 | `Remove-Item file`           |
| Copy file             | `cp src dest`             | `Copy-Item src dest`         |
| Move/Rename file      | `mv old new`              | `Move-Item old new`          |
| Print text            | `echo "text"`             | `Write-Output "text"` (or `echo`) |
| Search text in files  | `grep "pattern" file`     | `Select-String -Pattern "pattern" -Path file` |
| Download file         | `curl -O URL`             | `Invoke-WebRequest -Uri URL -OutFile file` |

---

### **Variables**
| **Operation**         | **Bash**                  | **PowerShell**              |
|-----------------------|---------------------------|------------------------------|
| Assign variable       | `var="value"`             | `$var = "value"`             |
| Use variable          | `echo $var`               | `Write-Output $var`          |
| Environment variable  | `export VAR=value`        | `$env:VAR = "value"`         |
| Read input            | `read var`                | `$var = Read-Host`           |

---

### **Control Structures**
#### **Conditionals**
```bash
# Bash
if [ $a -eq 1 ]; then
  echo "a is 1"
fi
```
```powershell
# PowerShell
if ($a -eq 1) {
  Write-Output "a is 1"
}
```

#### **Loops**
```bash
# Bash
for i in {1..5}; do
  echo $i
done
```
```powershell
# PowerShell
foreach ($i in 1..5) {
  Write-Output $i
}
```

---

### **Pipes & Redirection**
| **Task**              | **Bash**                  | **PowerShell**              |
|-----------------------|---------------------------|------------------------------|
| Pipe output           | `ls | grep ".txt"`        | `Get-ChildItem | Where-Object { $_.Name -like "*.txt" }` |
| Redirect stdout       | `command > file`          | `command > file`             |
| Redirect stderr       | `command 2> error.log`    | `command 2> error.log`       |
| Append to file        | `echo "text" >> file`     | `Add-Content -Path file -Value "text"` |

---

### **Processes**
| **Task**              | **Bash**                  | **PowerShell**              |
|-----------------------|---------------------------|------------------------------|
| List processes        | `ps aux`                  | `Get-Process`                |
| Kill process          | `kill -9 PID`             | `Stop-Process -Id PID -Force`|
| Run background job    | `command &`               | `Start-Job -ScriptBlock { command }` |

---

### **Miscellaneous**
| **Task**              | **Bash**                  | **PowerShell**              |
|-----------------------|---------------------------|------------------------------|
| Command history       | `history`                 | `Get-History`                |
| Check command path    | `which command`           | `Get-Command command`        |
| Comment               | `# comment`               | `# comment`                  |
| Exit shell            | `exit`                    | `exit`                       |

---

### **Key Differences**
1. **Object-Oriented**: PowerShell passes **objects** (not text) between commands.
   - Example: `Get-ChildItem | Select-Object Name, Length`.
2. **Case Insensitive**: Most operations are case-insensitive by default.
3. **Aliases**: Many Bash-like aliases exist (e.g., `ls`, `cat`, `pwd`), but use full cmdlet names in scripts.
4. **Script Execution**: Enable with `Set-ExecutionPolicy RemoteSigned`.

---

**Quick Reference**:  
- Use `Get-Help <command>` for PowerShell help.  
- Use `Get-Alias` to see aliases (e.g., `ls` → `Get-ChildItem`).  
- Use `$_` for the current pipeline object (similar to `xargs` in Bash).  

Let me know if you need deeper explanations! 😊