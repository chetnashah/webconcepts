
## Foreign Key is name given to key referencing primary key of another table

A foreign key is a field (or collection of fields) in one table that uniquely identifies a row of another table. The purpose of the foreign key is to ensure referential integrity of the data. In simpler terms, only values that are supposed to appear in the database are permitted.


## Child/Referencing table

The table containing the foreign key is called the child table or referencing table. It is the table that references the primary key of another table (the parent table).

### Referential integrity constraints on the child table

Referential integrity constraints ensure that the foreign key value in the child table must match a primary key value in the parent table or be null. This means:

- **Insertion constraint** - You cannot insert a row into the child table with a foreign key value that does not exist in the parent table.
- **Update Constraint**: Similarly, you cannot update the foreign key value of an existing row in the child table to a value that does not have a corresponding primary key in the parent table

## Parent/Referenced table

The table containing the candidate key is called the parent table or referenced table. It is the table that is referenced by another table (the child table).

### Referential integrity constraints on the parent table

- **Deletion constraint** - You cannot delete a row from the parent table if there are matching rows in the child table (unless you first delete those rows or set the foreign key to null).
- **Update constraint** - You cannot update the primary key value of a row in the parent table if there are matching rows in the child table (unless you first update those rows to null or to a new valid foreign key value).

## Referential actions
Referential actions define what happens to the foreign key values in the child table when the corresponding primary key value in the parent table is updated or deleted. Common referential actions include:

1. **ON DELETE CASCADE**: If a row in the parent table is deleted, all corresponding rows in the child table are also automatically deleted.  This is useful when the child records are entirely dependent on the parent record.

2. **ON DELETE SET NULL**: When a row in the parent table is deleted, the foreign key values in the corresponding rows of the child table are set to NULL.  This is appropriate when the relationship is optional, and the child record can exist without being linked to a parent record. This requires the foreign key column to be nullable.

3. **ON DELETE RESTRICT / NO ACTION**: This is often the default behavior. It prevents the deletion of a row in the parent table if any rows in the child table reference it.  RESTRICT checks the constraint immediately, while NO ACTION might defer the check until the end of the transaction in some database systems.

4. **ON UPDATE CASCADE**: If the primary key value in the parent table is updated, the corresponding foreign key values in the child table are automatically updated to the new value.  This helps maintain the relationship if a primary key needs to be changed.

5. **ON DELETE SET DEFAULT**: All the values that make up the foreign key are set to their default values if the corresponding row in the parent table is updated or deleted. For this constraint to execute, all foreign key columns must have default definitions. If a column is nullable, and there's no explicit default value set, NULL becomes the implicit default value of the column.



