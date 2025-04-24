

In command-line environments, you can apply proxying at different scopes, from single commands to system-wide configurations. Here's a hierarchy of levels:

---

#### 1. **Single-Command Level**  
Apply a proxy **for a specific tool/command**.  
Examples:  
```bash
curl -x http://proxy:port https://example.com         # HTTP/HTTPS proxy for cURL
wget --proxy=on --http-proxy=proxy:port https://example.com  # Wget
git config --global http.proxy http://proxy:port     # Git only
```

---

#### 2. **Shell Session Level**  
Set proxies **for the current terminal session** using environment variables:  
```bash
export http_proxy="http://proxy:port"      # HTTP traffic
export https_proxy="http://proxy:port"     # HTTPS traffic
export ALL_PROXY="socks5://localhost:8080" # All traffic (if supported)
```
- Affects all tools in that session that respect these variables (e.g., `curl`, `wget`, `apt`).

---

#### 3. **User-Level Persistence**  
Make proxies permanent **for your user account** by adding the variables to shell config files:  
```bash
echo 'export http_proxy="http://proxy:port"' >> ~/.bashrc  # Bash
echo 'export https_proxy="http://proxy:port"' >> ~/.zshrc  # Zsh
```

---

#### 4. **System-Wide Level**  
Apply proxies **globally for all users/services**:  
- **Linux** (edit `/etc/environment`):  
  ```bash
  echo 'http_proxy="http://proxy:port"' | sudo tee -a /etc/environment
  ```
- **macOS** (use `networksetup` for global proxy):  
  ```bash
  networksetup -setwebproxy "Wi-Fi" proxy port  # HTTP
  networksetup -setsecurewebproxy "Wi-Fi" proxy port  # HTTPS
  ```

---

#### 5. **Network Manager Level**  
Configure proxies via CLI tools like `nmcli` (Linux):  
```bash
nmcli connection modify "Your_Connection" proxy.http "http://proxy:port"
nmcli connection up "Your_Connection"
```

---

#### 6. **Application-Specific Config Files**  
Tools like `apt` or `npm` can be configured individually:  
- **APT** (Linux):  
  ```bash
  echo 'Acquire::http::Proxy "http://proxy:port";' | sudo tee /etc/apt/apt.conf.d/99proxy
  ```
- **npm**:  
  ```bash
  npm config set proxy http://proxy:port
  ```

---

#### 7. **Forced Proxying with `proxychains`**  
Bypass app-specific settings and route **any command** through a proxy:  
```bash
proxychains4 curl https://example.com  # Uses proxy defined in /etc/proxychains.conf
```

---

#### 8. **Container/Docker Level**  
Set proxies for containerized apps by configuring Docker:  
```bash
sudo mkdir -p /etc/systemd/system/docker.service.d
echo '[Service]' | sudo tee /etc/systemd/system/docker.service.d/proxy.conf
echo 'Environment="HTTP_PROXY=http://proxy:port"' | sudo tee -a /etc/systemd/system/docker.service.d/proxy.conf
sudo systemctl restart docker
```

---

Choose the level based on your needs:  
- **Temporary testing**: Single-command or shell session.  
- **Persistent use**: User-level or system-wide.  
- **Tool-specific control**: Application config files or `proxychains`.