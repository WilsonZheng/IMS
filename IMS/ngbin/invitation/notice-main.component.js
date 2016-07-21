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
var template_service_1 = require('./shared/template.service');
var invitation_service_1 = require('./shared/invitation.service');
var message_service_1 = require('../shared/message.service');
var recruit_status_code_1 = require('../shared/recruit-status-code');
//Custom Component
var notice_editor_component_1 = require('./notice-editor.component');
var invitation_editor_component_1 = require('./invitation-editor.component');
var recruit_progress_component_1 = require('./recruit-progress.component');
var NoticeMainComponent = (function () {
    function NoticeMainComponent(templateService, messageService, invitationService) {
        this.templateService = templateService;
        this.messageService = messageService;
        this.invitationService = invitationService;
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
    NoticeMainComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.loadNotice();
        this.headerRows = [
            // {
            //     columns: [{ header: "Title", rowspan: 2, filter: true, field: "Name", filterMatchMode:"contains", sortable:true}, {header:"Progress", colspan:4 }]
            // },
            { columns: [{ header: "Title", filter: true, field: "Name", filterMatchMode: "contains", sortable: true }] }
        ];
        this.menuItems = [
            { label: 'Send Invitation', icon: 'fa-envelope-o', command: function (event) { _this.writeEmail(); } },
            { label: 'Edit', icon: 'fa-edit', command: function (event) { _this.editNotice(); } },
            { label: 'Archive', icon: 'fa-archive', command: function (event) { _this.deleteNotice(); } }
        ];
    };
    NoticeMainComponent.prototype.loadNotice = function () {
        var _this = this;
        this.templateService.getTemplates()
            .then(function (templates) {
            _this.templates = templates;
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
    NoticeMainComponent.prototype.editNotice = function () {
        this.isCreatNotice = false;
        this.handleNotice = true;
    };
    NoticeMainComponent.prototype.closeNotice = function () {
        this.handleNotice = false;
    };
    NoticeMainComponent.prototype.deleteNotice = function () {
        var _this = this;
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
    //Listing invitation by condition.
    NoticeMainComponent.prototype.listInvitation = function () {
        //Not implemented yet.
    };
    NoticeMainComponent.prototype.writeEmail = function () {
        var _this = this;
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
    NoticeMainComponent.prototype.manageNotice = function (event, notice) {
        this.notice = notice;
        this.menuComponent.hide();
        this.menuComponent.toggle(event);
    };
    NoticeMainComponent.prototype.progressTotal = function (event, notice) {
        var _this = this;
        this.invitationService.getInvitations([notice.Id], []).then(function (result) {
            _this.invitations = result;
        })
            .catch(function (error) { _this.handleError(error); });
    };
    NoticeMainComponent.prototype.progressSent = function (event, notice) {
        var _this = this;
        this.invitationService.getInvitations([notice.Id], [recruit_status_code_1.RecruitStatusCode.InvitationSent]).then(function (result) {
            _this.invitations = result;
        })
            .catch(function (error) { _this.handleError(error); });
    };
    NoticeMainComponent.prototype.progressReplied = function (event, notice) {
        var _this = this;
        this.invitationService.getInvitations([notice.Id], [recruit_status_code_1.RecruitStatusCode.ContractReceived]).then(function (result) {
            _this.invitations = result;
        })
            .catch(function (error) { _this.handleError(error); });
    };
    NoticeMainComponent.prototype.progressApproved = function (event, notice) {
        var _this = this;
        this.invitationService.getInvitations([notice.Id], [recruit_status_code_1.RecruitStatusCode.Approved]).then(function (result) {
            _this.invitations = result;
        })
            .catch(function (error) { _this.handleError(error); });
    };
    NoticeMainComponent.prototype.resend = function (invitation) {
        var _this = this;
        this.messageService.request();
        this.confirmSubscription = this.messageService.result.subscribe(function (result) {
            _this.confirmSubscription.unsubscribe();
            if (result == 1) {
                _this.proceedResend(invitation);
            }
        });
    };
    NoticeMainComponent.prototype.proceedResend = function (invitation) {
        var _this = this;
        this.invitationService.resendInvitation(invitation)
            .then(function () {
            _this.showInformModal("Completed");
        })
            .catch(function (error) { _this.handleError(error); });
    };
    NoticeMainComponent.prototype.deleteInvitation = function (invitation) {
        var _this = this;
        this.messageService.request();
        this.confirmSubscription = this.messageService.result.subscribe(function (result) {
            _this.confirmSubscription.unsubscribe();
            if (result == 1) {
                _this.proceedDeleteInvitation(invitation);
            }
        });
    };
    NoticeMainComponent.prototype.proceedDeleteInvitation = function (invitation) {
        var _this = this;
        this.invitationService.deleteInvitation(invitation)
            .then(function () {
            for (var i = 0; i < _this.invitations.length; i++) {
                if (_this.invitations[i].Email == invitation.Email && _this.invitations[i].NoticeId == invitation.NoticeId) {
                    _this.invitations.splice(i, 1);
                    _this.showInformModal("Deleted");
                    //Refresh the status information for the corresponding notice which owned this deleted invitation.
                    _this.templateService.getRecruitStatus(invitation.NoticeId)
                        .then(function (status) {
                        var notice = _this.templates.find(function (template) {
                            return template.Id == invitation.NoticeId;
                        });
                        if (notice) {
                            notice.RecruitStatus = status;
                        }
                    })
                        .catch(function (error) { _this.handleError(error); });
                    return;
                }
            }
        })
            .catch(function (error) { _this.handleError(error); });
    };
    __decorate([
        core_1.ViewChild(primeng_1.Menu), 
        __metadata('design:type', primeng_1.Menu)
    ], NoticeMainComponent.prototype, "menuComponent", void 0);
    NoticeMainComponent = __decorate([
        core_1.Component({
            selector: 'inv-notice-main',
            templateUrl: '/app/invitation/notice-main.component.html',
            styles: ["\n                div[class*=\"col-\"] {\n                    padding:1px;\n                    margin:0px;\n                }\n\n                .recruit-status-stat .label-container{\n                    font-weight:400;\n                    border-radius:8px;\n                    border:1px solid #9cada0;\n                } \n\n                #quick-search-container .recruit-status-stat div[class*=\"col-\"]{\n                    padding:2px;\n                } \n\n                .ims-header-container{\n                    line-height:26px;\n                    height:26px;\n                    text-align:center;\n                }\n\n                .label-container{\n                    display:inline-block;\n                    width:100%;\n                    text-align:center;\n                }\n\n                .ims-iterator{\n                    border-radius:8px;\n                    background-color:#f5f5f5;\n                    margin:4px 0;\n                    padding:5px;\n                }\n            "],
            directives: [primeng_1.DataTable, primeng_1.Column, primeng_1.Button, primeng_1.Header, primeng_1.Menu, notice_editor_component_1.NoticeEditorComponent,
                invitation_editor_component_1.InvitationEditorComponent, recruit_progress_component_1.RecruitProgressComponent, primeng_1.Tooltip, primeng_1.DataList],
            providers: [template_service_1.TemplateService, invitation_service_1.InvitationService]
        }), 
        __metadata('design:paramtypes', [template_service_1.TemplateService, message_service_1.MessageService, invitation_service_1.InvitationService])
    ], NoticeMainComponent);
    return NoticeMainComponent;
}());
exports.NoticeMainComponent = NoticeMainComponent;
//# sourceMappingURL=notice-main.component.js.map