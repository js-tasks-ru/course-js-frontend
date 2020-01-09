export default async function(path, match) {
  let loaded = false;

  // only show page-level loading after 100ms (to avoid blinking)
  setTimeout(() => {
    if (!loaded) {
      document.querySelector('main').classList.add('is-loading');
    }
  }, 100);

  const {default: Page} = await import(`/pages/${path}/index.js`);
  const page = new Page(match);

  const renderedPage = await page.render();

  loaded = true;

  document.querySelector('main').classList.remove('is-loading');

  const contentNode = document.querySelector('#content');
  contentNode.innerHTML = '';
  contentNode.appendChild(renderedPage);

  return page;
}
