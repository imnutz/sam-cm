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
    model.contacts = data.contacts || []
    model.currentCriteria = data.criteria || ""

    model.currentPage = data.currentPage || HOME

    model.editId = data.editId || 0
    model.deleteId = data.deleteId || 0

    model.render(model)
}

module.exports = model
