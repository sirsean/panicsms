var React = require("react");
var Actions = require("../actions/Actions.js");
var AlertStore = require("../stores/AlertStore.js");

var NoAlerts = React.createClass({
    onClickCreate: function() {
        Actions.newAlert();
    },
    render: function() {
        return (
            <div className="NoAlerts row center-xs middle-xs">
                <div className="col-xs-8">
                    <p>Panic SMS allows you to set up text messages to send later, with a single tap.</p>
                    <p>If something is happening and you don't have time to type a message, you'll be glad you're prepared.</p>
                    <p>You have no alerts yet...</p>
                    <p><button onClick={this.onClickCreate}>Create One</button></p>
                </div>
            </div>
        );
    }
});

var AlertListItem = React.createClass({
    onClickSend: function() {
        Actions.sendAlert(this.props.alert);
    },
    render: function() {
        var alert = this.props.alert;
        var className = "AlertListItem";
        if (alert.sending) {
            className += " sending";
        }
        return (
            <div className={className} onClick={this.onClickSend}>
                <div className="row middle-xs">
                    <div className="title col-xs-8">
                        {alert.title}
                    </div>
                    <div className="phone-number col-xs-4 end-xs">
                        {alert.phoneNumber}
                    </div>
                    <div className="message col-xs-12">
                        {alert.message}
                    </div>
                </div>
            </div>
        );
    }
});

var AlertList = React.createClass({
    render: function() {
        return (
            <div className="AlertList">
                {this.props.alerts.map(function(alert, i) {
                    return <AlertListItem key={i} alert={alert} />;
                }.bind(this))}
            </div>
        );
    }
});

module.exports = React.createClass({
    getInitialState: function() {
        return {
            alerts: AlertStore.state.alerts()
        }
    },
    componentDidMount: function() {
        AlertStore.addChangeListener(this.onChange);
    },
    componentWillUnmount: function() {
        AlertStore.removeChangeListener(this.onChange);
    },
    onChange: function() {
        if (this.isMounted()) {
            this.setState(this.getInitialState());
        }
    },
    render: function() {
        var content
        if (this.state.alerts.length > 0) {
            content = <AlertList alerts={this.state.alerts} />
        } else {
            content = <NoAlerts />;
        }
        return (
            <div className="Home">{content}</div>
        );
    }
});
