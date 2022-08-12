import { DataGrid } from './DataGrid';

document.addEventListener('DOMContentLoaded', () => {

  const container = document.getElementById('gridcontainer');

  if (container != null) {
    const dataGrid: DataGrid = new DataGrid(container);
    dataGrid.setColumns([{ name: 'one', field: 'make' }, { name: 'two', field: 'model' }, { name: 'three', field: 'price' }, { name: 'four', field: 'year' }]);
    const rowData = [
      { make: "Toyota", model: "Celica", price: 35000 },
      { make: "Ford", model: "Mondeo", price: 32000 },
      { make: "Porsche", model: "Boxster", price: 72000 }
    ];
    rowData.push(...rowData);
    rowData.push(...rowData);
    rowData.push(...rowData);
    rowData.push(...rowData);
    rowData.push(...rowData);
    rowData.push(...rowData);
    rowData.push(...rowData);

    rowData.push(...rowData);

    dataGrid.setData(rowData);
  }

});