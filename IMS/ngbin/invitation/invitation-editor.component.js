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
var primeng_1 = require('primeng/primeng');
var invitation_service_1 = require('./shared/invitation.service');
var message_service_1 = require('../shared/message.service');
var utility_service_1 = require('../shared/utility.service');
var template_1 = require('./template');
var invitation_batch_model_1 = require('./invitation-batch.model');
var invitation_batch_transfer_1 = require('./invitation-batch.transfer');
var InvitationEditorComponent = (function () {
    function InvitationEditorComponent(invitationService, messageService, utilityService) {
        this.invitationService = invitationService;
        this.messageService = messageService;
        this.utilityService = utilityService;
        this.success = new core_1.EventEmitter();
        this.msgs = [];
    }
    InvitationEditorComponent.prototype.ngOnInit = function () {
        this.invitation = new invitation_batch_model_1.InvitationBatchModel();
        this.invitation.Subject = this.notice.Content.DefaultSubject;
        this.invitation.Content = this.notice.Content.DefaultContent;
        this.invitation.NoticeId = this.notice.Id;
    };
    InvitationEditorComponent.prototype.transform = function () {
        var _this = this;
        var emails = this.invitation.Email.replace(/\s/g, "").split(",");
        var isValid = true;
        emails.forEach(function (email, index, arr) {
            if (!_this.utilityService.validEmail(email)) {
                _this.messageService.warn(email + ' is not a valid address');
                isValid = false;
            }
        });
        if (!isValid)
            return null;
        var batch = new invitation_batch_transfer_1.InvitationBatchTransfer(this.invitation.NoticeId, this.invitation.Subject, this.invitation.Content, emails);
        return batch;
    };
    InvitationEditorComponent.prototype.save = function () {
        var _this = this;
        var batch = this.transform();
        if (batch) {
            this.invitationService.saveInvitation(batch).then(function () {
                _this.success.emit(_this.notice);
            }).catch(function (error) { return _this.handleError(error); });
        }
    };
    InvitationEditorComponent.prototype.send = function () {
        var _this = this;
        var batch = this.transform();
        if (batch) {
            this.invitationService.sendInvitation(batch).then(function () {
                _this.success.emit(_this.notice);
            }).catch(function (error) { return _this.handleError(error); });
        }
    };
    InvitationEditorComponent.prototype.preview = function () {
    };
    InvitationEditorComponent.prototype.handleError = function (message) {
        this.messageService.error(message);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', template_1.Template)
    ], InvitationEditorComponent.prototype, "notice", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], InvitationEditorComponent.prototype, "success", void 0);
    InvitationEditorComponent = __decorate([
        core_1.Component({
            selector: 'inv-invitation-editor',
            templateUrl: '/app/invitation/invitation-editor.component.html',
            directives: [primeng_1.Growl],
            providers: [invitation_service_1.InvitationService, utility_service_1.UtilityService]
        }), 
        __metadata('design:paramtypes', [invitation_service_1.InvitationService, message_service_1.MessageService, utility_service_1.UtilityService])
    ], InvitationEditorComponent);
    return InvitationEditorComponent;
}());
exports.InvitationEditorComponent = InvitationEditorComponent;
//# sourceMappingURL=invitation-editor.component.js.map