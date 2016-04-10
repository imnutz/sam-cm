let h = require("snabbdom/h");

let theme = {
    header: (title, menu, actions) => {
        let makeMenuItem = (menuItem) => {
            return h("li", [
                h("a", {props: {href: menuItem.href}, on: {click: [actions.selectPage, menuItem.route]}}, menuItem.title)
            ])
        };

        return h("div#header", [
            h("h1", [
                h("a", {on: {click: [actions.selectPage, "home"]}}, title)
            ]),
            h("ul.menu", menu.map(makeMenuItem))
         ]);
    },

    home: () => {
        return h("h1", "Welcome to Contact Manager!")
    },

    contactList: (list, actions) => {
        return h("div.content", [
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
                    h("button", {on: {click: [actions.showForm, row.id] }}, "Edit"),
                    h("button", {on: {click: function() { actions.deleteContact(row.id); }}}, "Delete")
                ])
            ])
        })
    },

    search: (currentCriteria, actions) => {
        return h("div.search", [
            h("button", {on: {click: function() { actions.showForm() }}}, "Add new contact")
        ])
    },

    contactForm: (contact, formInvalid, actions) => {
        let firstName = contact.firstName || "",
            lastName = contact.lastName || "";

        let showError = Boolean(formInvalid)

        const setFirstName = (e) => {
            firstName = e.target.value;
        }
        const setLastName = (e) => {
            lastName = e.target.value;
        }

        let title = "Add new",
            handler = actions.save;
        if(contact.id) {
            title = "Edit contact: " + firstName
            handler = actions.updateContact;
        }

        let err = ""
        if(showError) {
            err = h("p", "Your form is invalid")
        }

        return h("div.edit-contact", [
            h("h3", String(title)),
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
                    h("button", {on:{click: function() { handler({ id: contact.id, firstName, lastName}); }}}, "Save"),
                    h("button", {on:{click: function() { actions.doneCrud(); }}}, "Cancel")
                ])
            ])
        ])
    },

    footer: () => {
        return h("div#footer", "Copyright(C) sonngoc(son.ngoc@gmail.com)")
    },

    about: () => {
        return h("div.about", "Vestibulum laoreet aliquet dapibus. In suscipit sagittis odio, a sollicitudin leo faucibus eget. Quisque porta arcu orci, at ultricies justo viverra at. Maecenas a metus iaculis massa posuere tincidunt. Etiam euismod sodales posuere. Quisque lectus elit, blandit sed urna ut, fermentum maximus leo. Cras scelerisque quam nec sagittis maximus. Nunc leo justo, venenatis eu mollis sed, condimentum sit amet purus. Praesent efficitur sodales tellus ac sodales. Aliquam consequat finibus tristique. Pellentesque pulvinar tristique magna, nec accumsan est tristique ut. Etiam convallis iaculis massa in tempor. Fusce facilisis vitae mauris sed consequat. Sed accumsan sem ipsum, id vulputate quam vehicula non.")
    }
}

module.exports = theme
