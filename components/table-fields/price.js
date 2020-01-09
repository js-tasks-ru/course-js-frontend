import formatMoney from "../../lib/format-money.js";

export default {
  title: "Price",
  compare(a, b) {
    return a.price - b.price;
  },
  render(row) {
    return `$${formatMoney(+row.price)}`;
  }
}
