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
var template_service_1 = require('./shared/template.service');
var invitation_service_1 = require('./shared/invitation.service');
var message_service_1 = require('../shared/message.service');
var global_constant_1 = require('../shared/global-constant');
var recruit_status_code_1 = require('../shared/recruit-status-code');
//Custom Component
var notice_editor_component_1 = require('./notice-editor.component');
var invitation_editor_component_1 = require('./invitation-editor.component');
var recruit_progress_component_1 = require('./recruit-progress.component');
var NoticeMainComponent = (function () {
    function NoticeMainComponent(templateService, messageService, invitationService, router, route) {
        this.templateService = templateService;
        this.messageService = messageService;
        this.invitationService = invitationService;
        this.router = router;
        this.route = route;
        this.noticeId = global_constant_1.GlobalConstant.NUMBER_NOTHING;
        this.recruitStatusCode = global_constant_1.GlobalConstant.NUMBER_NOTHING;
        this.isCreatNotice = false;
        this.noticeOption = {
            resizable: false
        };
        this.handleNotice = false;
        //Write Invitation
        this.handleInvitation = false;
        this.invitationOption = {
            resizable: false
        };
    }
    Object.defineProperty(NoticeMainComponent.prototype, "CODE_SENT", {
        ///////////////////////// RecruitStatusCode constant/////////////////////////
        get: function () {
            return recruit_status_code_1.RecruitStatusCode.InvitationSent;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NoticeMainComponent.prototype, "CODE_REPLIED", {
        get: function () {
            return recruit_status_code_1.RecruitStatusCode.ContractReceived;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NoticeMainComponent.prototype, "CODE_APPROVED", {
        get: function () {
            return recruit_status_code_1.RecruitStatusCode.Approved;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NoticeMainComponent.prototype, "CODE_ALL", {
        get: function () {
            return global_constant_1.GlobalConstant.NUMBER_NOTHING;
        },
        enumerable: true,
        configurable: true
    });
    NoticeMainComponent.prototype.isSelected = function (notice, status) {
        return this.noticeId == notice.Id && this.recruitStatusCode == status;
    };
    NoticeMainComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.loadNotice();
        this.headerRows = [
            {
                columns: [
                    { header: "Title", filter: true, field: "Name", filterMatchMode: "contains", sortable: true },
                    { header: "Progress" },
                    { header: "Manage" }
                ]
            }
        ];
        this.queryParamSub = this.router.routerState.queryParams.subscribe(function (params) {
            _this.noticeId = (params['noticeId'] || global_constant_1.GlobalConstant.NUMBER_NOTHING);
            _this.recruitStatusCode = (params['recruitStatusCode'] || global_constant_1.GlobalConstant.NUMBER_NOTHING);
        });
    };
    NoticeMainComponent.prototype.ngOnDestroy = function () {
        this.queryParamSub.unsubscribe();
    };
    NoticeMainComponent.prototype.loadNotice = function () {
        var _this = this;
        this.templateService.getTemplates()
            .then(function (templates) {
            _this.templates = templates;
            _this.clearParams();
        })
            .catch(function (error) { _this.handleError(error); });
    };
    //notice manipulation callback.
    NoticeMainComponent.prototype.noticeUpdated = function (notice) {
        for (var i = 0; i < this.templates.length; i++) {
            if (this.templates[i].Id == notice.Id) {
                this.templates[i].Name = notice.Name;
                break;
            }
        }
        this.closeNotice();
        this.showInformModal("Updated");
    };
    NoticeMainComponent.prototype.clearParams = function () {
        this.router.navigate([], { queryParams: {}, relativeTo: this.route });
    };
    NoticeMainComponent.prototype.noticeCreated = function (notice) {
        this.templates.splice(0, 0, notice);
        this.closeNotice();
        this.showInformModal("created");
    };
    NoticeMainComponent.prototype.newNotice = function () {
        this.isCreatNotice = true;
        this.handleNotice = true;
    };
    //notice manipuation function.
    NoticeMainComponent.prototype.editNotice = function (notice) {
        this.notice = notice;
        this.isCreatNotice = false;
        this.handleNotice = true;
    };
    NoticeMainComponent.prototype.closeNotice = function () {
        this.handleNotice = false;
    };
    NoticeMainComponent.prototype.deleteNotice = function (notice) {
        var _this = this;
        this.notice = notice;
        this.messageService.request();
        this.confirmSubscription = this.messageService.result.subscribe(function (result) {
            _this.confirmSubscription.unsubscribe();
            if (result == 1) {
                _this.proceedDelete(_this.notice.Id);
            }
        });
    };
    NoticeMainComponent.prototype.proceedDelete = function (id) {
        var _this = this;
        this.templateService.deleteTemplate(id)
            .then(function () {
            for (var i = 0; i < _this.templates.length; i++) {
                if (_this.templates[i].Id == id) {
                    _this.templates.splice(i, 1);
                    _this.showInformModal("Archived");
                    return;
                }
            }
        })
            .catch(function (error) {
            _this.showErrorModal(error);
        });
    };
    NoticeMainComponent.prototype.showInformModal = function (message) {
        this.messageService.info(message);
    };
    NoticeMainComponent.prototype.showErrorModal = function (message) {
        this.messageService.error(message);
    };
    NoticeMainComponent.prototype.handleError = function (message) {
        this.messageService.error(message);
    };
    NoticeMainComponent.prototype.writeEmail = function (notice) {
        var _this = this;
        this.notice = notice;
        //Fetch the default email subject & content which have been stored for the notice(=template).
        this.templateService.getEmailTemplateContent(this.notice.Id)
            .then(function (templateContent) {
            _this.notice.Content = templateContent;
            _this.handleInvitation = true;
        })
            .catch(function (error) { _this.handleError(error); });
    };
    NoticeMainComponent.prototype.invitationSuccess = function (notice) {
        var _this = this;
        this.messageService.info("Request completed");
        this.handleInvitation = false;
        //update RecruitStatus.
        this.templateService.getRecruitStatus(notice.Id)
            .then(function (status) {
            notice.RecruitStatus = status;
        })
            .catch(function (error) { _this.handleError(error); });
    };
    NoticeMainComponent.prototype.invitationCancelled = function () {
        this.handleInvitation = false;
    };
    NoticeMainComponent.prototype.progressTotal = function (notice) {
        this.router.navigate(['invitation'], { queryParams: { noticeId: notice.Id }, relativeTo: this.route });
    };
    NoticeMainComponent.prototype.progressSent = function (notice) {
        var queryParams = {
            noticeId: notice.Id,
            recruitStatusCode: recruit_status_code_1.RecruitStatusCode.InvitationSent
        };
        this.router.navigate(['invitation'], { queryParams: queryParams, relativeTo: this.route });
    };
    NoticeMainComponent.prototype.progressReplied = function (notice) {
        var queryParams = {
            noticeId: notice.Id,
            recruitStatusCode: recruit_status_code_1.RecruitStatusCode.ContractReceived
        };
        this.router.navigate(['invitation'], { queryParams: queryParams, relativeTo: this.route });
    };
    NoticeMainComponent.prototype.progressApproved = function (notice) {
        var queryParams = {
            noticeId: notice.Id,
            recruitStatusCode: recruit_status_code_1.RecruitStatusCode.Approved
        };
        this.router.navigate(['invitation'], { queryParams: queryParams, relativeTo: this.route });
    };
    NoticeMainComponent = __decorate([
        core_1.Component({
            selector: 'inv-notice-main',
            templateUrl: '/app/invitation/notice-main.component.html',
            styles: ["\n                div[class*=\"col-\"] {\n                    padding:1px;\n                    margin:0px;\n                }\n\n                .recruit-status-stat .label-container{\n                    font-weight:400;\n                    border-radius:8px;\n                    border:1px solid #9cada0;\n                } \n\n                .ims-header-container{\n                    line-height:26px;\n                    height:26px;\n                    text-align:left;\n                }\n\n                .label-container{\n                    display:inline-block;\n                    width:100%;\n                    text-align:center;\n                }\n\n                .ims-iterator{\n                    border-radius:8px;\n                    background-color:#f5f5f5;\n                    margin:4px 0;\n                    padding:5px;\n                }\n\n                .badge.imsselected{\n                    color: red;\n                    background-color:yellow;\n                 }\n            "],
            directives: [primeng_1.DataTable, primeng_1.Column, primeng_1.Button, primeng_1.Header, primeng_1.Menu, notice_editor_component_1.NoticeEditorComponent,
                invitation_editor_component_1.InvitationEditorComponent, recruit_progress_component_1.RecruitProgressComponent, primeng_1.Tooltip, primeng_1.DataList, router_1.ROUTER_DIRECTIVES],
            providers: [template_service_1.TemplateService, invitation_service_1.InvitationService]
        }), 
        __metadata('design:paramtypes', [template_service_1.TemplateService, message_service_1.MessageService, invitation_service_1.InvitationService, router_1.Router, router_1.ActivatedRoute])
    ], NoticeMainComponent);
    return NoticeMainComponent;
}());
exports.NoticeMainComponent = NoticeMainComponent;
//# sourceMappingURL=notice-main.component.js.map