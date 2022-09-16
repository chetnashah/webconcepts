
https://proandroiddev.com/a-simple-framework-for-mobile-system-design-interviews-89f6f4134b84

## Define app flows/ use cases

Flows/usecases help drive api and schema

## Define app strategy

1. If app is going to work offline?
2. Background processing strategy. (batching/backgrounding?)
3. What happens we abruptly go offline?
4. Is there some kind of (content/file) download?
5. Caching strategy (Imp at a large scale ~1B users if the app is very chatty)

## Common non-functional requirements

Offline support.
Real-time notifications.
Optimal bandwidth and CPU/Battery/network usage.
Security & privacy of sensitive data.


## Data Store and persistence modeling

An often choice is to ask whether your app needs persitent data?

Three levels of data store:
1. network/server data (source of truth)
2. local disk/persistent data. (user action source of truth usually)
3. In memory models of the above data. (UI typically uses this).

If the application functioning is simplistic, we can skip local persistence and make the app only work when online.
If we have all three levels of data storage, we must define a model of:
1. change management
2. reactivity
3. order of updates
4. frequency of updates to local vs server
5. server sent updates
6. Any task progress/status must also be persisted, so that in case of a process death, these tasks can be consumed later.

Data model on rest/storage vs data model in communication

1. data model on server side storage might be a SQL table or some document record.
2. Data model in transit REST API -> usually flat records per entity (normalized).
3. Data model in transit GraphQL API -> nested records/document object (denormalized).
4. Data model in local disk/sqlite -> usually flat records per entity (normalized).
5. Data model in local disk/sqlite (denormalized) -> object database like Realm.
6. Data model in memory (normalized) -> redux like setup of entity hashmaps with ids for reference.
7. Data model in memory -> usually an object graph (denormalized) 

## Offline first

While designing caching strategy, we must also design, **when and how to evict data**, or else it will keep growing indefinitely.



