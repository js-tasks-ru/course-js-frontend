import escapeHtml from "../../lib/escape-html.js";

export default {
  title: "Quantity",
  compare(a, b) {
    return a.quantity - b.quantity;
  },
  render(row) {
    return escapeHtml(String(row.quantity))
  }
}
