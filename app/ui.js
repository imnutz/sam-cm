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
            }

            return h("li", [
                h("a", {props: {href: link.href}, on: {click: handler}}, link.title)
            ])
        }

        return h("div#header", [
            h("h1", String(title)),
            h("ul.menu", links.map(makeLink))
         ])
    },

    home: () => {
        return h("h1", "Welcome to Contact Manager!")
    },

    contactList: (currentCriteria, list, actions) => {
        return h("div.content", [
            theme.search(currentCriteria, actions),
            h("div.data-grid", [ theme.makeDataGrid(list) ])
        ])
    },

    makeDataGrid: (list) => {
        return h("table", [
            h("thead", [
                h("tr", theme.makeDataGridHeader(["First name", "Last name"]))
            ]),
            h("tbody", theme.makeDataGridRow(list))
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

    makeDataGridRow: (list) => {
        return list.map((row) => {
            return h("tr", [
                h("td", String(row.firstName)) ,
                h("td", String(row.lastName))
            ])
        })
    },

    search: (currentCriteria, actions) => {
        return h("div.search", [
            h("input", {props: {type: "text", name:"criteria", value: currentCriteria}}),
            h("button", {on: {click: actions.placeholder}}, "Search")
        ])
    },

    footer: () => {
        return h("div#footer", "Copyright(C) Son Do")
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
