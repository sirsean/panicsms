var Store = require("./Store.js");
var Router = require("../router/Router.js");
var Actions = require("../actions/Actions.js");

var page;

readURL();

function readURL() {
    page = Router.getPage();
}

function setURL(replace) {
    var url = Router.buildURL(page);
    if (replace) {
        window.history.replaceState({}, null, url);
    } else {
        window.history.pushState({}, null, url);
    }
}

module.exports = new Store({
    state: {
        page: function() {
            return page || "home";
        }
    },
    handlers: {
        "URL_CHANGE": function() {
            console.log("changed URL!");
            console.log(document.location.href);

            readURL();

            console.log(document.location.href);
            console.log(page, query, episode, timestamp);
        },
        "SET_PAGE": function(action) {
            page = action.page;
            setURL();
        }
    }
});
