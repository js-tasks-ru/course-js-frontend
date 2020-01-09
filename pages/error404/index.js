import createElement from "../../lib/create-element.js";

export default class {
  async render() {
    this.elem = createElement(`<div class="error-404">
      <h1 class="page-title">Page not found</h1>
      <p>No such page, sorry.</p>
    </div>
    `);

    return this.elem;
  }
}
