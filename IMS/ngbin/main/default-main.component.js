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
var user_information_service_1 = require('../shared/user-information.service');
var message_service_1 = require('../shared/message.service');
var notice_main_component_1 = require('../invitation/notice-main.component');
//Based upon the user's role, display the corresponding starting page.
var DefaultMainComponent = (function () {
    function DefaultMainComponent(userInformationService, messageService) {
        this.userInformationService = userInformationService;
        this.messageService = messageService;
    }
    DefaultMainComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userInformationService.fetchUser().then(function (user) {
            _this.user = user;
        })
            .catch(function (error) { _this.handleError(error); });
    };
    DefaultMainComponent.prototype.handleError = function (error) {
        this.messageService.error(error);
    };
    DefaultMainComponent = __decorate([
        core_1.Component({
            selector: 'default-main',
            templateUrl: '/app/main/default-main.component.html',
            styleUrls: [],
            directives: [notice_main_component_1.NoticeMainComponent],
            providers: [user_information_service_1.UserInformationService]
        }), 
        __metadata('design:paramtypes', [user_information_service_1.UserInformationService, message_service_1.MessageService])
    ], DefaultMainComponent);
    return DefaultMainComponent;
}());
exports.DefaultMainComponent = DefaultMainComponent;
//# sourceMappingURL=default-main.component.js.map