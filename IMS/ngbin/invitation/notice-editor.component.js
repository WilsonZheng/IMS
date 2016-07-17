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
var template_service_1 = require('./shared/template.service');
var template_1 = require('./template');
var NoticeEditorComponent = (function () {
    function NoticeEditorComponent(templateService) {
        this.templateService = templateService;
        this.created = new core_1.EventEmitter();
        this.updated = new core_1.EventEmitter();
        this.canceled = new core_1.EventEmitter();
        this.error = new core_1.EventEmitter();
        this.templateService = templateService;
    }
    NoticeEditorComponent.prototype.ngOnInit = function () {
    };
    NoticeEditorComponent.prototype.saveNotice = function () {
        if (this.notice.Id && this.notice.Id > 0) {
            this.updateNotice();
        }
        else {
            this.createNotice();
        }
    };
    NoticeEditorComponent.prototype.cancelNotice = function () {
        this.canceled.emit(null);
    };
    NoticeEditorComponent.prototype.updateNotice = function () {
        var _this = this;
        this.templateService.updateTemplate(this.notice)
            .then(function () {
            _this.updated.emit(_this.notice);
        })
            .catch(function (error) {
            _this.handleError(error);
        });
    };
    NoticeEditorComponent.prototype.createNotice = function () {
        var _this = this;
        this.templateService.createTemplate(this.notice)
            .then(function (notice) {
            _this.created.emit(notice);
        })
            .catch(function (error) {
            _this.handleError(error);
        });
    };
    NoticeEditorComponent.prototype.handleError = function (msg) {
        this.error.emit(msg);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', template_1.Template)
    ], NoticeEditorComponent.prototype, "notice", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], NoticeEditorComponent.prototype, "created", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], NoticeEditorComponent.prototype, "updated", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], NoticeEditorComponent.prototype, "canceled", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], NoticeEditorComponent.prototype, "error", void 0);
    NoticeEditorComponent = __decorate([
        core_1.Component({
            selector: 'inv-notice-editor',
            templateUrl: '/app/invitation/notice-editor.component.html',
            styleUrls: ['/app/invitation/notice-editor.component.css'],
            directives: [primeng_1.Button]
        }), 
        __metadata('design:paramtypes', [template_service_1.TemplateService])
    ], NoticeEditorComponent);
    return NoticeEditorComponent;
}());
exports.NoticeEditorComponent = NoticeEditorComponent;
//# sourceMappingURL=notice-editor.component.js.map