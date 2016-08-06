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
var primeng_1 = require('primeng/primeng');
//Custom service
var message_service_1 = require('../shared/message.service');
//Custom Models.
var template_1 = require('./template');
//Custom Component
var recruit_status_code_1 = require('../shared/recruit-status-code');
var RecruitProgressComponent = (function () {
    function RecruitProgressComponent(messageService) {
        this.messageService = messageService;
    }
    Object.defineProperty(RecruitProgressComponent.prototype, "invitations", {
        get: function () {
            var recruitStatusCode = this.recruitStatusCode;
            return this.notice.Invitations.filter(function (invitation) {
                return recruitStatusCode == 100 || invitation.RecruitStatusCode == recruitStatusCode;
            });
        },
        enumerable: true,
        configurable: true
    });
    RecruitProgressComponent.prototype.ngOnInit = function () { };
    RecruitProgressComponent.prototype.handleError = function (message) {
        this.messageService.error(message);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', template_1.Template)
    ], RecruitProgressComponent.prototype, "notice", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], RecruitProgressComponent.prototype, "recruitStatusCode", void 0);
    RecruitProgressComponent = __decorate([
        core_1.Component({
            selector: 'inv-recruit-progress',
            templateUrl: '/app/invitation/recruit-progress.component.html',
            directives: [primeng_1.DataList, primeng_1.Button]
        }), 
        __metadata('design:paramtypes', [message_service_1.MessageService])
    ], RecruitProgressComponent);
    return RecruitProgressComponent;
}());
exports.RecruitProgressComponent = RecruitProgressComponent;
//# sourceMappingURL=recruit-progress.component1.js.map