"use strict";
//Represents a login user.
var User = (function () {
    function User() {
    }
    User.prototype.hasRole = function (role) {
        return (this.Roles != undefined) &&
            (this.Roles.find(function (val) { return val == role; }) != undefined);
    };
    return User;
}());
exports.User = User;
//# sourceMappingURL=user.js.map