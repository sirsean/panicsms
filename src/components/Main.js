var React = require("react");
var RouteStore = require("../stores/RouteStore.js");
var Header = require("./Header.js");
var Home = require("./Home.js");
var NewAlert = require("./NewAlert.js");

module.exports = React.createClass({
    getInitialState: function() {
        return {
            page: RouteStore.state.page()
        };
    },
    componentDidMount: function() {
        RouteStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function() {
        RouteStore.removeChangeListener(this._onChange);
    },
    _onChange: function() {
        if (this.isMounted()) {
            this.setState(this.getInitialState());
        }
    },
    render: function() {
        var content;
        if (this.state.page == "newAlert") {
            content = (
                <NewAlert />
            );
        } else {
            content = (
                <Home />
            );
        }
        return (
            <div className="Main">
                <Header />
                <div className="content">
                    {content}
                </div>
            </div>
        );
    }
});
