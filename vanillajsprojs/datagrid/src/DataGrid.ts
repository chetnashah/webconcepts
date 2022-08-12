type ColumnConfig = {
    name: string;
    field: string;
}
type RowData = {
    [key: string]: Object
};

type RowRenderer = (rowIdx: number, data: Object, rowData: RowData) => HTMLElement;

type CellRenderer = (rowIdx: number, colIdx: number, data: Object) => HTMLElement;

const throttle = (func, limit) => {
    let inThrottle
    return function () {
        const args = arguments
        const context = this
        if (!inThrottle) {
            func.apply(context, args)
            inThrottle = true
            setTimeout(() => inThrottle = false, limit)
        }
    }
}


export class DataGrid {
    container: HTMLElement;
    columnConfigs: Array<ColumnConfig>;
    rowRenderer: RowRenderer;
    cellRenderer: CellRenderer;
    rowHeight: number;
    rowBufferNum: number;
    data: Array<Object>;

    currentRowNumVisibleStart: number;
    currentRowNumVisibleEnd: number;
    numRowsShownOnClient: number;
    throttledUpdateOnScroll: Function;

    constructor(container: HTMLElement) {
        this.container = container;
        this.rowRenderer = this.defaultRowRenderer;
        this.cellRenderer = this.defaultCellRenderer;
        this.rowHeight = 42;
        this.rowBufferNum = 10;
        this.addListeners(container);
        this.currentRowNumVisibleStart = 0;
        this.numRowsShownOnClient = container.clientHeight / this.rowHeight;
        this.currentRowNumVisibleEnd = this.currentRowNumVisibleStart + this.numRowsShownOnClient;
        this.throttledUpdateOnScroll = throttle(this.updateRowsOnScroll, 500);
    }

    addListeners(container: HTMLElement) {
        container.addEventListener('scroll', (ev) => {
            // debugger;
            this.numRowsShownOnClient = Math.ceil(container.clientHeight / this.rowHeight);
            // console.log('this.numRowsShownOnClient = ', Math.ceil(this.numRowsShownOnClient));
            if (container.clientHeight + container.scrollTop + 15 > container.scrollHeight) {
                console.log('end reached');
                this.throttledUpdateOnScroll();
            }

            if (container.scrollTop <= 15) {
                this.throttledUpdateOnScroll();
            }
        });
    }

    deleteLastElementEverySecond() {
        setInterval(() => {
            const children = this.container.children;
            children[0].remove();
        }, 1000);
    }

    findFirstVisibleChild() {
        const children = this.container.children;
        for (let i = 0; i < children.length; i++) {
            const rect = children[i].getBoundingClientRect();
            // console.log('child bounding rect = ', rect);
            if (rect.top > 0) {
                return children[i];
                // console.log('top gtr than 0 child: ', children[i]);
            }
        }
    }

    updateRowsOnScroll() {
        // debugger;
        let childrenToRemove = [];
        const children = this.container.children;
        const firstVisibleChild: HTMLElement = this.findFirstVisibleChild();
        this.currentRowNumVisibleStart = parseInt(firstVisibleChild.dataset.idx);
        this.currentRowNumVisibleEnd = this.currentRowNumVisibleStart + this.numRowsShownOnClient;

        console.log(' this.currentRowNumVisibleStart = ', this.currentRowNumVisibleStart);

        for (let i = 0; i < children.length; i++) {
            if (children[i] != null) {
                if (children[i].dataset != null) {
                    console.log('parseInt(children[i].dataset.idx) =', parseInt(children[i].dataset.idx));
                    if (parseInt(children[i].dataset.idx) < this.currentRowNumVisibleStart - this.rowBufferNum) {
                        childrenToRemove.push(children[i]);
                    }
                    if (parseInt(children[i].dataset.idx) > this.currentRowNumVisibleEnd + this.rowBufferNum) {
                        childrenToRemove.push(children[i]);
                    }
                }
            }
        }
        const lastChildIdx = parseInt(children[children.length - 1].dataset.idx);
        console.log('lastChildIdx = ', lastChildIdx);
        const childrenToAdd = [];
        const childrenToPrepend = [];
        console.log('this.currentRowNumVisibleEnd + this.rowBufferNum = ' + (this.currentRowNumVisibleEnd + this.rowBufferNum));
        // children to add at the end
        for (let j = lastChildIdx + 1; j <= (this.currentRowNumVisibleEnd + this.rowBufferNum); j++) {
            childrenToAdd.push(this.defaultRowRenderer(j, this.data, this.data[j]));
        }
        // children to prepend
        const firstChild = children[0];
        const firstChildIdx = parseInt(firstChild.dataset.idx);
        for (let k = firstChildIdx; k >= this.currentRowNumVisibleStart - this.rowBufferNum; k--) {
            childrenToPrepend.push(this.defaultRowRenderer(k, this.data, this.data[k]));
        }
        for (let k = 0; k < childrenToRemove.length; k++) {
            childrenToRemove[k].remove();

        }
        console.log('children to remove = ', childrenToRemove);
        console.log('children to add = ', childrenToAdd);
        this.container.append(...childrenToAdd);
        for (let j = 0; j < childrenToPrepend.length; j++) {
            this.container.children[0].insertAdjacentElement('beforebegin', childrenToPrepend[j]);
        }
    }

    setColumns(columnConfigs: Array<ColumnConfig>) {
        this.columnConfigs = columnConfigs;
    }

    defaultRowRenderer(rowIdx: number, data: Object, rowData: RowData) {
        const el = document.createElement('div');
        el.style.height = `${this.rowHeight}px`;
        el.dataset.idx = `${rowIdx}`;
        el.classList.add('row');

        for (let j = 0; j < this.columnConfigs.length; j++) {
            const field = this.columnConfigs[j].field;
            const cell = this.defaultCellRenderer(rowIdx, j, rowData[field]);
            el.appendChild(cell);
        }
        return el;
    }

    defaultCellRenderer(rowIdx: number, colIdx: number, cellData: Object) {
        const el = document.createElement('span');
        el.classList.add('cell');
        el.textContent = `r = ${rowIdx}, c = ${colIdx}, data = ${cellData}`;
        return el;
    }

    setData(data: Array<Object>) {
        // this.container.scrollHeight = data.length * this.rowHeight;
        this.data = data;
        this.container.innerHTML = ``;
        const slicedRows = data.slice(this.currentRowNumVisibleStart, this.currentRowNumVisibleEnd + this.rowBufferNum);
        console.log(slicedRows);
        const allRows = slicedRows.map((dataItem, idx) => this.rowRenderer(idx, data, dataItem));
        this.container.append(...allRows);

        // this.deleteLastElementEverySecond();
    }
}

