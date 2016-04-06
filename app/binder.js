module.exports = (state, actions, model, view, services) => {
    state.init(view, actions);
    model.setRender(state.render);

    actions.init(model.present, services);
}
