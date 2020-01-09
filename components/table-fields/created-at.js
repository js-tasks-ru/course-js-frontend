export default {
  title: "Date",
  compare(a, b) {
    return a.createdAt - b.createdAt;
  },
  render(row) {
    return new Date(row.createdAt).toLocaleString('en', {dateStyle: 'medium'});
  }
}
