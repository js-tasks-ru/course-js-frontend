export default {
  title: "ID",
  compare(a, b) {
    return a.id - b.id;
  },
  render(row) {
    return String(row.id);
  }
}
