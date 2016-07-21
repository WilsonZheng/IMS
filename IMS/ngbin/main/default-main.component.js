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
/// <reference path="../../node_modules/rxjs/add/operator/toPromise.d.ts" />
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var user_information_service_1 = require('../shared/user-information.service');
var message_service_1 = require('../shared/message.service');
var role_name_1 = require('../shared/role-name');
//Based upon the user's role, display the corresponding starting page.
var DefaultMainComponent = (function () {
    function DefaultMainComponent(userInformationService, messageService, router) {
        this.userInformationService = userInformationService;
        this.messageService = messageService;
        this.router = router;
    }
    DefaultMainComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        //Direct user based on their given role.
        this.userInformationService.fetchUser().then(function (user) {
            var route = '';
            if (user.hasRole(role_name_1.RoleName.ADMIN)) {
                route = "/admin";
            }
            else if (user.hasRole(role_name_1.RoleName.STAFF)) {
                route = "/staff";
            }
            else if (user.hasRole(role_name_1.RoleName.INTERN)) {
                route = "/intern";
            }
            _this.router.navigate([route]);
        })
            .catch(function (error) { _this.handleError(error); });
    };
    DefaultMainComponent.prototype.handleError = function (error) {
        this.messageService.error(error);
    };
    DefaultMainComponent = __decorate([
        core_1.Component({
            template: '',
            providers: [user_information_service_1.UserInformationService]
        }), 
        __metadata('design:paramtypes', [user_information_service_1.UserInformationService, message_service_1.MessageService, router_1.Router])
    ], DefaultMainComponent);
    return DefaultMainComponent;
}());
exports.DefaultMainComponent = DefaultMainComponent;
//# sourceMappingURL=default-main.component.js.map