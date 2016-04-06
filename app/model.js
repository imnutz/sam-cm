const HOME = "home"

let model = {
    appName: "Contact Manager",
    links: [
        { title: "Contacts", href: "#" },
        { title: "About", href: "#" }
    ],

    contacts: [],

    editId: 0,
    deleteId: 0,

    currentCriteria: "",
    currentPage: HOME
}

model.init = () => model

model.setRender = (render) => model.render = render

model.present = (data) => {
    if(data.contacts) {
        model.contacts = data.contacts
    }

    model.currentCriteria = data.criteria || ""

    model.currentPage = data.currentPage || HOME

    model.editId = data.editId || 0
    model.deleteId = data.deleteId || 0

    if(data.editId && data.firstName && data.lastName) {
        let contact = model.getContact(data.editId)
        contact.firstName = data.firstName
        contact.lastName = data.lastName

        model.lastEditedItem = contact;
    }

    model.render(model)
}

model.getContact = (id) => {
    return model.contacts.filter((contact) => {
        return contact.id === id
    })[0]
}

module.exports = model
