var $ = require("jquery");
var Actions = require("../actions/Actions.js");

module.exports = {
    sendAlert: function(alert) {
        $.ajax({
            type: "POST",
            url: "/api/send",
            data: {
                to: alert.validatedPhoneNumber(),
                body: alert.message
            },
            success: function(data) {
                Actions.alertSent(alert);
            },
            error: function() {
                Actions.alertSent(alert);
            }
        });
    }
};
