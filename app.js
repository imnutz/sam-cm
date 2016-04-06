let binder = require("./app/binder");
let state = require("./app/state");
let actions = require("./app/actions");
let model = require("./app/model");
let services = require("./app/services");
let theme = require("./app/ui");

binder(state, actions, model, theme, services);

theme.display(theme.init(model.init(), actions));
