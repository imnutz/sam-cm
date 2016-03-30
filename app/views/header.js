var h = require("snabbdom/h");

var init = (data, actions) => {
    return ready(data, actions);
}

var ready = (data, actions) => {
    return h("div#header", [
        h("h1", "Contact Manager"),
        h("ul", [
            h("li", [ 
                h("a", { props: {href: "#"}, on: { click: function(evt) { actions.selectPage("list") } }}, "Contacts"),
            ]),

            h("li", [ 
                h("a", { props: {href: "#"} }, "About"),
            ]) 
        ])
    ]);
}

module.exports = { init, ready };
