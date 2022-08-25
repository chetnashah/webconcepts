

## Functional requirements

1. Create/save/edit spreadsheet (entity)
2. cells (infinite) with numbering in rows and columns
3. filter rows based on column values
4. specify column data type and formatting
5. serialize/deserialize -> Export/import - as Csv
6. formula parsing -> dependency analysis and reactivity from source to sinks
7. Pan/scroll horizontal and vertical
8. optional - shared editing
9. optional - adjustable column width
10. optional - rows (overflow cut vs wrap content in row)


## Non-functional requirements

1. performance (via virtualization)
2. Offline experience
3. Accessibility


### Virtualization analysis

Without virtualization: 26 cols x 10000 rows = 260000 elements which is a lot

* Vertical virtualization is definitely necessary.
* Unless we have more than 100 columns, horizontal virtualization is not necessary.


Page size (i.e .view port row count) =  X.
Total no of initialized elements = 2*X, i.e. X/2 buffer rows on each side (top and bottom).

**Using intersection observer** based virtualization

**Absolute positioning used** - because browser reflow on adding/deleting elements is costly/expensive.

**Rows DOM reusing** - recycle previously created elements. example: viewport is at 2N to 3N rows, 1N-2N rows are part of top buffer, then 1-1N rows are recycled to populate 3N-4N rows as bottom buffer.

**Scrollbar height and empty padding block** - 


## Formula and dependency analysis

Check for cyclic dependencies and report erros

Topological ordering for reactive execution from sources to sinks in the formula.

## State management

Each cell has an address (or think id) which can be ROWNUM_COLNUM e.g. 1_A

`Change capture` - listener on top level to save on memory, 
i.e. not setting a listener for all individual cell.

have data attribute on each tablecell element with cell address. This helps in checking which cell had the event.

```ts
type TableState {
    cells: Map<String, TableCell> //map storing cell address to actual content
}

type TableCell {
    address: string;// address can be ROWNUM_COLNUM
    calculatedValue: string;
    formula: string;
    type: TableCellType
}
```