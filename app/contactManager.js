var actions = require("./actions/app");
var state = require("./states/app");
var model = require("./models/app");
var view = require("./views/app");

function wire(state, actions, model, view) {
    state.header.setActions(actions.header);
    state.header.setView(view.header);

    actions.header.setModel(model.header);

    model.header.setState(state.header);
}

wire(state, actions, model, view);

view.display(view.init(model, actions));
