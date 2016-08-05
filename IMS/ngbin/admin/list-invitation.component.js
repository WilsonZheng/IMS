//Description: list the invitations which have been sent. Can resend or delete the invitation.
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
var primeng_1 = require('primeng/primeng');
//Custom service
var invitation_service_1 = require('../invitation/shared/invitation.service');
var message_service_1 = require('../shared/message.service');
var global_constant_1 = require('../shared/global-constant');
//Custom Component
//import { RecruitProgressComponent } from '../invitation/recruit-progress.component';
var ListInvitationComponent = (function () {
    function ListInvitationComponent(messageService, router, route, invitationService) {
        this.messageService = messageService;
        this.router = router;
        this.route = route;
        this.invitationService = invitationService;
        this.noticeId = global_constant_1.GlobalConstant.NUMBER_NOTHING;
        this.recruitStatusCode = global_constant_1.GlobalConstant.NUMBER_NOTHING;
    }
    Object.defineProperty(ListInvitationComponent.prototype, "isValid", {
        get: function () {
            return this.noticeId != global_constant_1.GlobalConstant.NUMBER_NOTHING;
        },
        enumerable: true,
        configurable: true
    });
    ListInvitationComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.headerRows = [
            {
                columns: [
                    { header: "Notice", filter: true, field: "NoticeName", filterMatchMode: "contains", sortable: true },
                    { header: "Email", filter: true, field: "Email", filterMatchMode: "contains", sortable: true },
                    { header: "Status" },
                    { header: "Manage" }
                ]
            }
        ];
        this.queryParamSub = this.router.routerState.queryParams.subscribe(function (params) {
            _this.noticeId = (params['noticeId'] || global_constant_1.GlobalConstant.NUMBER_NOTHING);
            _this.recruitStatusCode = (params['recruitStatusCode'] || global_constant_1.GlobalConstant.NUMBER_NOTHING);
            if (_this.isValid)
                _this.refresh();
        });
    };
    ListInvitationComponent.prototype.ngOnDestroy = function () {
        this.queryParamSub.unsubscribe();
    };
    ListInvitationComponent.prototype.showInformModal = function (message) {
        this.messageService.info(message);
    };
    ListInvitationComponent.prototype.showErrorModal = function (message) {
        this.messageService.error(message);
    };
    ListInvitationComponent.prototype.handleError = function (message) {
        this.messageService.error(message);
    };
    ListInvitationComponent.prototype.refresh = function () {
        var _this = this;
        var codes = this.recruitStatusCode == global_constant_1.GlobalConstant.NUMBER_NOTHING ? [] : [this.recruitStatusCode];
        this.invitationService.getInvitations([this.noticeId], codes).then(function (result) {
            _this.invitations = result;
        })
            .catch(function (error) { _this.handleError(error); });
    };
    ListInvitationComponent.prototype.resend = function (invitation) {
        var _this = this;
        this.messageService.request();
        this.confirmSubscription = this.messageService.result.subscribe(function (result) {
            _this.confirmSubscription.unsubscribe();
            if (result == 1) {
                _this.invitationService.resendInvitation(invitation)
                    .then(function () {
                    _this.showInformModal("Completed");
                })
                    .catch(function (error) { _this.handleError(error); });
            }
        });
    };
    ListInvitationComponent.prototype.deleteInvitation = function (invitation) {
        var _this = this;
        this.messageService.request();
        this.confirmSubscription = this.messageService.result.subscribe(function (result) {
            _this.confirmSubscription.unsubscribe();
            if (result == 1) {
                _this.invitationService.deleteInvitation(invitation)
                    .then(function () {
                    for (var i = 0; i < _this.invitations.length; i++) {
                        if (_this.invitations[i].Email == invitation.Email && _this.invitations[i].NoticeId == invitation.NoticeId) {
                            _this.invitations.splice(i, 1);
                            _this.showInformModal("Deleted");
                            return;
                        }
                    }
                })
                    .catch(function (error) { _this.handleError(error); });
            }
        });
    };
    ListInvitationComponent = __decorate([
        core_1.Component({
            templateUrl: '/app/admin/list-invitation.component.html',
            styles: ["\n                .ims-header-container{\n                    text-align:left;\n                }\n            "],
            directives: [primeng_1.DataTable, primeng_1.Column, primeng_1.Button, primeng_1.Header],
            providers: [invitation_service_1.InvitationService]
        }), 
        __metadata('design:paramtypes', [message_service_1.MessageService, router_1.Router, router_1.ActivatedRoute, invitation_service_1.InvitationService])
    ], ListInvitationComponent);
    return ListInvitationComponent;
}());
exports.ListInvitationComponent = ListInvitationComponent;
//# sourceMappingURL=list-invitation.component.js.map