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
//Custom Models.
var template_1 = require('./template');
//Custom Component
var notice_editor_component_1 = require('./notice-editor.component');
var invitation_editor_component_1 = require('./invitation-editor.component');
var TemplateComponent = (function () {
    function TemplateComponent(templateService, messageService) {
        this.templateService = templateService;
        this.messageService = messageService;
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
    TemplateComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.templateService.getTemplates()
            .then(function (templates) {
            _this.templates = templates;
            //for (var i = 0; i < this.templates.length; i++) {
            //    this.templates[i].CreatedAtDate = new Date(parseInt(templates[i].CreatedAt.substr(6)));
            //}
        })
            .catch(function (error) { _this.handleError(error); });
    };
    //notice manipulation callback.
    TemplateComponent.prototype.noticeUpdated = function (notice) {
        for (var i = 0; i < this.templates.length; i++) {
            if (this.templates[i].Id == notice.Id) {
                this.templates[i].Name = notice.Name;
                break;
            }
        }
        this.closeNotice();
        this.showInformModal("Updated");
    };
    TemplateComponent.prototype.noticeCreated = function (notice) {
        this.templates.splice(0, 0, notice);
        this.closeNotice();
        this.showInformModal("created");
    };
    //notice manipuation function.
    TemplateComponent.prototype.editNotice = function (id) {
        var _this = this;
        this.templateService.getTemplate(id)
            .then(function (result) {
            _this.notice = result;
            _this.handleNotice = true;
        })
            .catch(function (error) { _this.handleError(error); });
    };
    TemplateComponent.prototype.closeNotice = function () {
        this.handleNotice = false;
    };
    TemplateComponent.prototype.deleteNotice = function (id) {
        var _this = this;
        this.messageService.request();
        this.confirmSubscription = this.messageService.result.subscribe(function (result) {
            _this.confirmSubscription.unsubscribe();
            if (result == 1) {
                _this.proceedDelete(id);
            }
        });
    };
    TemplateComponent.prototype.proceedDelete = function (id) {
        var _this = this;
        this.templateService.deleteTemplate(id)
            .then(function () {
            for (var i = 0; i < _this.templates.length; i++) {
                if (_this.templates[i].Id == id) {
                    _this.templates.splice(i, 1);
                    _this.showInformModal("Deleted");
                    return;
                }
            }
        })
            .catch(function (error) {
            _this.showErrorModal(error);
        });
    };
    TemplateComponent.prototype.newNotice = function () {
        this.notice = new template_1.Template();
        this.handleNotice = true;
    };
    TemplateComponent.prototype.showInformModal = function (message) {
        this.messageService.info(message);
    };
    TemplateComponent.prototype.showErrorModal = function (message) {
        this.messageService.error(message);
    };
    TemplateComponent.prototype.handleError = function (message) {
        this.messageService.error(message);
    };
    //Listing invitation by condition.
    TemplateComponent.prototype.listInvitation = function () {
        //Not implemented yet.
    };
    TemplateComponent.prototype.writeEmail = function (notice) {
        var _this = this;
        //Fetch the default email subject & content which have been stored for the notice(=template).
        this.templateService.getEmailTemplateContent(notice.Id)
            .then(function (templateContent) {
            _this.notice = notice;
            _this.notice.Content = templateContent;
            _this.handleInvitation = true;
        })
            .catch(function (error) { _this.handleError(error); });
    };
    TemplateComponent.prototype.invitationSuccess = function (notice) {
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
    TemplateComponent = __decorate([
        core_1.Component({
            selector: 'inv-template',
            templateUrl: '/app/invitation/template.component.html',
            directives: [primeng_1.DataGrid, primeng_1.Dialog, primeng_1.Button, primeng_1.Header, primeng_1.Tooltip, notice_editor_component_1.NoticeEditorComponent, invitation_editor_component_1.InvitationEditorComponent],
            providers: [invitation_service_1.InvitationService]
        }), 
        __metadata('design:paramtypes', [template_service_1.TemplateService, message_service_1.MessageService])
    ], TemplateComponent);
    return TemplateComponent;
}());
exports.TemplateComponent = TemplateComponent;
//# sourceMappingURL=template.component.js.map