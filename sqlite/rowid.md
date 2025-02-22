
## rowid is a secret primary key in every table (not user declared!)

Aliases include `rowid`, `oid`, `_rowid_`
**Do not rely on these, can be unstable**

```
sqlite> create table sample(s integer); // Note: We did not declare rowid while creating table
sqlite> insert into sample values (1),(1),(1);
sqlite> select rowid, s from sample;
┌───────┬───┐
│ rowid │ s │
├───────┼───┤
│ 1     │ 1 │
│ 2     │ 1 │
│ 3     │ 1 │
└───────┴───┘
sqlite> select rowid, oid, s from sample;
┌───────┬───────┬───┐
│ rowid │ rowid │ s │
├───────┼───────┼───┤
│ 1     │ 1     │ 1 │
│ 2     │ 2     │ 1 │
│ 3     │ 3     │ 1 │
└───────┴───────┴───┘
```

Also, one of the reasons why primary key is not mandatory in every table

## Common practice - declare a "id integer primary key" to alias to rowid

If you declare a column as `id integer primary key`, `rowid` will be automatically aliased to this `id` column.

```
sqlite> create table example_id (id integer primary key);

sqlite> insert into example_id values (1),(1); // primary key still holds!
Runtime error: UNIQUE constraint failed: example_id.id (19)
sqlite> insert into example_id values (1),(2),(5);
sqlite> select rowid, id from example_id;
┌────┬────┐
│ id │ id │
├────┼────┤
│ 1  │ 1  │
│ 2  │ 2  │
│ 5  │ 5  │
└────┴────┘
```
**Gotcha** - (null)s are implicitly converted to auto incrementing integers:
```
sqlite> insert into example_id values (null);
sqlite> insert into example_id values (null);
sqlite> insert into example_id values (null);
sqlite> select * from example_id;
┌────┐
│ id │
├────┤
│ 1  │
│ 2  │
│ 5  │
│ 6  │
│ 7  │
│ 8  │
└────┘
```
Inserting other value type gives us datatype mismatch:
```
sqlite> insert into example_id values ('hi');
Runtime error: datatype mismatch (20)
```