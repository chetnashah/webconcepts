
https://www.youtube.com/watch?v=BAiQq_u2pd8

## Exists takes subquery and evaluates to true if subquery returns any rows

**Note** - exists is run till any row is found (not all the way to completion), so it can be more efficient than IN for large datasets.

Also useful in cases where you do not want columns from another table, but some condition on that table for filtering via exists.

Usually `Exists` is used in the `WHERE` clause to filter rows based on the existence of related data in another table


