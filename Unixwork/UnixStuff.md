
### Finding if system is sysV or systemd

```
sudo stat /proc/1/exe
```

### systemctl is for systemd

The basic object that systemd manages and acts upon is a `unit`. Units can be of many types, but the most common type is a `service` (indicated by a unit file ending in `.service`). To manage services on a systemd enabled server, our main tool is the `systemctl` command.


Seeing status of all services
```sh
# shows a tree of processes
systemctl status
```

Seeing status of a specific service
```sh
systemctl status nginx
```

Starting/stopping a service
```sh
systemctl stop nginx
systemctl start nginx
```

A systemd component called journald collects and manages journal entries from all parts of the system. This is basically log information from applications and the kernel. Kind of like `dmesg`.

Use journal with `journalctl`.



### service is for sys v

Seeing status of all services
```sh
service --status-all
```
Services that are up are shown with `[+]`
and services that are down are shown with `[-]`.

Seeing status of specific service
```sh
service nginx status
```


Syntax for starting/stopping services
```sh
service nginx start
service nginx stop
service nginx reload
```