import formatMoney from "../../lib/format-money.js";

export default {
  compare(a, b) {
    return a.totalCost - b.totalCost;
  },
  title: "Total",
  render(row) {
    return `$${formatMoney(+row.totalCost)}`;
  }
}
