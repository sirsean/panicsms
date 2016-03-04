var Dispatcher = require("../dispatcher/Dispatcher.js");

module.exports = {
    setPage: function(page) {
        Dispatcher.dispatch({
            type: "SET_PAGE",
            page: page
        });
    },
    newAlert: function() {
        Dispatcher.dispatch({
            type: "NEW_ALERT"
        });
    },
    setNewAlertValues: function(title, phoneNumber, message) {
        Dispatcher.dispatch({
            type: "SET_NEW_ALERT_VALUES",
            title: title,
            phoneNumber: phoneNumber,
            message: message
        });
    },
    addAlert: function(title, phoneNumber, message) {
        Dispatcher.dispatch({
            type: "ADD_ALERT",
            title: title,
            phoneNumber: phoneNumber,
            message: message
        });
    },
    sendAlert: function(alert) {
        Dispatcher.dispatch({
            type: "SEND_ALERT",
            alert: alert
        });
    },
    alertSent: function(alert) {
        Dispatcher.dispatch({
            type: "ALERT_SENT",
            alert: alert
        });
    }
};
