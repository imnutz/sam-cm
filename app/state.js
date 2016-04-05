let state = {}

// Control state
const shouldShowHome = (model) => model.showHome
const shouldShowList = (model) => model.showList

state.init = (theme, actions) => {
    state.view = theme;
    state.actions = actions
}


state.representation = (model) => {
    let page, content, header, footer

    if(shouldShowHome(model)) {
        content = state.view.home()
    } else if(shouldShowList(model)) {
        content = state.view.contactList(model.currentCriteria, model.contacts, state.actions)
    }

    header = state.view.header(model.appName, model.links, state.actions)
    footer = state.view.footer()

    page = state.view.makePage(header, content, footer)

    state.view.display(page)
}

state.nap = (model) => {}

state.render = (model) => {
    state.representation(model);
    state.nap(model);
}

module.exports = state;
