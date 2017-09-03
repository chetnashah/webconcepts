
#### Difference between latency and bandwidth

Latency is end to end wall clock time take for request to be satisfied.
Bandwidth is the amount of bits you can put on wire every second.

There are mainly 4 parts to latency
1. progpogation delay: time taken to travel in the medium.
2. Trasmission delay: time taken to put all the bits on the wire/medium.
3. Processing delay: packet header processing etc.
4. Queueing delay: time waiting in queue before getting processed.

##### What is refractive index of material ?
Time taken for information to travel compared to speed of light.
Refractive index of fiber optic cable is 1.5 ~ 2,00,000KM/s

#### What is last mile latency?
Latency introduced between our ISP's main routers to our computers,
which varies between 18-44 ms depending on type of connection: fiber-to-DSL

#### HOw to measure latency?
Use traceroute on unix, and tracert on windows.

#### How does traceroute usually work?
Trace Route works by setting the TTL for a packet to 1, sending it towards the requested destination host, and listening for the reply. When the initiating machine receives a "time exceeded" response, it examines the packet to determine where the packet came from - this identifies the machine one hop away. Then the tracing machine generates a new packet with TTL 2, and uses the response to determine the machine 2 hops away, and so on.

#### How to measure bandwidth?
Use a tool like OOkla speedtest,
The available bandwidth to a user is usually the lowest capacity link between client and server.

#### What is congestion window and receiver window?

cwnd is sender side limit of sending data before some acks are received. It is a limit put in place to avoid network congestion, and increases exponentially with proper round trips (also known as slow start).

rwnd is receiver side limit of amount of data receiver can handle (usually bound by buffer holding/processing capacity of the receiver).

At any time the data sent on wire is minimun of cwnd and rwnd. Current receive window sizes are acknowledged in every ACK.

As per recommendations initial cwnd size is usually 4 segments (~4 x 1460bytes) and latest is 10 segments, and doubled on every ack received until it meets rwnd size.

#### What are MTU and MSS ?

MTU = maximum transmission unit, that is maximum IP packet size on a given link, if size is greater than MTU, fragmented into two or more packets.

MSS = Maximum segment size for TCP, IF packet size greater than MSS, packet is discarded, MSS is negotiated only once during initial Three Way Handshake.

For a Typical connection :
MTU = 1500 bytes

and
MSS = MTU - (20 (IPhdr) + 20 (TCPHdr))
    = 1460 bytes

#### Show how much difference, (a new tcp connection + slow start) vs reusing existing connection can make?


HTTP basic authentication:




HTTP access control with CORS :


HTTP Caching :




HTTP Cookie managmenet :


### Using Curl

-i => show response headers + body
-I => only show response headers
-v => show request headers with connection info

-d "key=value" => send data to server as urlencoded.
-X PUT => specify putting of data
-O => download data
-o => filename download data to given filename