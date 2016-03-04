var React = require("react");
var Actions = require("../actions/Actions.js");
var AlertStore = require("../stores/AlertStore.js");

module.exports = React.createClass({
    getInitialState: function() {
        return {
            title: AlertStore.state.newTitle(),
            phoneNumber: AlertStore.state.newPhoneNumber(),
            message: AlertStore.state.newMessage(),
            valid: AlertStore.state.newIsValid()
        };
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
    onCancelClick: function() {
        Actions.setPage("home");
    },
    onSaveClick: function() {
        Actions.addAlert(this.state.title, this.state.phoneNumber, this.state.message);
    },
    onChangeTitle: function(e) {
        Actions.setNewAlertValues(e.target.value, this.state.phoneNumber, this.state.message);
    },
    onChangePhoneNumber: function(e) {
        Actions.setNewAlertValues(this.state.title, e.target.value, this.state.message);
    },
    onChangeMessage: function(e) {
        Actions.setNewAlertValues(this.state.title, this.state.phoneNumber, e.target.value);
    },
    render: function() {
        return (
            <div className="NewAlert">
                <label>Your Title</label>
                <input type="text" tabIndex="1" onChange={this.onChangeTitle} value={this.state.title} />
                <label>Recipient Phone Number</label>
                <input type="text" tabIndex="2" onChange={this.onChangePhoneNumber} value={this.state.phoneNumber} />
                <label>Message</label>
                <textarea tabIndex="3" rows="3" onChange={this.onChangeMessage} value={this.state.message}></textarea>
                <div className="commands row middle-xs">
                    <div className="col-xs-12 end-xs">
                        <button onClick={this.onCancelClick}>Cancel</button>
                        <button onClick={this.onSaveClick} disabled={!this.state.valid}>Save</button>
                    </div>
                </div>
                <div className="row center-xs">
                    <div className="col-xs-12">
                        <p>After you have created your alert, simply tap it to send the message.</p>
                    </div>
                </div>
            </div>
        );
    }
});
