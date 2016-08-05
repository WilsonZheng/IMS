//Descrition: List the task involvement history for a selected intern.
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
var global_constant_1 = require('../shared/global-constant');
var bracket_date_transform_pipe_1 = require('../shared/bracket-date-transform.pipe');
var primeng_1 = require('primeng/primeng');
var TaskInvolvementComponent = (function () {
    function TaskInvolvementComponent(messageService, internService, router, route) {
        this.messageService = messageService;
        this.internService = internService;
        this.router = router;
        this.route = route;
        this.list = [];
        this.internId = global_constant_1.GlobalConstant.NUMBER_NOTHING;
    }
    Object.defineProperty(TaskInvolvementComponent.prototype, "isValid", {
        get: function () {
            return this.internId != global_constant_1.GlobalConstant.NUMBER_NOTHING;
        },
        enumerable: true,
        configurable: true
    });
    TaskInvolvementComponent.prototype.ngOnInit = function () {
        var _this = this;
        //when selected intern changes, if valid, load a new list of the comments.
        this.internIdSub = this.router.routerState.queryParams
            .subscribe(function (params) {
            _this.queryParams = params || {};
            _this.internId = (params['internId'] || global_constant_1.GlobalConstant.NUMBER_NOTHING);
            if (_this.internId != global_constant_1.GlobalConstant.NUMBER_NOTHING) {
                _this.refresh();
            }
        });
        this.headerRows = [
            {
                columns: [
                    { header: "Task", filter: true, field: "TaskName", filterMatchMode: "contains" },
                    { header: "Supervisor", filter: true, field: "SupervisorName", filterMatchMode: "contains" },
                    { header: "Finished", filter: false, field: "IsClosed" },
                    { header: "From", filter: false, field: "JoinAt" },
                    { header: "Until", filter: false, field: "LeftAt" }
                ]
            }
        ];
    };
    TaskInvolvementComponent.prototype.refresh = function () {
        var _this = this;
        this.internService.getTaskHistoryForIntern(this.internId)
            .then(function (involvements) {
            _this.list = involvements;
        })
            .catch(function (error) { return _this.handleError(error); });
    };
    TaskInvolvementComponent.prototype.ngOnDestroy = function () {
        this.internIdSub.unsubscribe();
    };
    TaskInvolvementComponent.prototype.handleError = function (error) {
        this.messageService.error(error);
    };
    TaskInvolvementComponent = __decorate([
        core_1.Component({
            templateUrl: '/app/shared/task-involvement.component.html',
            styles: ["\n        .ims-body-container{\n            margin-bottom:0px;\n        }\n\n        .panel-heading{\n                position:relative;\n        }\n\n        .ims-control-container{\n            position:absolute;\n            right:4px;\n            top:4px;\n        }\n\n         .ims-task-control{\n            text-align:left;\n            height:14px;\n            line-height:14px;\n        }\n\n        #ims-description{\n            white-space:pre-line;\n        }\n\n        .ims-inline-title{\n             text-decoration: underline;\n            font-weight:600;\n        }\n\n        .panel-body{\n            padding:1px;\n        }\n\n        .row{\n            margin:0px;\n         }\n        \n        .ims-content-display-area{\n            position:relative;\n            border:1px solid #f1f0fa;\n            margin: 4px 0px;\n            padding: 4px 2px;\n            border-radius:8px;\n\n        }\n       \n        .ims-filter-container{\n            padding: 4px 2px;\n\n        }\n\n"],
            directives: [primeng_1.Column, primeng_1.Button, primeng_1.DataTable],
            providers: [],
            pipes: [bracket_date_transform_pipe_1.BracketDateTransformPipe]
        }), 
        __metadata('design:paramtypes', [message_service_1.MessageService, intern_service_1.InternService, router_1.Router, router_1.ActivatedRoute])
    ], TaskInvolvementComponent);
    return TaskInvolvementComponent;
}());
exports.TaskInvolvementComponent = TaskInvolvementComponent;
//# sourceMappingURL=task-involvement.component.js.map