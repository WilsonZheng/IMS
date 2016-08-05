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
var task_report_1 = require('../shared/task-report');
var InternReportViewerComponent = (function () {
    function InternReportViewerComponent() {
        this.viewCancelled = new core_1.EventEmitter();
    }
    InternReportViewerComponent.prototype.cancel = function () {
        this.viewCancelled.emit(null);
    };
    __decorate([
        core_1.Input("report"), 
        __metadata('design:type', task_report_1.TaskReport)
    ], InternReportViewerComponent.prototype, "report", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], InternReportViewerComponent.prototype, "viewCancelled", void 0);
    InternReportViewerComponent = __decorate([
        core_1.Component({
            selector: 'intern-report-viewer',
            templateUrl: '/app/intern/intern-report-viewer.component.html',
            styles: ["\n            .ims-content{\n                white-space:pre-line;\n            }\n\n            .panel{\n                margin-bottom:1px;\n            }\n      \n            .ims-content-container{\n                border:1px solid #e1e1e8;\n                border-radius:8px;\n                background-color:#f7f7f9;\n                padding:8px;\n            }\n"],
            directives: [primeng_1.Header]
        }), 
        __metadata('design:paramtypes', [])
    ], InternReportViewerComponent);
    return InternReportViewerComponent;
}());
exports.InternReportViewerComponent = InternReportViewerComponent;
//# sourceMappingURL=intern-report-viewer.component.js.map