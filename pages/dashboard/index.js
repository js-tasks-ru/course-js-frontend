import RangePicker from "../../components/range-picker/index.js";
import ColumnChart from "../../components/column-chart/index.js";
import formatMoney from "../../lib/format-money.js";
import createElement from "../../lib/create-element.js";
import ProductsTable from "/components/products-table/index.js";

export default class DashboardPage {

  section = "dashboard";

  render() {
    this.elem = createElement(`<div class="dashboard">
      <div class="content__top-panel"><h2 class="page-title">Dashboard</h2></div>
    </div>`);

    let range = {
      from: new Date(Date.now() - 30 * 86400e3),
      to:   new Date()
    };

    this.rangePicker = new RangePicker(range);

    this.rangePicker.elem.addEventListener("date-select", event => this.onRangePickerUpdate());

    this.elem.firstElementChild.append(this.rangePicker.elem);

    let chartsContainer = document.createElement('div');
    chartsContainer.className = 'dashboard__charts';
    this.elem.append(chartsContainer);

    this.ordersChart = new ColumnChart({
      url: '/api/dashboard/orders',
      range,
      height: 200,
      name: 'orders',
      title: 'Total orders',
      link: '/sales',
      formatHeading: sumObjectValues,
      formatTooltip: (date, value) => `<div><small>${date.toLocaleString('en', {dateStyle: 'medium'})}</small></div><strong>${value}</strong>`
    });


    this.salesChart = new ColumnChart({
      url: '/api/dashboard/sales',
      range,
      height: 200,
      name: 'sales',
      title: 'Total sales',
      formatHeading: chartData => `$` + formatMoney(sumObjectValues(chartData)),
      formatTooltip: (date, value) => `<div><small>${date.toLocaleString('en', {dateStyle: 'medium'})}</small></div><strong>$${formatMoney(value)}</strong>`
    });

    this.customersChart = new ColumnChart({
      url: '/api/dashboard/customers',
      range,
      height: 200,
      name: 'customers',
      title: 'Total customers',
      formatHeading: sumObjectValues,
      formatTooltip: (date, value) => `<div><small>${date.toLocaleString('en', {dateStyle: 'medium'})}</small></div><strong>${value}</strong>`
    });


    chartsContainer.append(this.ordersChart.elem);
    chartsContainer.append(this.salesChart.elem);
    chartsContainer.append(this.customersChart.elem);

    this.bestsellersTable = new ProductsTable({
      url: `/api/dashboard/bestsellers?from=${range.from.toISOString()}&to=${range.to.toISOString()}`,
      fieldsEnabled: ['images', 'title', 'category', 'quantity', 'price', 'sales'],
      order: {
        field: 'title',
        direction: 1
      }
    });

    this.elem.insertAdjacentHTML('beforeEnd', `<h3 class="block-title">Best sellers</h3>`);
    this.elem.append(this.bestsellersTable.elem);

    return this.elem;

  }

  onRangePickerUpdate() {
    let range = this.rangePicker.getValue();
    this.ordersChart.setRange(range);
    this.salesChart.setRange(range);
    this.customersChart.setRange(range);
    this.bestsellersTable.setUrl(`/api/dashboard/bestsellers?from=${range.from.toISOString()}&to=${range.to.toISOString()}`);
  }
}

function sumObjectValues(obj) {
  return Object.values(obj).reduce((a, b) => a + b, 0);
}


