"use strict";
var Overlay = (function () {
    function Overlay() {
    }
    Overlay.prototype.attach = function (el) {
    };
    Overlay.prototype.open = function (el, tooltip) {
        console.log("mouseenter=>tooltip=" + tooltip);
    };
    Overlay.prototype.close = function () {
        console.log("mouseleave");
    };
    return Overlay;
}());
exports.Overlay = Overlay;
//# sourceMappingURL=overlay.js.map