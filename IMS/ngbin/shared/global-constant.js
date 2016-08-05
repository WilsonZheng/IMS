"use strict";
var GlobalConstant = (function () {
    function GlobalConstant() {
    }
    Object.defineProperty(GlobalConstant, "INVITATION_CODE_PLACEHOLDER", {
        get: function () {
            return "$$$";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GlobalConstant, "NUMBER_NOTHING", {
        get: function () {
            return -1;
        },
        enumerable: true,
        configurable: true
    });
    return GlobalConstant;
}());
exports.GlobalConstant = GlobalConstant;
//# sourceMappingURL=global-constant.js.map