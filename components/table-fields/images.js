export default {
  title: "Image",
  render(row) {
    return row.images.length ? `<img class="sortable-table-image" alt="Image" src="${row.images[0].url}">` : '';
  }
}
