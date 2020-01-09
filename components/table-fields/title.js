import escapeHtml from "../../lib/escape-html.js";

export default {
  title: "Name",
  compare(a, b) {
    return a.title.localeCompare(b.title);
  },
  render(row) {
    return escapeHtml(String(row.title))
  }
}
