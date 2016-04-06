let actions = {}

actions.init = (present) => {
    actions.present = present
}

actions.selectHome = (data = {}) => {
    data.currentPage = "home"

    actions.present(data);
}

actions.selectContactList = (data = {}) => {
    data.currentPage = "list"
    data.contacts = [
        {
            id: 1,
            firstName: "Son",
            lastName: "Do"
        },
        {
            id: 2,
            firstName: "Son",
            lastName: "Jim"
        }

    ]

    actions.present(data)
}

actions.selectAbout = (data = {}) => {
    data.currentPage = "about"

    actions.present(data)
}

actions.editContact = (id) => {
    let data = {
        editId: id,
        currentPage: "editContact"
    };

    actions.present(data)
}

module.exports = actions
