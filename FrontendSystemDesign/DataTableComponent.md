
## Functional requirements

1. Data fetching responsibility ? No
2. different data types: string, number, date
3. Custom renderer for cells
4. Sort (on column)
5. search (by some query)
6. optional - export to CSV
7. column and table level config

**Clarify** - pagination controls or not?

## Non-functional Requirements

1. performance with large data set - via virtualization?

## API surface

```ts
type DataTableProps<T = object> = {
    data: T[]; // all rows, each row is an object
    columnConfig: TColumnConfig
}

type TColumnConfig<T> {
    name: string;
    sortable: boolean;
    colType: 'string'|'number'|'date';
    show: boolean;
    comparator ?: function;
    renderer: (datum: T) => HTMLElement;// can be row datum or cell datum
}
```

### Column config

1. hide/show column
2. name of column
3. sortable/not sortable
4. custom comparator

**Custom column cell renderer** - usually custom renderer will be specified at a column level instead of cell level.
Although one can check specific data in col renderer and return different elements.
