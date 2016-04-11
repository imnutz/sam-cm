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
    doneUpdating: false,
    doneAdding: false,
    cancelForm: false,

    route: page.HOME_PAGE
};

model.init = () => model;

model.setRender = (render) => model.render = render;
model.setServices = (services) => model.services = services;

model.present = (data) => {
    if(data.route) {
        model.currentRoute = data.route;
    }

    model.doneUpdating = data.doneUpdating || false;
    model.doneAdding = data.doneAdding || false;
    model.cancelForm = data.cancelForm || false;

    if(model.currentRoute === "contacts") {
        model.services
             .fetchContacts()
             .then((response) => {
                model.contacts = response || [];
                model.render(model);
             });
    } else if(model.currentRoute === "update") {
        model.services
             .updateContact({
                id: data.id,
                firstName: data.firstName,
                lastName: data.lastName
             })
             .then((response) => {
                model.doneUpdating = true;
                model.render(model);
             });
    } else if(model.currentRoute === "editForm" && data.id) {
        model.id = data.id;
        model.services
             .fetchContact(model.id)
             .then((response) => {
                model.contact = response || {};
                model.render(model);
             });
    } else if(model.currentRoute === "save") {
        model.services
             .createContact({
                firstName: data.firstName,
                lastName: data.lastName
             }) 
             .then((response) => {
                model.doneAdding = true;
                model.present(model);
             })
    } else {
        model.render(model);
    }
};

module.exports = model;
