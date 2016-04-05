let binder = require("./app/binder");
let state = require("./app/state");
let actions = require("./app/actions");
let model = require("./app/model");
let theme = require("./app/ui");

binder(state, actions, model, theme);

theme.display(theme.init(model.init(), actions));
