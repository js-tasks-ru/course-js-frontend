import Main from './components/main/index.js'
import Router from './lib/router.js';

let main = new Main();
document.body.append(main.elem);

let router = Router.instance();

router
  .addRoute(/^$/, 'dashboard')
  // .addRoute(/^products$/, 'products/list')
  // .addRoute(/^products\/add$/, 'products/edit')
  // .addRoute(/^products\/([\w()-]+)$/, 'products/edit')
  // .addRoute(/^sales$/, 'sales')
  // .addRoute(/^categories$/, 'categories')
  // .addRoute(/^404\/?$/, 'error404')
  .setNotFoundPagePath('error404')
  .listen();

