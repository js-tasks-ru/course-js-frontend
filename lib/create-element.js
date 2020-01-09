// nice overview:
// https://grrr.tech/posts/create-dom-node-from-html-string/

// no IE11
const supportsTemplate = ("content" in document.createElement("template"));

let createElement = supportsTemplate ?
    function(html) {
      const template = document.createElement('template');
      template.innerHTML = html;
      return template.content.firstElementChild;
    } :
    function(html) {
      const div = document.createElement('div');
      div.innerHTML = html;
      return div.firstElementChild;
    };

export default createElement;
