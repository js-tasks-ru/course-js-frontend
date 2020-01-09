import fetchJson from "../../lib/fetch-json.js";
import createElement from "../../lib/create-element.js";
import "../tooltip/index.js"

export default class ColumnChart {
  /**
   * @param data object {key: value}
   * @param height fixed height of the widget
   * @param name unique name, appended to the class
   * @param title
   * @param link
   * @param formatHeading function to format the header
   * @param formatTooltip function to format the tooltip
   */
  constructor({ url, range, height, name, title, link, formatHeading, formatTooltip }) {
    this.url = new URL(url, location.href);
    this.range = range;
    this.height = height;
    this.name = name;
    this.title = title;
    this.link = link;
    this.formatHeading = formatHeading;
    this.formatTooltip = formatTooltip;

    this.render();
  }

  async render() {
    this.elem = createElement(`<div class="column-chart dashboard__chart_${this.name}">
      <div class="column-chart__title">
        ${this.title}
        ${
          this.link ? `<a href="${this.link}" class="column-chart__link">View all</a>` : ``
        }
      </div>
      <div class="column-chart__container">
        <div class="column-chart__header"></div>
        <div class="column-chart__chart"></div>
      </div>
    </div>`);

    this.chartContainer = this.elem.querySelector('.column-chart__container');
    this.chartElem = this.elem.querySelector('.column-chart__chart');

    this.chartElem.addEventListener('mouseover', e => this.onChartMouseOver(e));
    this.chartElem.addEventListener('mouseout', e => this.onChartMouseOut(e));

    await this.update();
  }

  onChartMouseOver(event) {
    if (event.target.parentNode !== this.chartElem) {
      return; // click not on a column
    }

    let column = event.target;

    // not using :hover, as it's not supported on mobiles
    this.chartElem.classList.add('has-hovered');
    column.classList.add('is-hovered');
  }

  onChartMouseOut() {
    if (this.chartElem.classList.contains('has-hovered')) {
      this.chartElem.classList.remove('has-hovered');
      this.chartElem.querySelector('.is-hovered').classList.remove('is-hovered');
    }
  }

  setRange(range) {
    this.range = range;
    this.update();
  }

  async update() {
    // clear previous data if any
    this.chartElem.innerHTML = "";

    this.elem.classList.add(`column-chart_loading`);
    this.url.searchParams.set('from', this.range.from.toISOString());
    this.url.searchParams.set('to', this.range.to.toISOString());

    let chartData = await fetchJson(this.url);

    this.elem.classList.remove(`column-chart_loading`);

    let maxValue = Math.max(...Object.values(chartData));
    let scale = getComputedStyle(this.chartElem).getPropertyValue('--chart-height') / maxValue;

    let chartColumnsHtml = ``;
    for(let [date, value] of Object.entries(chartData)) {
      // console.log(this.height, Math.floor(value*scale));
      chartColumnsHtml += `<div style="--value:${Math.floor(value*scale)}" data-tooltip="${this.formatTooltip(new Date(date), value)}"></div>`
    }

    this.elem.querySelector('.column-chart__header').innerHTML = this.formatHeading(chartData);
    this.chartElem.innerHTML = chartColumnsHtml;
  }

};
