let h = require("snabbdom/h");
let constants = require("./constants");

let state = {};

state.init = (theme, actions) => {
    state.view = theme;
    state.actions = actions;
}

state.representation = (model) => {
    let representation = state.view.ready(model, state.actions);

    state.view.display(representation);
}

state.nap = (model) => {
}

state.render = (model) => {
    state.representation(model);
    state.nap(model);
}

module.exports = state;
