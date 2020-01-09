export default {
  compare(a, b) {
    return a.status - b.status;
  },
  title: "Status",
  render(row) {
    return row.status ? 'Enabled' : 'Disabled';
  }
}
