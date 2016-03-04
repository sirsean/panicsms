var React = require("react");
var ReactDOM = require("react-dom");

var Actions = require("./actions/Actions.js");
window.onpopstate = function(e) {
    Actions.urlChange();
};

var Main = require("./components/Main.js");

ReactDOM.render(
    <Main />,
    document.getElementById("app")
);
