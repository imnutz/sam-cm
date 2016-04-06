let actions = {}

actions.init = (present, services) => {
    actions.present = present
    actions.services = services
}

actions.selectHome = (data = {}) => {
    data.currentPage = "home"

    actions.present(data);
}

actions.selectContactList = (data = {}) => {
    data.currentPage = "list"

    actions.services
        .fetchContacts()
        .then((response) => {
            data.contacts = response

            actions.present(data)
        })
}

actions.selectAbout = (data = {}) => {
    data.currentPage = "about"

    actions.present(data)
}

actions.editContact = (id) => {
    let data = {
        currentPage: "editContact",
        item: {}
    };
    actions.services
        .fetchContact(id)
        .then((response) => {
            data.editId = response.id
            data.item = response

            actions.present(data)
        })

}

actions.updateContact = (data = {}) => {
    data.currentPage = "editContact"

    if(!data.firstName || !data.lastName) {
        data.formInvalid = true
        actions.present(data);
    }

    actions.services
        .updateContact({
            id: data.editId,
            firstName: data.firstName,
            lastName: data.lastName
        })
        .then((response) => {
            data.editId = null
            data.doneEditing = true
            actions.present(data);
        })
}

module.exports = actions
