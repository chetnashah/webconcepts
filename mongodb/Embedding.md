
https://www.mongodb.com/basics/embedded-mongodb

In a relational database, you store each individual entity in its own table, and link them together through foreign keys. While MongoDB certainly supports references from one document to another, and even multi-document joins, it’s a mistake to use a document database the same way you use a relational one. Like a denormalized table, a MongoDB document should contain all the data you need for a given operation. This is called embedding.
E.g. embedding address document/json in user document.

Embedded documents are an efficient and clean way to store related data, especially data that’s regularly accessed together. In general, when designing schemas for MongoDB, you should prefer embedding by default, and use references and application-side or database-side joins only when they’re worthwhile. The more often a given workload can retrieve a single document and have all the data it needs, the more consistently high-performance your application will be.

## Embedded document pattern

**What you use together, store together.**

## Embedded Subset Pattern


