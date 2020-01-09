import createElement from "../../lib/create-element.js";

export default class Main {

  links = [
    {href: '/', page: 'dashboard', title: 'Dashboard'},
    {href: '/products', page: 'products', title: 'Products'},
  ];

  constructor() {
    this.render();
  }

  render() {
    this.elem = createElement(`<main class="main">
      <div class="progress-bar">
        <div class="progress-bar__line"></div>
      </div>
      <aside class="sidebar">
        <h2 class="sidebar__title"><a href="/">shop admin</a></h2>
        <ul class="sidebar__nav">
          ${this.links.map(link => `<li><a href="${link.href}" data-page="${link.page}"><i class="icon-${link.page}"></i> <span>${link.title}</span></a></li>`).join('')}
        </ul>
        <ul class="sidebar__nav sidebar__nav_bottom">
          <li><button type="button" class="sidebar__toggler"><i class="icon-toggle-sidebar"></i> <span>Toggle sidebar</span></button></li>
        </ul>
      </aside>
      <section class="content" id="content"></section>
    </main>`);

    this.elem.querySelector(".sidebar__toggler").addEventListener('click', event => {
      event.preventDefault();
      this.toggleSidebar()
    });

    document.addEventListener('route', (event) => this.onRoute(event));
  }

  onRoute(event) {
    let previousActiveLink = this.elem.querySelector(`.sidebar__nav li.active`);
    if (previousActiveLink) previousActiveLink.classList.remove('active');

    for(let link of this.elem.querySelectorAll(`.sidebar__nav a[data-page]`)) {
      if (event.detail.page && link.dataset.page === event.detail.page.section) {
        link.closest('li').classList.add('active');
      }
    }
  }

  toggleSidebar() {
    document.body.classList.toggle('is-collapsed-sidebar');
  }
};
