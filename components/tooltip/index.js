export default class TooltipBehavior {
  constructor() {
    this.onDocumentPointerMove = this.onDocumentPointerMove.bind(this);

    document.addEventListener('pointerover', event => this.onDocumentPointerOver(event));
    document.addEventListener('pointerout', event => this.onDocumentPointerOut(event));
  }

  static instance() {
    if (!this._instance) {
      this._instance = new TooltipBehavior();
    }
    return this._instance;
  }

  onDocumentPointerOver(event) {
    let anchorElem = event.target.closest('[data-tooltip]');

    if (!anchorElem) return;

    // показываем подсказку и запоминаем её
    this.showTooltip(anchorElem, anchorElem.dataset.tooltip);
    this.moveTooltip(event);

    document.addEventListener('pointermove', this.onDocumentPointerMove);
  }

  showTooltip(anchorElem, html) {
    this.elem = document.createElement('div');
    this.elem.className = 'tooltip';
    this.elem.innerHTML = html;
    document.body.append(this.elem);
  }

  moveTooltip(event) {
    let left = event.clientX + 10;
    let top = event.clientY + 10;
    if (left + this.elem.offsetWidth > document.documentElement.clientWidth) {
      left = document.documentElement.clientWidth - this.elem.offsetWidth;
    }

    if (top + this.elem.offsetHeight > document.documentElement.clientHeight) {
      top = document.documentElement.clientHeight - this.elem.offsetHeight;
    }

    this.elem.style.left = left + 'px';
    this.elem.style.top = top + 'px';
  }

  onDocumentPointerMove(event) {
    this.moveTooltip(event);
  }

  onDocumentPointerOut() {
    if (this.elem) {
      this.elem.remove();
      this.elem = null;
      document.removeEventListener('pointermove', this.onDocumentPointerMove);
    }
  }

}

TooltipBehavior.instance();
