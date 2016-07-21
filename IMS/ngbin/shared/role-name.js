"use strict";
var RoleName = (function () {
    function RoleName() {
    }
    Object.defineProperty(RoleName, "ADMIN", {
        get: function () {
            return 'admin';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RoleName, "STAFF", {
        get: function () {
            return 'staff';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RoleName, "INTERN", {
        get: function () {
            return 'intern';
        },
        enumerable: true,
        configurable: true
    });
    return RoleName;
}());
exports.RoleName = RoleName;
//# sourceMappingURL=role-name.js.map