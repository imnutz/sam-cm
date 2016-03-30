var _view,
    _actions;

var setView = (view) => {
    _view = view;
}

var setActions = (actions) => {
    _actions = actions;
}

var isListPageSelected = (model) => model === "list";
var isAboutPageSelected = (model) => model === "about";

var representation = (model) => {
    var cssClass = "home";

    if(isListPageSelected(model)) {
        cssClass = "list";
    } else if(isAboutPageSelected(model)) {
        cssClass = "about";
    }

    debugger;
    _view.display(_view.ready({ cssClass: cssClass }, _actions));
};

var render = (model) => {
    representation(model);
};

module.exports = { render, setView, setActions };
