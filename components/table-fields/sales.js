import escapeHtml from "../../lib/escape-html.js";

export default {
  compare(a, b) {
    return a.sales - b.sales;
  },
  title: "Sales",
  render(row) {
    return escapeHtml(String(row.sales))
  }
}
