
https://developer.android.com/topic/architecture/data-layer/offline-first

**At a minimum, an offline-first app should be able to perform reads without network access**

**A repository with network access in an offline-first app should always have a local data source**

## local data source

The local data source is the canonical source of truth for the app.

**It should be the exclusive source of any data that higher layers of the app read. This ensures data consistency in between connection states**. Backed by disk persistence


## Reads


## Writes


## Synchronization

## Conflict resolution

