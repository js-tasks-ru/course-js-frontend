import createElement from "../../lib/create-element.js";

export default class RangePicker {

  constructor({from, to}) {
    this.onSelectorClick = this.onSelectorClick.bind(this);
    this.onDocumentClick = this.onDocumentClick.bind(this);

    this.showDateFrom = new Date(to);
    this.showDateFrom.setMonth(to.getMonth() - 1);

    this.selected = {from, to};
    this.render();

    this.selectingFrom = true;
  }

  getDay(date) { // get day number from 0 (monday) to 6 (sunday)
    let day = date.getDay();
    return day === 0 ? 6 : (day - 1); // make Sunday (0) the last day
  }

  destroy() {
    this.elem.remove();
    document.removeEventListener('click', this.onDocumentClick);
  }

  render() {
    let elem = this.elem = createElement(`<div class="rangepicker">
      <div class="rangepicker__input" data-elem="input">
        <span data-elem="from">${this.selected.from.toLocaleString('default', {dateStyle: 'short'})}</span> -
        <span data-elem="to">${this.selected.to.toLocaleString('default', {dateStyle: 'short'})}</span>
      </div>
      <div class="rangepicker__selector" data-elem="selector"></div>
    </div>`);

    elem.onmousedown = () => false;

    this.elems = {};
    for (let subElem of elem.querySelectorAll('[data-elem]')) {
      this.elems[subElem.dataset.elem] = subElem;
    }

    this.elems.input.onclick = () => this.toggle();

    this.elems.selector.addEventListener('click', this.onSelectorClick);

    document.addEventListener('click', this.onDocumentClick, true);
  }

  onDocumentClick(event) {
    if (!this.isOpen()) return;
    if (this.elem.contains(event.target)) return;
    this.close();
  }

  isOpen() {
    return this.elem.classList.contains('rangepicker_open');
  }

  open() {
    if (this.isOpen()) {
      return;
    }
    this.toggle();
  }

  toggle() {
    this.elem.classList.toggle('rangepicker_open');
    this.renderSelector();
  }

  close() {
    this.elem.classList.remove('rangepicker_open');
  }

  renderSelector() {
    let showDate1 = new Date(this.showDateFrom);
    let showDate2 = new Date(this.showDateFrom);
    showDate2.setMonth(showDate2.getMonth() + 1);

    this.elems.selector.innerHTML = `
      <div class="rangepicker__selector-arrow"></div>
      <div class="rangepicker__selector-control-left"></div>
      <div class="rangepicker__selector-control-right"></div>
      ${this.renderCalendar(showDate1)}
      ${this.renderCalendar(showDate2)}
    `;

    this.elems.selector.querySelector('.rangepicker__selector-control-left').onclick = () => this.prev();
    this.elems.selector.querySelector('.rangepicker__selector-control-right').onclick = () => this.next();
    this.renderHighlight();
  }

  prev() {
    this.showDateFrom.setMonth(this.showDateFrom.getMonth() - 1);
    this.renderSelector();
  }

  next() {
    this.showDateFrom.setMonth(this.showDateFrom.getMonth() + 1);
    this.renderSelector();
  }


  renderHighlight() {

    for (let cell of this.elem.querySelectorAll('.rangepicker__cell')) {
      cell.classList.remove('rangepicker__selected-from');
      cell.classList.remove('rangepicker__selected-between');
      cell.classList.remove('rangepicker__selected-to');
      if (this.selected.from && cell.dataset.value === this.selected.from.toISOString()) {
        cell.classList.add('rangepicker__selected-from');
      } else if (this.selected.to && cell.dataset.value === this.selected.to.toISOString()) {
        cell.classList.add('rangepicker__selected-to');
      } else if (this.selected.from && this.selected.to &&
        new Date(cell.dataset.value) >= this.selected.from && new Date(cell.dataset.value) <= this.selected.to) {
        cell.classList.add('rangepicker__selected-between');
      }
    }

    if (this.selected.from) {
      let selectedFromElem = this.elem.querySelector(`[data-value="${this.selected.from.toISOString()}"]`);
      if (selectedFromElem) {
        selectedFromElem.closest('.rangepicker__cell').classList.add('rangepicker__selected-from');
      }
    }

    if (this.selected.to) {
      let selectedToElem = this.elem.querySelector(`[data-value="${this.selected.to.toISOString()}"]`);
      if (selectedToElem) {
        selectedToElem.closest('.rangepicker__cell').classList.add('rangepicker__selected-to');
      }
    }

  }

  renderCalendar(showDate) {

    let date = new Date(showDate);
    date.setDate(1);

    // text-transform: capitalize
    let monthStr = date.toLocaleString('en', {month: 'long'});

    let table = `<div class="rangepicker__calendar">
      <div class="rangepicker__month-indicator">
        <time datetime=${monthStr}>${monthStr}</time>
      </div>
      <div class="rangepicker__day-of-week">
        <div>Пн</div><div>Вт</div><div>Ср</div><div>Чт</div><div>Пт</div><div>Сб</div><div>Вс</div>
      </div>
      <div class="rangepicker__date-grid">
    `;

    // first day of month starts after a space
    // * * * 1 2 3 4
    table += `<button type="button" class="rangepicker__cell" data-value="${date.toISOString()}" style="--start-from: ${this.getDay(date) + 1}">${date.getDate()}</button>`;
    date.setDate(2);

    while (date.getMonth() === showDate.getMonth()) {
      table +=  `<button type="button" class="rangepicker__cell" data-value="${date.toISOString()}">${date.getDate()}</button>`;

      date.setDate(date.getDate() + 1);
    }

    // close the table
    table += '</div></div>';

    return table;
  }

  onSelectorClick(event) {
    if (event.target.classList.contains('rangepicker__cell')) {
      this.onRangePickerCellClick(event);
      return;
    }
  }

  getValue() {
    // clone date objects
    return {
      from: new Date(this.selected.from),
      to: new Date(this.selected.to)
    };
  }

  onRangePickerCellClick(event) {
    let cell = event.target;
    let value = cell.dataset.value;
    if (!value) return;

    value = new Date(value);

    if (this.selectingFrom) {
      this.selected = {
        from: value,
        to:   null
      };
      this.selectingFrom = false;
      this.renderHighlight();
    } else {
      if (value > this.selected.from) {
        this.selected.to = value;
      } else {
        this.selected.to = this.selected.from;
        this.selected.from = value;
      }
      this.selectingFrom = true;
      this.renderHighlight();
    }

    if (this.selected.from && this.selected.to) {
      this.elem.dispatchEvent(new CustomEvent("date-select", {
        bubbles: true,
        detail:  this.selected
      }));
      this.close();
      this.elems.from.innerHTML = this.selected.from.toLocaleString('en', {dateStyle: 'short'});
      this.elems.to.innerHTML = this.selected.to.toLocaleString('en', {dateStyle: 'short'});
    }

  }

};
