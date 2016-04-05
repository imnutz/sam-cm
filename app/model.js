let model = {
    appName: "Contact Manager",
    links: [
        { title: "Contacts", href: "#" },
        { title: "About", href: "#" }
    ],

    contacts: [],

    currentCriteria: "",

    showHome: true,
    showList: false,
    showAbout: false,
    showSearch: false,
    showEdit: false
}

model.init = () => model

model.setRender = (render) => model.render = render

model.present = (data) => {
    model.contacts = data.contacts || []
    model.currentCriteria = data.criteria || ""

    model.showHome = data.homeSelected || false;
    model.showList = data.listSelected || false

    model.render(model)
}

module.exports = model
