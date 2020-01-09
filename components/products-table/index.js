import SortableTable from "/components/sortable-table/index.js";

export default class ProductsTable extends SortableTable {
    renderRow(row) {
        let url = `/products/${row.id}`;
        return `<a href="${url}" class="sortable-table__row">${this.renderRowContent(row)}</a>`;
    }
};
