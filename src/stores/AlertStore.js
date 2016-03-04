var Store = require("./Store.js");
var Actions = require("../actions/Actions.js");
var AlertApi = require("../api/AlertApi.js");
var uuid = require("node-uuid");
var phone = require("phone");

var alerts = read();

var newTitle = "";
var newPhoneNumber = "";
var newMessage = "";

function read() {
    var stored = localStorage["alerts"];
    if (stored) {
        return JSON.parse(stored).map(function(a) {
            return new Alert(a);
        });
    } else {
        return [];
    }
}

function write(blob) {
    localStorage["alerts"] = JSON.stringify(blob);
}

function Alert(opts) {
    if (opts.id) {
        this.id = opts.id;
    } else {
        this.id = uuid.v4();
    }
    this.index = opts.index;
    this.title = opts.title;
    this.phoneNumber = opts.phoneNumber;
    this.message = opts.message;
    this.sending = false;
}

Alert.prototype.isValid = function() {
    if (!this.title || !this.phoneNumber || !this.message) {
        return false;
    }
    if (!this.validatedPhoneNumber()) {
        return false;
    }
    return true;
};

Alert.prototype.validatedPhoneNumber = function() {
    var validated = phone(this.phoneNumber, "USA");
    if (validated.length > 0) {
        return validated[0];
    } else {
        return null;
    }
};

module.exports = new Store({
    state: {
        alerts: function() {
            alerts.sort(function(a, b) {
                return a.index - b.index;
            });
            return alerts;
        },
        newTitle: function() {
            return newTitle;
        },
        newPhoneNumber: function() {
            return newPhoneNumber;
        },
        newMessage: function() {
            return newMessage;
        },
        newIsValid: function() {
            var a = new Alert({
                title: newTitle,
                phoneNumber: newPhoneNumber,
                message: newMessage
            });
            return a.isValid();
        }
    },
    handlers: {
        "NEW_ALERT": function() {
            Actions.setPage("newAlert");
            newTitle = "";
            newPhoneNumber = "";
            newMessage = "";
        },
        "SET_NEW_ALERT_VALUES": function(action) {
            newTitle = action.title;
            newPhoneNumber = action.phoneNumber;
            newMessage = action.message;
        },
        "ADD_ALERT": function(action) {
            var alert = new Alert({
                index: alerts.length,
                title: action.title,
                phoneNumber: action.phoneNumber,
                message: action.message
            });
            alerts.push(alert);
            write(alerts);
            Actions.setPage("home");
        },
        "SEND_ALERT": function(action) {
            action.alert.sending = true;
            AlertApi.sendAlert(action.alert);
        },
        "ALERT_SENT": function(action) {
            action.alert.sending = false;
        }
    }
});
