Learned from MongoDB University course : MongoDB Basics.


### What is MongoDB ?
A useful flexible database more flexible than SQL but more structured than Redis.

#### Mongo Compass
UI for seeing mongodb

#### Mongo Atlas
Mongos Db as a service


#### Basic terminology

1. collection = table
2. record = document in a collection

#### Interesting observations


fields can have more than one type of data
e.g. 
for a movie document,
director can be string, array of strings or undefined.

Every document has a field named _id.

Fields can have scalar values and documents/records as values. i.e. fields can have values of type Array and Object For such fields, compass will show Document type and can expand.


What above means is that there can be documents in field of documents.
Contrast this with SQL where we usually referred to nested document only via a foreign key/id, whereas MongoDB has nesting/embedding of documents inside documents.

Because Mongo is flexible,
All documents don't need to have same fields,
as we have known some of the data might be missing in
case those fields will have value undefined.

One can arbitrarily mix, nest Array and documents like in JSON.


Mongo compass value graph view and value types view are useful for getting insights on possible values/types of fields and for data cleaning/migration etc.



#### Filter/querying Mongo Data

When using compass, value graph provides useful click/drag/select and point interface for making queries automatically/ also which is a useful to learn query language early on.


Also another interesting observation: when a field has many values of given type e.g. year, it makes classes in such a way that they can be conviniently displayed in interface. e.g. 5 year or 10 year durations. 1995-2000 etc.
In these cases, if you want data for particular year, just write the query directly.

Filter query language is a json syntax defined by mongo.