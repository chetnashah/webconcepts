
## Creating and updating data in powerapps

As users run an app, they can create, modify, and delete records and push those changes back to the underlying table in the service.

Records can be created with the `Patch` and `Collect` functions.
Records can be modified with the `Patch`, `Update`, and `UpdateIf` functions.
Records can be removed with the `Remove` and `RemoveIf` functions.
Errors when working with a data source are available through the `Errors` function.

## Functions that return records

`FirstN`, `LastN` - Returns the first or last record or records of the table.
`Lookup` - Returns the first record from a table that matches one or more criteria.
`Patch` - Updates a data source or merges records.
`Defaults` - Returns the default values for a data source.

## Properties that return records:

`Selected` - Applies to galleries and list boxes. Returns the currently selected record.
`Updates` - Applies to galleries. Pulls together all the changes that a user makes in a data-entry form.
`Update` - Applies to input controls such as text-input controls and sliders. Sets up individual properties for the gallery to pull together.
