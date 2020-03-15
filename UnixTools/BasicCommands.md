1. Redirect stdout to one file and stderr to another file:

`command > out 2>error`

2. Redirect stderr to stdout (&1), and then redirect stdout to a file:

`command >out 2>&1`

3. Redirect both to a file:

`command &> out`

### groupadd

Creates a group in unix system

```sh
sudo groupadd docker
```

### usermod



### Virtual Box Ubuntu

Guest -> Host(Windows) connections are blocked by windows firewall.

### dig command

Query dns records for a domain

`dig google.com` - output also shows dns server resolving.
`dig google.com +short`
Query specific nameserver: `dig @ns1.mediatemple.net mt-example.com`

Get DNS info with nameserverS:
`dig google.com ANY +noall +answer`



