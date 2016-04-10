let binder = require("./app/binder");
let state = require("./app/state");
let actions = require("./app/actions");
let model = require("./app/model");
let services = require("./app/services");
let view = require("./app/view");

binder(state, actions, model, view, services);

view.display(view.init(model.init(), actions));
