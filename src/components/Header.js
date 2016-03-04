var React = require("react");
var RouteStore = require("../stores/RouteStore.js");
var Actions = require("../actions/Actions.js");

var HomeCommandBar = React.createClass({
    onClickAdd: function() {
        Actions.newAlert();
    },
    render: function() {
        return (
            <div className="HomeCommandBar">
                <button onClick={this.onClickAdd}>Add</button>
            </div>
        );
    }
});

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
    onClickHome: function() {
        Actions.setPage("home");
    },
    render: function() {
        var commandBar;
        if (this.state.page == "home") {
            commandBar = <HomeCommandBar />;
        }
        return (
            <div className="Header row middle-xs">
                <div className="col-xs-8">
                    <h1 onClick={this.onClickHome}>Panic SMS</h1>
                </div>
                <div className="col-xs-4 end-xs">
                    {commandBar}
                </div>
            </div>
        );
    }
});
