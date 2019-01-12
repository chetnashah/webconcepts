
Primary purpose : convert names to IP address


Name servers are important:

Whoever manages the name servers can list the DNS records.

E.g. I specify Nameservers in Godaddy to point to Route53, then all the
DNS records should be managed by Route53.


### Record Types

1. `A Record`: Connects IP address to host name.

2. `CNAME Record`: Allows more than one DNS names for a host

3. `MX Record`: ensures email is delivered to the right location.

4. `NS Record`: contains nameserver info.



### Hosted Zones

`Zone file`: A file that contains the list of all the records.

When migrating to different nameservers, zone file is useful and can be exported and imported for all the dns records it contains.

### Record Sets

#### NS Record Set

A set containing records of name servers

#### SOA record set

A `Start of Authority` record set.

