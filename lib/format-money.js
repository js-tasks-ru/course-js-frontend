export default function formatMoney(amount) {
  return String(amount).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
}
