let patch = require("snabbdom").init([
    require('snabbdom/modules/class'),
    require('snabbdom/modules/props'),
    require('snabbdom/modules/style'),
    require('snabbdom/modules/eventlisteners')
]);

let h = require("snabbdom/h");
let theme = require("./theme");
let constants = require("./constants");

let vnode = document.querySelector("#app");

let view = {
    display: (representation) => {
        vnode = patch(vnode, representation);
    },

    ready: (model, actions) => {
        let content = theme.home();

        if(model.currentRoute === constants.ABOUT_PAGE) {
            content = theme.about();
        } else if(model.currentRoute === constants.CONTACTS_PAGE) {
            content = theme.contactList(model.contacts, actions);
        } else if(model.currentRoute === "editForm") {
            content = theme.contactForm(model.contact, false, actions);
        } else if(model.currentRoute === "addForm") {
            content = theme.contactForm({}, false, actions);
        }

        return h("div.contact-app", [
            theme.header(model.appName, model.menu, actions),
            content,
            theme.footer()
        ]);
    },

    init: (model, actions) => {
        return view.ready(model, actions);
    }
};

module.exports = view;
