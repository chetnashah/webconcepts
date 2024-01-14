
network services are a group of settings for a specific network port (a physical network connector, such as your computer's Ethernet or Thunderbolt port) or other network interface (such as Wi-Fi) 
1
. These services are used to manage and configure network settings, including TCP/IP settings, DNS server addresses, search domains, proxy settings, and WINS server settings
1
.
You can list all network services on your Mac using the command `networksetup -listallnetworkservices`

e.g.
```
myuser% networksetup -listallnetworkservices

An asterisk (*) denotes that a network service is disabled.
USB 10/100 LAN
Wi-Fi
Thunderbolt Bridge
Tailscale Tunnel
ProtonVPN
```

### How proxyman works

https://docs.proxyman.io/basic-features/proxy-setting-tool

By default, Proxyman will try overriding your HTTP/HTTPS Proxy Config by using the `networksetup` Command-Line. However, the `networksetup` is a bottleneck during starting or quitting the app. 

## Verifying proxy connections

### System proxy (here we see port 9090)

```
jayshah@192 dummy-proj % scutil --proxy
<dictionary> {
  ExceptionsList : <array> {
    0 : dns.google
    1 : one.one.one.one
    2 : ocsp.digicert.com
  }
  FTPPassive : 1
  HTTPEnable : 1
  HTTPPort : 9090
  HTTPProxy : 127.0.0.1
  HTTPSEnable : 1
  HTTPSPort : 9090
  HTTPSProxy : 127.0.0.1
  ProxyAutoConfigEnable : 0
  ProxyAutoDiscoveryEnable : 0
  SOCKSEnable : 0
}
```

### Local terminal/session level proxy (here we see port 9090)

```
$ env
,,,
SPACESHIP_PROXY=http://127.0.0.1:9090
SPACESHIP_PROXY_SSL_VERIFY_NONE=1
http_proxy=http://127.0.0.1:9090
https_proxy=http://127.0.0.1:9090
,,,
```