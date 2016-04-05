module.exports = (state, actions, model, view) => {
    state.init(view, actions);
    model.setRender(state.render);

    actions.init(model.present);
}
