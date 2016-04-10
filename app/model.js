let page = require("./constants");

let model = {
    appName: "Contact Manager",
    menu: [
        { title: "Contacts", href: "#", route: "contacts" },
        { title: "About", href: "#", route: "about" }
    ],

    contacts: [],
    contact: null,
    fetched: false,

    id: null,

    currentPage: page.HOME_PAGE
};

model.init = () => model;

model.setRender = (render) => model.render = render;
model.setServices = (services) => model.services = services;

model.present = (data) => {
    if(data.currentPage) {
        model.currentPage = data.currentPage;
    }

    if(model.currentPage === "contacts") {
        model.services
             .fetchContacts()
             .then((response) => {
                model.contacts = response || [];
                model.render(model);
             });
    } else if(data.id) {
        model.id = data.id;
        model.services
             .fetchContact(model.id)
             .then((response) => {
                model.contact = response || {};
                model.render(model);
             });
    } else {
        model.render(model);
    }
};

module.exports = model;
