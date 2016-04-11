let actions = {}

actions.init = (present) => {
    actions.present = present;
}

actions.selectPage = (route) => {
    let data = {
        route: route || ""
    };

    data.doneUpdating = false;

    actions.present(data);
}

actions.editForm = (id = null) => {
    let data = {
        route: "editForm",
        id: id
    };

    actions.present(data);
}

actions.addForm = (data = {}) => {
    data.route = "addForm";
    actions.present(data);
}

actions.updateContact = (data = {}) => {
    data.route = "update";
    actions.present(data);
}

actions.save = (data= {}) => {
    data.route = "save";
    actions.present(data);
}

actions.deleteContact = (id) => {
    let data = {}
}

actions.cancelForm = (data = {}) => {
    data.cancelForm = true;
    actions.present(data);
}

module.exports = actions
