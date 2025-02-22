## can create table with no data types


```sqlite
create table ex(a,b,c);
```

## Declared column type (Serves as a hint for conversion while storing, but never enforced!)

- The declared type serves as a suggestion or a hint to SQLite about how you intend to use the data, but it does not restrict the actual data that can be stored in that column.
- To find actual value type for the cell use typeof(cell) operator

## Type is applied at the cell (i.e. data) level, not column level

Although we do give a type when creating a table for the column, it is not constraint.
It will gladly accept what you give it. 
it will try to convert based on affinity(i.e. your declared type), 
if it cannot convert, it will still keep it.

A good example to get value types for each cell is use typeof -

```
select a, typeof(a), b, typeof(b) from ex2table;
```

## Five actual types - BRINT

**Note** - there is not "boolean", "datetime" type.

i.e
B - blob 
R - Real
I - Integer
N - Null
T - Text

## Getting table schema info (originally declared column types)

```
sqlite> .schema ex2
CREATE TABLE ex2(a integer, b text);
sqlite> pragma table_info(ex2);
┌─────┬──────┬─────────┬─────────┬────────────┬────┐
│ cid │ name │  type   │ notnull │ dflt_value │ pk │
├─────┼──────┼─────────┼─────────┼────────────┼────┤
│ 0   │ a    │ INTEGER │ 0       │            │ 0  │
│ 1   │ b    │ TEXT    │ 0       │            │ 0  │
└─────┴──────┴─────────┴─────────┴────────────┴────┘
```

## typeof operator

Yes, the `typeof` operator in SQLite operates at the cell level, which means it evaluates the actual data stored in each cell of a table rather than the declared data type of the column. This distinction is important for understanding how SQLite handles data types.

## Strict tables

`strict` modifier can be applied at a table level for strict typing

```
sqlite> create table tbs (i integer, t text) strict;
sqlite> insert into tbs values(1,1); // still allowed, 1 can be converted to text
sqlite> insert into tbs values('a','1'); // ERROR! 'a' cannot be converted to integer
Runtime error: cannot store TEXT value in INTEGER column tbs.i (19)
```
When creating strcit tables, you 

## Any type

Allowed even in strict tables!
Can be used to declare `any` type.
```
sqlite> create table kv(key text, value any) strict;
sqlite> insert into kv values('hi', 123);
sqlite> insert into kv values('hey', 'hello');
sqlite> insert into kv values(2, 'jj');
sqlite> select * from kv;
┌─────┬───────┐
│ key │ value │
├─────┼───────┤
│ hi  │ 123   │
│ hey │ hello │
│ 2   │ jj    │
└─────┴───────┘
sqlite> select key, typeof(key), value, typeof(value) from kv;
┌─────┬─────────────┬───────┬───────────────┐
│ key │ typeof(key) │ value │ typeof(value) │
├─────┼─────────────┼───────┼───────────────┤
│ hi  │ text        │ 123   │ integer       │
│ hey │ text        │ hello │ text          │
│ 2   │ text        │ jj    │ text          │
└─────┴─────────────┴───────┴───────────────┘
```