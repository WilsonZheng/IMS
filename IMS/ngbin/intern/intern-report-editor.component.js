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
var intern_service_1 = require('../shared/intern.service');
var task_report_1 = require('../shared/task-report');
var InternReportEditorComponent = (function () {
    function InternReportEditorComponent(internService) {
        this.internService = internService;
        this.created = new core_1.EventEmitter();
        this.updated = new core_1.EventEmitter();
        this.canceled = new core_1.EventEmitter();
        this.error = new core_1.EventEmitter();
    }
    Object.defineProperty(InternReportEditorComponent.prototype, "mode", {
        get: function () {
            return this.isCreateMode ? 'New' : 'Update';
        },
        enumerable: true,
        configurable: true
    });
    InternReportEditorComponent.prototype.ngOnInit = function () {
        if (this.isCreateMode) {
            this.report = new task_report_1.TaskReport();
            this.report.TaskId = this.taskId;
        }
    };
    InternReportEditorComponent.prototype.save = function () {
        if (!this.isCreateMode) {
            this.update();
        }
        else {
            this.create();
        }
    };
    InternReportEditorComponent.prototype.cancel = function () {
        this.canceled.emit(null);
    };
    InternReportEditorComponent.prototype.update = function () {
        var _this = this;
        this.internService.updateReport(this.report)
            .then(function (report) {
            _this.updated.emit(_this.report);
        })
            .catch(function (error) {
            _this.handleError(error);
        });
    };
    InternReportEditorComponent.prototype.create = function () {
        var _this = this;
        this.internService.createReport(this.report)
            .then(function (report) {
            _this.created.emit(report);
        })
            .catch(function (error) {
            _this.handleError(error);
        });
    };
    InternReportEditorComponent.prototype.handleError = function (msg) {
        this.error.emit(msg);
    };
    __decorate([
        core_1.Input("report"), 
        __metadata('design:type', task_report_1.TaskReport)
    ], InternReportEditorComponent.prototype, "report", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], InternReportEditorComponent.prototype, "taskId", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], InternReportEditorComponent.prototype, "isCreateMode", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], InternReportEditorComponent.prototype, "created", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], InternReportEditorComponent.prototype, "updated", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], InternReportEditorComponent.prototype, "canceled", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], InternReportEditorComponent.prototype, "error", void 0);
    InternReportEditorComponent = __decorate([
        core_1.Component({
            selector: 'intern-report-editor',
            templateUrl: '/app/intern/intern-report-editor.component.html',
            styles: ["\n        textarea[name='Content']{\n            height:20em;\n        }\n       \n      \n"],
            directives: [primeng_1.Button, primeng_1.Editor, primeng_1.Header]
        }), 
        __metadata('design:paramtypes', [intern_service_1.InternService])
    ], InternReportEditorComponent);
    return InternReportEditorComponent;
}());
exports.InternReportEditorComponent = InternReportEditorComponent;
//# sourceMappingURL=intern-report-editor.component.js.map