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
var router_1 = require('@angular/router');
var message_service_1 = require('../shared/message.service');
var intern_service_1 = require('../shared/intern.service');
var user_information_service_1 = require('../shared/user-information.service');
var bracket_date_transform_pipe_1 = require('../shared/bracket-date-transform.pipe');
var task_report_list_request_1 = require('../shared/task-report-list-request');
var global_constant_1 = require('../shared/global-constant');
var user_1 = require('../shared/user');
var intern_report_editor_component_1 = require('../shared/intern-report-editor.component');
var intern_report_viewer_component_1 = require('../shared/intern-report-viewer.component');
var primeng_1 = require('primeng/primeng');
var TaskReportComponent = (function () {
    function TaskReportComponent(messageService, internService, router, route, userInformationService) {
        this.messageService = messageService;
        this.internService = internService;
        this.router = router;
        this.route = route;
        this.userInformationService = userInformationService;
        this.authUser = new user_1.User();
        this.searchKey = "";
        this.reports = [];
        this.taskId = global_constant_1.GlobalConstant.NUMBER_NOTHING;
        this.internId = global_constant_1.GlobalConstant.NUMBER_NOTHING;
        this.handleEditor = false;
        this.isEditting = false;
        this.handleViewer = false;
    }
    Object.defineProperty(TaskReportComponent.prototype, "isValid", {
        //hint for whether or not to display view.
        get: function () {
            return this.taskId != global_constant_1.GlobalConstant.NUMBER_NOTHING && this.internId != global_constant_1.GlobalConstant.NUMBER_NOTHING;
        },
        enumerable: true,
        configurable: true
    });
    TaskReportComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userInformationService.fetchUser().then(function (user) { return _this.authUser = user; });
        this.taskIdSub = this.router.routerState.queryParams
            .subscribe(function (params) {
            _this.queryParams = params || {};
            var taskIdOrg = _this.taskId;
            var internIdOrg = _this.internId;
            _this.taskId = (params['taskId'] || global_constant_1.GlobalConstant.NUMBER_NOTHING);
            _this.internId = (params['internId'] || global_constant_1.GlobalConstant.NUMBER_NOTHING);
            //only when getting updated and valid taskId, fetch the reports
            if (_this.isValid && (_this.taskId != taskIdOrg || _this.internId != internIdOrg)) {
                _this.refresh();
            }
        });
        this.headerRows = [
            {
                columns: [
                    { header: "Date", filter: false, field: "CreatedAt", sortable: true },
                    { header: "Title", filter: true, field: "Title", filterMatchMode: "contains", sortable: true },
                    { header: "Manage", filter: false },
                ]
            }
        ];
    };
    TaskReportComponent.prototype.ngOnDestroy = function () {
        this.taskIdSub.unsubscribe();
    };
    TaskReportComponent.prototype.handleError = function (error) {
        this.messageService.error(error);
    };
    TaskReportComponent.prototype.refresh = function () {
        var _this = this;
        var request = new task_report_list_request_1.TaskReportListRequest();
        request.TaskId = this.taskId;
        request.InternId = this.internId;
        this.internService.getReports(request).then(function (reports) { return _this.reports = reports; }).catch(function (error) { return _this.handleError(error); });
        //close window.-> back to list view.
        this.handleEditor = false;
        this.handleViewer = false;
    };
    TaskReportComponent.prototype.view = function (report) {
        this.reportSelected = report;
        this.handleViewer = true;
    };
    TaskReportComponent.prototype.delete = function (report) {
        var _this = this;
        this.messageService.request();
        this.confirmSubscription = this.messageService.result.subscribe(function (result) {
            _this.confirmSubscription.unsubscribe();
            if (result == 1) {
                _this.internService.deleteReport(report).then(function (report) {
                    for (var i = 0; i < _this.reports.length; i++) {
                        var tmp = _this.reports[i];
                        if (tmp.Id == report.Id) {
                            _this.reports.splice(i, 1);
                            break;
                        }
                    }
                }).catch(function (error) { return _this.handleError(error); });
            }
        });
    };
    TaskReportComponent.prototype.create = function () {
        this.isEditting = false;
        this.handleEditor = true;
    };
    TaskReportComponent.prototype.edit = function (report) {
        this.reportSelected = report;
        this.isEditting = true;
        this.handleEditor = true;
    };
    TaskReportComponent.prototype.created = function (report) {
        this.reports.splice(0, 0, report);
        this.handleEditor = false;
    };
    TaskReportComponent.prototype.updated = function (report) {
        var tmp;
        for (var i = 0; i < this.reports.length; i++) {
            tmp = this.reports[i];
            if (tmp.Id == report.Id) {
                tmp.Title = report.Title;
                tmp.Content = report.Content;
                break;
            }
        }
        this.handleEditor = false;
    };
    TaskReportComponent.prototype.cancelled = function () {
        this.handleEditor = false;
    };
    TaskReportComponent.prototype.viewCancelled = function () {
        this.handleViewer = false;
    };
    TaskReportComponent = __decorate([
        core_1.Component({
            selector: 'intern-task-report',
            templateUrl: '/app/shared/task-report.component.html',
            styles: ["\n        .ims-body-container{\n            margin-bottom:0px;\n        }\n\n        .panel-heading{\n                position:relative;\n        }\n\n        .ims-control-container{\n            position:absolute;\n            right:4px;\n            top:4px;\n        }\n\n         .ims-task-control{\n            text-align:left;\n            height:14px;\n            line-height:14px;\n        }\n\n        #ims-content{\n            white-space:pre-line;\n        }\n\n        .ims-inline-title{\n             text-decoration: underline;\n            font-weight:600;\n        }\n\n        .panel-body{\n            padding:1px;\n        }\n\n        .row{\n            margin:0px;\n         }\n        \n        .ims-content-display-area{\n            position:relative;\n            border:1px solid #f1f0fa;\n            margin: 4px 0px;\n            padding: 4px 2px;\n            border-radius:8px;\n\n        }\n       \n        .ims-filter-container{\n            padding: 4px 2px;\n\n        }\n\n"],
            directives: [primeng_1.Column, primeng_1.Button, primeng_1.DataTable, intern_report_editor_component_1.InternReportEditorComponent, intern_report_viewer_component_1.InternReportViewerComponent],
            providers: [user_information_service_1.UserInformationService],
            pipes: [bracket_date_transform_pipe_1.BracketDateTransformPipe]
        }), 
        __metadata('design:paramtypes', [message_service_1.MessageService, intern_service_1.InternService, router_1.Router, router_1.ActivatedRoute, user_information_service_1.UserInformationService])
    ], TaskReportComponent);
    return TaskReportComponent;
}());
exports.TaskReportComponent = TaskReportComponent;
//# sourceMappingURL=task-report.component.js.map