let actions = {}

actions.init = (present) => {
    actions.present = present
}

actions.selectContactList = (data = {}) => {
    data.homeSelected = false;
    data.listSelected = true
    data.contacts = [
        {
            firstName: "Son",
            lastName: "Do"
        }
    ]

    actions.present(data)
}

module.exports = actions
