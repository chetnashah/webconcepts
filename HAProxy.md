
HAProxy supports 4 connection modes :
  - keep alive    : all requests and responses are processed (default)
  - tunnel        : only the first request and response are processed,
                    everything else is forwarded with no analysis.
  - server close  : the server-facing connection is closed after the response.
  - close         : the connection is actively closed after end of response.

HAProxy's configuration process involves 3 major sources of parameters :

  - the arguments from the command-line, which always take precedence
  - the "global" section, which sets process-wide parameters
  - the proxies sections which can take form of "defaults", "listen",
    "frontend" and "backend".


Proxy configuration can be located in a set of sections :
 - defaults [<name>]
 - frontend <name>
 - backend  <name>
 - listen   <name>

A "defaults" section sets default parameters for all other sections following
its declaration. Those default parameters are reset by the next "defaults"
section. See below for the list of parameters which can be set in a "defaults"
section. The name is optional but its use is encouraged for better readability.

A "frontend" section describes a set of listening sockets accepting client
connections.

A "backend" section describes a set of servers to which the proxy will connect
to forward incoming connections.

A "listen" section defines a complete proxy with its frontend and backend
parts combined in one section. It is generally useful for TCP-only traffic.

All proxy names must be formed from upper and lower case letters, digits,
'-' (dash), '_' (underscore) , '.' (dot) and ':' (colon). ACL names are
case-sensitive, which means that "www" and "WWW" are two different proxies.


The effective mode that will be applied to a connection passing through a
frontend and a backend can be determined by both proxy modes according to the
following matrix, but in short, the modes are symmetric, keep-alive is the
weakest option and close is the strongest.

                   Backend mode

                | KAL | SCL | CLO
            ----+-----+-----+----
            KAL | KAL | SCL | CLO
            ----+-----+-----+----
            TUN | TUN | SCL | CLO
 Frontend   ----+-----+-----+----
   mode     SCL | SCL | SCL | CLO
            ----+-----+-----+----
            CLO | CLO | CLO | CLO

**timeout http-request**

Is the time from the first client byte received, until last byte sent to the client (regardless of keep alive). So if your backend is too slow or the client is sending his request too slow, the whole communication might take longer than this, and the request is dropped (and a timeout sent to the client).

**timeout http-keep-alive**

The time to keep a connection open between haproxy and the client (after the client response is sent out). This has nothing to do with the backend response time. This has nothing to do with the length of a single request (i.e. http-request timeout). This allows faster responses if the user requests multiple ressources (i.e. html, img, and js). With keep alive the single requests can make use of the same tcp connection. This way the load time for a full webpage is reduced.

**timeout server**
This is the timeout for your backend servers. When reached, haproxy replies with 504 (gateway timeout). This also has nothing to do with keep alive, as it is only about the connection between proxy and backend.

This is the maximum time to receive HTTP response headers from the server (after it received the full client request). Basically, this is the processing time from your servers, before it starts sending the response.

**timeout client**
The inactivity timeout applies when the client is expected to acknowledge or send data. In HTTP mode, this timeout is particularly important to consider during the first phase, when the client sends the request, and during the response while it is reading data sent by the server.

This is the maximum time to receive HTTP request headers from the client.
3G/4G/56k/satellite can be slow at times. Still, they should be able to send HTTP headers in a few seconds, NOT 30.



**timeout connect**
Set the maximum time to wait for a connection attempt to a server to succeed.
The maximum time a server has to accept a TCP connection

**timeout check**
When performing a healthcheck, the server has timeout connect to accept the connection then timeout check to give the response