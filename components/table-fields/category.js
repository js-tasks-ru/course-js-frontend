import escapeHtml from "../../lib/escape-html.js";

export default {
  title: "Category",
  render(row) {
    let tooltip = `
        <div class="sortable-table-tooltip">
          <span class="sortable-table-tooltip__category">${escapeHtml(row.subcategory.category.title)}</span> /
          <b class="sortable-table-tooltip__subcategory">${escapeHtml(row.subcategory.title)}</b>
        </div>`;
    return `<span data-tooltip="${escapeHtml(tooltip)}">${escapeHtml(row.subcategory.title)}</span>`;
  }
}
