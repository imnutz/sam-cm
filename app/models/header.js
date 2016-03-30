var DEFAULT_PAGE = "home";
var activePage;

var _state;

var setState = (state) => {
    _state = state;
}

var init = () => DEFAULT_PAGE;

var present = (data) => {
    activePage = data.activePage || DEFAULT_PAGE;

    _state.render(activePage);
}

module.exports = { init, present, setState };
