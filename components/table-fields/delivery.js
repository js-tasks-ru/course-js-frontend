import escapeHtml from "../../lib/escape-html.js";

export default {
  compare(a, b) {
    return a.delivery - b.delivery;
  },
  title: "Status",
  render(row) {
    return escapeHtml(String(row.delivery))
  }
}
