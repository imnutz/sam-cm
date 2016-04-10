module.exports = (state, actions, model, view, services) => {
    state.init(view, actions);

    model.setRender(state.render);
    model.setServices(services);

    actions.init(model.present, services);
}
