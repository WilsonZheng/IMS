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
var template_1 = require('./template');
var invitation_service_1 = require('./shared/invitation.service');
var InvitationEditorComponent = (function () {
    function InvitationEditorComponent(invitationService) {
        this.invitationService = invitationService;
        this.created = new core_1.EventEmitter();
        this.updated = new core_1.EventEmitter();
        this.canceled = new core_1.EventEmitter();
        this.error = new core_1.EventEmitter();
    }
    InvitationEditorComponent.prototype.ngOnInit = function () {
    };
    InvitationEditorComponent.prototype.saveNotice = function () {
        if (this.notice.Id && this.notice.Id > 0) {
            this.updateNotice();
        }
        else {
            this.createNotice();
        }
    };
    InvitationEditorComponent.prototype.cancelNotice = function () {
        this.canceled.emit(null);
    };
    InvitationEditorComponent.prototype.updateNotice = function () {
        var _this = this;
        this.invitationService.updateTemplate(this.notice)
            .then(function () {
            _this.updated.emit(_this.notice);
        })
            .catch(function (error) {
            _this.handleError(error);
        });
    };
    InvitationEditorComponent.prototype.createNotice = function () {
        var _this = this;
        this.invitationService.createTemplate(this.notice)
            .then(function (notice) {
            _this.created.emit(notice);
        })
            .catch(function (error) {
            _this.handleError(error);
        });
    };
    InvitationEditorComponent.prototype.handleError = function (msg) {
        this.error.emit(msg);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', template_1.Template)
    ], InvitationEditorComponent.prototype, "notice", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], InvitationEditorComponent.prototype, "created", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], InvitationEditorComponent.prototype, "updated", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], InvitationEditorComponent.prototype, "canceled", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], InvitationEditorComponent.prototype, "error", void 0);
    InvitationEditorComponent = __decorate([
        core_1.Component({
            selector: 'inv-invitation-editor',
            templateUrl: '/app/invitation/invitation-editor.component.html'
        }), 
        __metadata('design:paramtypes', [invitation_service_1.InvitationService])
    ], InvitationEditorComponent);
    return InvitationEditorComponent;
}());
exports.InvitationEditorComponent = InvitationEditorComponent;
//# sourceMappingURL=invitation-editor.component.js.map