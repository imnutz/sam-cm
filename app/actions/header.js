var _model;

var setModel = (model) => {
    _model = model;
};

var selectPage = (page) => {
    _model.present({ activePage: page });
};

module.exports = { selectPage, setModel };
