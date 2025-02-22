
## Primary key will not prevent multiple null insertions!

You must do both 'primary key' and 'not null' to avoid adding multiple nulls in primary key column.

```
sqlite> create table example_uuid (uuid text primary key);
sqlite> insert into example_uuid values ('1234-1234');
sqlite> select * from example_uuid;
┌───────────┐
│   uuid    │
├───────────┤
│ 1234-1234 │
└───────────┘
sqlite> insert into example_uuid values ('1234-1234'); // OK, not allowed same value multiple times
Runtime error: UNIQUE constraint failed: example_uuid.uuid (19)
sqlite> insert into example_uuid values (null);
sqlite> select * from example_uuid;
┌───────────┐
│   uuid    │
├───────────┤
│ 1234-1234 │
│           │
└───────────┘
sqlite> insert into example_uuid values (null); // WEIRD! adding multiple nulls in primary col
sqlite> insert into example_uuid values (null);
sqlite> select * from example_uuid;
┌───────────┐
│   uuid    │
├───────────┤
│ 1234-1234 │
│           │
│           │
│           │
└───────────┘
```

## Restricting nullability insertion into a column

Yes, you can prevent NULL values in SQLite columns using the `NOT NULL` constraint when creating tables:

```sql
CREATE TABLE example (
    id INTEGER PRIMARY KEY,
    required_field TEXT NOT NULL,
    optional_field TEXT
);
```

You can also add the constraint to existing tables:

```sql
ALTER TABLE example 
ADD COLUMN new_required_field TEXT NOT NULL DEFAULT 'some_value';
```

Note: When adding NOT NULL to existing columns, you must provide a DEFAULT value since there might be existing rows.

Would you like me to explain more about SQLite constraints?