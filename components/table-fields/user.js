import escapeHtml from "../../lib/escape-html.js";

export default {
  compare(a, b) {
    return a.user.localeCompare(b.user);
  },
  title: "User",
  render(row) {
    return escapeHtml(String(row.user))
  }
}
