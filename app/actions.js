let actions = {}

actions.init = (present, services) => {
    actions.present = present;
    actions.services = services;
}

actions.selectPage = (route) => {
    let data = {
        currentPage: route || ""
    };

    actions.present(data);
}

actions.showForm = (id = null) => {
    let data = {
        currentPage: "crud",
        id: id
    };

    actions.present(data);
}

actions.updateContact = (data = {}) => {
    data.currentPage = "crudForm";
    actions.present(data);
}

actions.save = (data= {}) => {
    data.currentPage = "crudForm"
    actions.present(data);
}

actions.deleteContact = (id) => {
    let data = {}
}

module.exports = actions
