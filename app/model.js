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

    doneEditing: false,
    doneDeleting: false,

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

    model.presentEdit(data);
    model.presentDelete(data);
    model.presentForm(data);

    model.render(model)
}

model.presentEdit = (data) => {
    model.editId = data.editId || 0
    model.contact = data.item || {}

    model.doneEditing = data.doneEditing
}

model.presentDelete = (data) => {
    model.deleteId = data.deleteId || 0
    model.doneDeleting = data.doneDeleting || false
}

model.presentForm = (data) => {
    model.formInvalid = data.formInvalid || false
}

module.exports = model
