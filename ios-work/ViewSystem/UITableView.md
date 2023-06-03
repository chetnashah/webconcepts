

##

UITableView manages the basic appearance of the table, but your app provides the cells (`UITableViewCell` objects) that display the actual content.

Table views manage only the presentation of their data; they don’t manage the data itself

## Important protocol: UITableViewDataSource

To manage the data, you provide the table with a data source object — an object that implements the UITableViewDataSource protocol.

This protocol implement data sourcing for the tableview.

responsibilities of the data source object include:
1. (Required) Reporting the number of sections and rows in the table.
2. (Required) Providing cells for each row of the table.
3. Providing titles for section headers and footers.
4. Configuring the table’s index, if any.
5. Responding to user- or table-initiated updates that require changes to the underlying data.


