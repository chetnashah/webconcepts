
MQTT has 3 built-in QoS levels for Reliable Message Delivery:

`QoS 0`(At most once) - the message is sent only once and the client and broker take no additional steps to acknowledge delivery (fire and forget).

`QoS 1`(At least once) - the message is re-tried by the sender multiple times until acknowledgement is received (acknowledged delivery).

`QoS 2`(Exactly once) - the sender and receiver engage in a two-level handshake to ensure only one copy of the message is received (assured delivery).

