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
var http_1 = require('@angular/http');
var primeng_1 = require('primeng/primeng');
var template_service_1 = require('./shared/template.service');
var template_1 = require('./template');
var TemplateComponent = (function () {
    function TemplateComponent(templateService, http) {
        this.templateService = templateService;
        this.http = http;
        this.templateEditting = false;
        //Information Modal
        this.informModal = false;
        this.informMessage = "";
        this.templateService = templateService;
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
            .catch(function (error) { _this.handError(error); });
    };
    TemplateComponent.prototype.writeEmail = function (id) {
        console.log("writeEmail:" + id);
    };
    TemplateComponent.prototype.deleteNotice = function (id) {
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
            .catch(function (error) { _this.handError(error); });
    };
    TemplateComponent.prototype.editNotice = function (id) {
        var _this = this;
        this.templateService.getTemplate(id)
            .then(function (result) {
            _this.noticeEditted = result;
            _this.templateEditting = true;
        })
            .catch(function (error) { _this.handError(error); });
    };
    TemplateComponent.prototype.closeNotice = function () {
        this.templateEditting = false;
    };
    TemplateComponent.prototype.saveNotice = function () {
        if (this.noticeEditted.Id && this.noticeEditted.Id > 0) {
            this.updateNotice();
        }
        else {
            this.createNotice();
        }
    };
    TemplateComponent.prototype.updateNotice = function () {
        var _this = this;
        this.templateService.updateTemplate(this.noticeEditted)
            .then(function () {
            for (var i = 0; i < _this.templates.length; i++) {
                if (_this.templates[i].Id == _this.noticeEditted.Id) {
                    _this.templates[i].Name = _this.noticeEditted.Name;
                    break;
                }
            }
            _this.closeNotice();
            _this.showInformModal("Updated");
        })
            .catch(function (error) { _this.handError(error); });
    };
    TemplateComponent.prototype.createNotice = function () {
        var _this = this;
        this.templateService.createTemplate(this.noticeEditted)
            .then(function (notice) {
            //Add notice at the beginning of the list.
            _this.templates.splice(0, 0, notice);
            _this.closeNotice();
            //this.showInformModal("Created");
        })
            .catch(function (error) { _this.handError(error); });
    };
    TemplateComponent.prototype.newNotice = function () {
        this.noticeEditted = new template_1.Template();
        this.templateEditting = true;
    };
    TemplateComponent.prototype.showInformModal = function (message) {
        this.informMessage = message;
        this.informModal = true;
    };
    TemplateComponent.prototype.showErrorModal = function (message) {
        this.showInformModal(message);
    };
    TemplateComponent.prototype.handError = function (message) {
        this.showErrorModal(message);
    };
    //Listing invitation by condition.
    TemplateComponent.prototype.listInvitation = function () {
        alert("not yet");
    };
    TemplateComponent = __decorate([
        core_1.Component({
            selector: 'inv-template',
            templateUrl: '/app/invitation/template.component.html',
            directives: [primeng_1.DataGrid, primeng_1.Dialog, primeng_1.Button, primeng_1.Header, primeng_1.Tooltip]
        }), 
        __metadata('design:paramtypes', [template_service_1.TemplateService, http_1.Http])
    ], TemplateComponent);
    return TemplateComponent;
}());
exports.TemplateComponent = TemplateComponent;
//# sourceMappingURL=template.component.js.map