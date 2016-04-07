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

actions.showForm = (id = null) => {
    let data = {
        currentPage: "crudForm",
        item: {}
    };

    if(id) {
        actions.services
            .fetchContact(id)
            .then((response) => {
                data.editId = response.id
                data.item = response

                actions.present(data)
            })
    } else {
        actions.present(data)
    }
}

actions.updateContact = (data = {}) => {
    data.currentPage = "crudForm"

    if(!data.firstName || !data.lastName) {
        data.formInvalid = true
        actions.present(data);
    } else {
        actions.services
            .updateContact({
                id: data.id,
                firstName: data.firstName,
                lastName: data.lastName
            })
            .then(actions.doneCrud)
    }
}

actions.save = (data= {}) => {
    data.currentPage = "crudForm"
    if(!data.firstName || !data.lastName) {
        data.formInvalid = true
        actions.present(data);
    } else {
        actions.services
            .createContact({
                firstName: data.firstName,
                lastName: data.lastName
            })
            .then(actions.doneCrud)
    }

}

actions.deleteContact = (id) => {
    let confirmed = false,
        data = {}

    if(id) {
        confirmed = confirm("Do you really want to delete this contact?")

        if(confirmed) {
            actions.services
                   .deleteContact(id)
                   .then((response) => {
                        data.doneDeleting = true; 
                        actions.present(data);
                   })
        }
    }
}

actions.doneCrud = (data = {}) => {
    data.currentPage = "list"
    data.editId = null
    data.doneEditing = true
    actions.present(data);
}

module.exports = actions
