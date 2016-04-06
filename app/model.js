const HOME = "home"

let model = {
    appName: "Contact Manager",
    links: [
        { title: "Contacts", href: "#" },
        { title: "About", href: "#" }
    ],

    contacts: [],
    contact: null,

    editId: 0,
    deleteId: 0,

    currentCriteria: "",
    currentPage: HOME,

    formInvalid: false
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
    model.contact = data.item || {}

    model.deleteId = data.deleteId || 0

    model.formInvalid = data.formInvalid || false
    model.doneEditing = data.doneEditing

    model.render(model)
}

module.exports = model
