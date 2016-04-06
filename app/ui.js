let patch = require("snabbdom").init([
  require('snabbdom/modules/class'),
  require('snabbdom/modules/props'),
  require('snabbdom/modules/style'),
  require('snabbdom/modules/eventlisteners'),
])

let h = require("snabbdom/h");

let theme = {
    makePage: (header, content, footer) => {
        return h("div.contact-manager-app", [
            header, content, footer
        ])
    },

    header: (title, links, actions) => {
        let makeLink = (link) => {
            let handler;
            if(link.title === "Contacts") {
                handler = actions.selectContactList
            } else if(link.title === "About") {
                handler = actions.selectAbout
            }

            return h("li", [
                h("a", {props: {href: link.href}, on: {click: handler}}, link.title)
            ])
        }

        return h("div#header", [
            h("h1", [
                h("a", {on: {click: actions.selectHome}}, title)
            ]),
            h("ul.menu", links.map(makeLink))
         ])
    },

    home: () => {
        return h("h1", "Welcome to Contact Manager!")
    },

    contactList: (currentCriteria, list, actions) => {
        return h("div.content", [
            theme.search(currentCriteria, actions),
            h("div.data-grid", [ theme.makeDataGrid(list, actions) ])
        ])
    },

    makeDataGrid: (list, actions) => {
        return h("table", [
            h("thead", [
                h("tr", theme.makeDataGridHeader(["First name", "Last name"]))
            ]),
            h("tbody", theme.makeDataGridRow(list, actions))
        ])
    },

    makeDataGridHeader: (headers) => {
        var gridHeaders = headers.map((header) => {
            return h("th", String(header))
        })

        gridHeaders.push(
            h("th", "")
        )

        return gridHeaders
    },

    makeDataGridRow: (list, actions) => {
        return list.map((row) => {
            return h("tr", [
                h("td", String(row.firstName)) ,
                h("td", String(row.lastName)),
                h("td", [
                    h("button", {on: {click: function() { actions.editContact(row.id); }}}, "Edit"),
                    h("button", {on: {click: function() { actions.deleteContact(row.id); }}}, "Delete")
                ])
            ])
        })
    },

    search: (currentCriteria, actions) => {
        return h("div.search", [
            h("input", {props: {type: "text", name:"criteria", value: currentCriteria}}),
            h("button", {on: {click: actions.placeholder}}, "Search")
        ])
    },

    editContact: (contact, formInvalid, actions) => {
        let firstName, lastName;

        let showError = Boolean(formInvalid)

        const setFirstName = (e) => {
            firstName = e.target.value;
        }
        const setLastName = (e) => {
            lastName = e.target.value;
        }

        let err = ""
        if(showError) {
            err = h("p", "Your form is invalid")
        }

        return h("div.edit-contact", [
            h("h3", "Edit contact: " + contact.firstName),
            err,
            h("div.form", [
                h("div.form-field", [
                    h("label", "First name"),
                    h("input", {props: {value: contact.firstName}, on: {change: setFirstName}})
                ]),
                h("div.form-field", [
                    h("label", "Last name"),
                    h("input", {props: {value: contact.lastName}, on: {change: setLastName}})
                ]),
                h("div.btns", [
                    h("button", {on:{click: function() { actions.updateContact({ editId: contact.id, firstName, lastName}); }}}, "Save"),
                    h("button", "Cancel")
                ])
            ])
        ])
    },

    footer: () => {
        return h("div#footer", "Copyright(C) Son Do")
    },

    about: () => {
        return h("div.about", "Vestibulum laoreet aliquet dapibus. In suscipit sagittis odio, a sollicitudin leo faucibus eget. Quisque porta arcu orci, at ultricies justo viverra at. Maecenas a metus iaculis massa posuere tincidunt. Etiam euismod sodales posuere. Quisque lectus elit, blandit sed urna ut, fermentum maximus leo. Cras scelerisque quam nec sagittis maximus. Nunc leo justo, venenatis eu mollis sed, condimentum sit amet purus. Praesent efficitur sodales tellus ac sodales. Aliquam consequat finibus tristique. Pellentesque pulvinar tristique magna, nec accumsan est tristique ut. Etiam convallis iaculis massa in tempor. Fusce facilisis vitae mauris sed consequat. Sed accumsan sem ipsum, id vulputate quam vehicula non.")
    }
}

let vnode = document.querySelector("#app")
theme.display = (representation) => {
    vnode = patch(vnode, representation)
}

theme.init = (model, actions) => {
    return theme.ready(model, actions)
}

theme.ready = (model, actions) => {
    let content = theme.home();
    let header = theme.header(model.appName, model.links, actions);
    let footer = theme.footer();

    return theme.makePage(header, content, footer);
}

module.exports = theme
