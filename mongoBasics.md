Learned from MongoDB University course : MongoDB Basics.

connecting to class cluster from mongo shell:
```
```

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


#### Mongo clusters

Cluster has one primary and multiple secondaries.
For any cluster there is one and only one primary.
Only primary will accept writes.


#### Mongo Shell

Mongo shell is a fully functional javscript interpreter, kind of like node repl (https://docs.mongodb.com/manual/tutorial/write-scripts-for-the-mongo-shell/)

Also you can use tab completion in mongo shell to prevent incorrect commands/queries etc.

```
show dbs                  #show all databses
use dbName                #select a given dbName
db                        #db refers to currently selected database
```
#### Mongo CRUD operation concepts

All documents in mongodb must contain an _id field of type ObjectId (if autogenerated _id)
All _id within a given collection are unique (no guarantees of global uniqueness though)

* Creating Documents/rows:
 
  If you do insert on collection that does not exist, that collection will be created for you.
  e.g. Assume myMovies collection does not exist. and we issue command
  ```
    db.myMovies.insertOne({ title: "Star Trek II: The Wrath of Khan", year: 1982, imdb: "tt0084726"})
  ```
  Then myMovies collection will be created automatically.

  ##### Insert commands/functions

  1. insertOne(documentObjectJSON) - It is a method on the collection class. and inserts single doucment corresponding to given JSON inside the collection.
  ```
  db.moviesScratch.insertOne({ title: "Star Trek II: The Wrath of Khan", year: 1982, imdb: "tt0084726"})
  ```

  2. insertMany(arrayJSON, optional optionsObjectJSON) - In many cases we want to insert more than one (bulkInsert) documents/rows into our collection/table.
    
    * Types of bulk inserts - Ordered inserts(default) and unordered inserts.
      * Ordered Inserts - Documents are inserted in order present in given array (in sequence) and document insertion stops once an error is encountered.
      e.g.
      ```
      db.moviesScratch.insertMany(
        [
          {
	          "_id" : "tt0084726",
	          "title" : "Star Trek II: The Wrath of Khan",
	          "year" : 1982,
	          "type" : "movie"
          },
          {
	          "_id" : "tt0796366",
	          "title" : "Star Trek",
	          "year" : 2009,
	          "type" : "movie"
          },
          {
            "_id" : "tt0084726",
            "title" : "Star Trek II: The Wrath of Khan",
            "year" : 1982,
            "type" : "movie"
          },
          {
            "_id" : "tt1408101",
            "title" : "Star Trek Into Darkness",
            "year" : 2013,
            "type" : "movie"
          },
          {
            "_id" : "tt0117731",
            "title" : "Star Trek: First Contact",
            "year" : 1996,
            "type" : "movie"
          }
        ]
      );
      ```
      * Unordered Inserts - Documents are inserted irrespective of order and error documents are not inserted, all other doucments are inserted. specified using providing options json along with array of documents.
      e.g.
      ```
      db.myMovies.insertMany(
        [
          {
	          "_id" : "tt0084726",
	          "title" : "Star Trek II: The Wrath of Khan",
	          "year" : 1982,
	          "type" : "movie"
          },
          {
            "_id" : "tt0796366",
            "title" : "Star Trek",
            "year" : 2009,
            "type" : "movie"
          },
          {
            "_id" : "tt0084726",
            "title" : "Star Trek II: The Wrath of Khan",
            "year" : 1982,
            "type" : "movie"
          },
          {
            "_id" : "tt1408101",
            "title" : "Star Trek Into Darkness",
            "year" : 2013,
            "type" : "movie"
          },
          {
            "_id" : "tt0117731",
            "title" : "Star Trek: First Contact",
            "year" : 1996,
            "type" : "movie"
          }
        ],
        {
	        ordered: false
        }
      );
      ```


  ##### Read/query commands and functions -> find

  In mongo shell, keys that require dot notation must be enclosed in quotes.

  find returns cursor of list of documents matching the given selection filters.

  * find(queryObjectJSON) - query object json contains key value pairs where they act as selectors, i.e. keys are fields we are interested in, and values are the values of the fields that we are interested in.

  e.g.
  ```
  db.movies.find({ "mpaaRating": "PG-13", year: 2009 });
  ```
  For querying of nested fields, use dot notation (string field names together using dot notation) for embedded documents.
  e.g.
  ```
  db.data.find({ "wind.direction.angle": 290 });
  ```

  Matching for array fields: 
  1. Literal matching: we provide exact array we want to match.
  2. Item matching: we provide item, and query returns all docs arrays that contain that items.
  3. Positional matching: we provide exact position and item in array we want to match.

  e.g. For e.g. cast in movie is usually a field whose value is array of strings