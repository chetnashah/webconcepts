
A good reference is Redis docs and Redis in Action (free ebook).

#### What is redis ?
A key value store which can work like an in memory db.
Although it is a store it accepts "commands" and hence feels like a server.

#### Redis data types?
Strings
Lists
Sets
Sorted Sets
Hashes (JSON/dict like)
Bitmaps
HyperLogs
GeoSpatialIndex

#### Some redis properties
Single threaded

#### Pros
1. No schema whatsoever
2. Caching and disk persistence (Think AsyncStorage/Sharedprefs)

### Basics
use redis-cli to fire up a redis-repl in cmd.

#### Getting/setting values


``` redis
SET VARNAME value   // assign value to a name, now it exists
GET VARNAME         // returns value if exists otherwise nil
EXISTS VARNAME      // returns 1 if exists and 0 if not.
DEL VARNAME         // destroy a name value binding.

APPEND VARNAME value  // add value at end of original value if exists, otherwise SET value for VARNAME
MSET VARNAME1 value1 VARNAME2 valu2  //setting multiple vars
RENAME VAR1 VAR2    // now VAR1 is nil and VAR2 is new name

```

if a value does not exist for VARNAME, redis returns
(nil).

#### Redis List Commands

LIST structure contains list of values, possibly with duplicate values in the List.

* LPUSH, RPUSH
* LPOP, RPOP
* LLEN
* LRANGE
* LINDEX
* LINSERT
* LSET


#### Redis String commands

```
STRLEN key
```
 length of string at key, 0 when key does not exist


 #### Redis Integer commands

 ```
 INCR/DECR key
 ```
 Increment or decrement value at key, if key does not exist then set value to 0 first.
 will throw error if value at key is not number. 
 will throw error if number at key is greater than 64 bit signed integer.

#### Redis SET structure

a redis SET structure is a set of distinct values with undefined order.

Set commands
```
SADD setName value
SMEMBERS setName
SISMEMBER setName value
SREM setName value
```

#### Redis SortedSet structure (Also referred as ZSET)

Like a set but each element has a floating point score by which the set is sorted in ascending order by score.
When the score is same, order is lexicographic for keyname.

```
ZADD setName score member
ZRANGE setName 0 -1 // prints all memebers of sorted set.
ZSCORE setName key
ZINCRBY setName amount key  // increases score of key in given setName
```

#### Redis HASH structure

There is hash structure's name. And the hash structure contains multiple distinct sub-keys (undefined order) and corresponding values.
Typically used for records/entries like JSON objects, hence models.

```
HSET hashTableName fieldName value
HGET hashTableName fieldName
HGETALL hashTableName
HDEL hashTableName fieldName
HKEYS hashTableName // return all keys of hashtable
HEXISTS hashTableName fieldName

HMSET tableName subKeyName v1 subKeyName2 v2
e.g.
HMSET user:1000 id 1000 name "JON WICK" age 44
```


### Setting up node redis client

Setting up node-redis client is pretty straight forward:

``` js
const redis = require('redis'); // npm package
const redisUrl = 'redis://127.0.0.1:6379':
const client = redis.createClient(redisUrl);

client.set('key', 'value');
client.get('key', nodeback);// passing in a node style callback
client.get('key', console.log);// debugging
```
