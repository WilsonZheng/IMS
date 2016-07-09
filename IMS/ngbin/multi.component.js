"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var UserBadge = (function () {
    function UserBadge() {
    }
    UserBadge = __decorate([
        core_1.Component({
            selector: "user-badge",
            templateUrl: 'agview/userbadge.tp.html'
        }), 
        __metadata('design:paramtypes', [])
    ], UserBadge);
    return UserBadge;
}());
exports.UserBadge = UserBadge;
var UserRating = (function () {
    function UserRating() {
    }
    UserRating = __decorate([
        core_1.Component({
            selector: "user-rating",
            templateUrl: "agview/userrating.tp.html"
        }), 
        __metadata('design:paramtypes', [])
    ], UserRating);
    return UserRating;
}());
exports.UserRating = UserRating;
var UserPanel = (function () {
    function UserPanel() {
        console.log("badge:" + this.badge + " rating:" + this.rating);
    }
    __decorate([
        core_1.ViewChild(UserBadge), 
        __metadata('design:type', UserBadge)
    ], UserPanel.prototype, "badge", void 0);
    __decorate([
        core_1.ContentChild(UserRating), 
        __metadata('design:type', UserRating)
    ], UserPanel.prototype, "rating", void 0);
    UserPanel = __decorate([
        core_1.Component({
            selector: "user-panel",
            template: "<user-badge></user-badge>",
            directives: [UserBadge]
        }), 
        __metadata('design:paramtypes', [])
    ], UserPanel);
    return UserPanel;
}());
exports.UserPanel = UserPanel;
//# sourceMappingURL=multi.component.js.map