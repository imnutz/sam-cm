var patch = require("snabbdom").init([ // Init patch function with choosen modules
  require('snabbdom/modules/class'), // makes it easy to toggle classes
  require('snabbdom/modules/props'), // for setting properties on DOM elements
  require('snabbdom/modules/style'), // handles styling on elements with support for animations
  require('snabbdom/modules/eventlisteners'), // attaches event listeners
]);
var h = require("snabbdom/h");

var header = require("./header");

var old = document.querySelector("#contact-manager");

var init = (model, actions) => {
    return h("div.contact-manager", [
        header.init(model.header, actions.header) 
    ]);
}

var display = (representation) => {
    old = patch(old, representation);
}

module.exports = { header, display, init };
