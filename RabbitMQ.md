
### Producer

Application program that generates messages.

### Consumer

Application program that receives messages

RabbitMQ pushes messages to consumers
Consumers send acknowledgements of success/failure
Messages are removed from queues once consumed successfully

### Queue

A data structure that can hold messages.

### Exchange

An exchange is an entity that routes messages from producers to queues. (It does not have any storage by itself, so if no queues are bound to an exchange,
messages sent to exchange are lost)
Types of exchanges:
1. direct - The routing algorithm behind a direct exchange is simple - a message goes to the queues whose binding key exactly matches the routing key of the message.
2. topic
3. header
4. fanout - mindless broadcast to all queues bound to exchange

### Binding

The relationship between an Exchange and a queue is called binding.
bindng-key is property of a binding.

https://jack-vanlightly.com/blog/2017/12/5/rabbitmq-vs-kafka-part-2-rabbitmq-messaging-patterns-and-topologies