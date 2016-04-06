let reqwest = require("reqwest")

const serverRoot = "http://localhost:3000"
const urls = {
    contacts: "/contacts"
}

let services = {
    fetchContacts: () => {
        return reqwest(serverRoot + urls.contacts)
    },

    fetchContact: (id) => {
        return reqwest(serverRoot + urls.contacts + "/"+ id)
    },

    updateContact: (contact) => {
        return reqwest({
            url: serverRoot + urls.contacts + "/"+ contact.id,
            method: "put",
            data: contact
        })
    }
}

module.exports = services
