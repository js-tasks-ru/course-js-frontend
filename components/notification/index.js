import createElement from "../../lib/create-element.js";

const TIMEOUT_DEFAULT = 3000;
const TIMEOUT_SLOW = 5000;
const TIMEOUT_FAST = 1500;

let lastNotification;

class Notification {

  // type = success | info | error
  constructor(html, type, timeout) {
    this.elem = createElement(`<div class="notification notification_${type}">
      <div class="notification__content">${html}</div>
    </div>`);

    if (lastNotification) {
      lastNotification.close();
    }

    lastNotification = this;

    document.body.append(this.elem);
    this.elem.classList.add('show');

    switch(timeout) {
    case undefined:
      this.timeout = this.getDefaultTimeout();
      break;
    case 'slow':
      this.timeout = TIMEOUT_SLOW;
      break;
    case 'fast':
      this.timeout = TIMEOUT_FAST;
      break;
    default:
      this.timeout = timeout;
    }

    setTimeout(() => this.close(), this.timeout);
  }

  getDefaultTimeout() {
    return TIMEOUT_DEFAULT;
  }

  close() {
    if (!this.elem.parentNode) return; // already closed (by user click?)
    this.elem.remove();
  }

}

/*
export class InfoNotification extends Notification {

  constructor(html, timeout) {
    super(html, 'info', timeout);
  }

}

export class WarningNotification extends Notification {

  constructor(html, timeout) {
    super(html, 'warning', timeout);
  }
}
 */

export class SuccessNotification extends Notification {
  constructor(html, timeout) {
    super(html, 'success', timeout);
  }
}

export class ErrorNotification extends Notification {
  getDefaultTimeout() {
    return TIMEOUT_SLOW;
  }

  constructor(html, timeout) {
    super(html, 'error', timeout);
  }
}
