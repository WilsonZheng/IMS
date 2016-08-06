//Description: Display the current task assignment information and provide the tool to manage them.
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
var task_to_do_1 = require('../shared/task-to-do');
var global_constant_1 = require('../shared/global-constant');
var intern_task_editor_component_1 = require('./intern-task-editor.component');
var manage_participant_request_1 = require('../shared/manage-participant-request');
var manage_intern_update_code_1 = require('../shared/manage-intern-update-code');
var user_1 = require('../shared/user');
var task_report_component_1 = require('../shared/task-report.component');
var primeng_1 = require('primeng/primeng');
var InternTaskComponent = (function () {
    function InternTaskComponent(messageService, internService, router, route, userInformationService) {
        this.messageService = messageService;
        this.internService = internService;
        this.router = router;
        this.route = route;
        this.userInformationService = userInformationService;
        this.searchKey = "";
        this.authUser = new user_1.User();
        this.internId = global_constant_1.GlobalConstant.NUMBER_NOTHING;
        this.taskId = global_constant_1.GlobalConstant.NUMBER_NOTHING;
        this.tasks = [];
        this.handleTaskEditor = false;
        this.isTaskEdit = false;
    }
    Object.defineProperty(InternTaskComponent.prototype, "filteredTasks", {
        get: function () {
            var searchKey = this.searchKey;
            return this.tasks.filter(function (task) {
                if (!searchKey)
                    return true;
                return (task.Description.includes(searchKey)
                    || task.SupervisorName.includes(searchKey)
                    || task.Title.includes(searchKey));
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InternTaskComponent.prototype, "isValid", {
        get: function () {
            return this.internId != global_constant_1.GlobalConstant.NUMBER_NOTHING;
        },
        enumerable: true,
        configurable: true
    });
    InternTaskComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userInformationService.fetchUser().then(function (user) { return _this.authUser = user; }).catch(function (error) { return _this.handleError(error); });
        //fetch all available tasks with its participants information.
        this.internService.getTasks().then(function (tasks) { return _this.tasks = tasks; }).catch(function (error) { return _this.handleError(error); });
        //when selected intern changes, if valid, load a new list of the comments.
        this.internIdSub = this.router.routerState.queryParams
            .subscribe(function (params) {
            _this.queryParams = params || {};
            _this.internId = (params['internId'] || global_constant_1.GlobalConstant.NUMBER_NOTHING);
            _this.taskId = (params['taskId'] || global_constant_1.GlobalConstant.NUMBER_NOTHING);
        });
    };
    InternTaskComponent.prototype.ngOnDestroy = function () {
        this.internIdSub.unsubscribe();
    };
    InternTaskComponent.prototype.handleError = function (error) {
        this.messageService.error(error);
    };
    InternTaskComponent.prototype.createTask = function () {
        this.isTaskEdit = false;
        this.handleTaskEditor = true;
    };
    InternTaskComponent.prototype.cloneTask = function (task) {
        var _this = this;
        this.messageService.request();
        this.confirmSubscription = this.messageService.result.subscribe(function (result) {
            _this.confirmSubscription.unsubscribe();
            if (result == 1) {
                var cloned = new task_to_do_1.TaskToDo();
                cloned.Description = task.Description;
                cloned.Title = task.Title;
                _this.internService.createTask(cloned)
                    .then(function (response) {
                    _this.tasks.splice(0, 0, response);
                })
                    .catch(function (error) { return _this.handleError(error); });
            }
        });
    };
    InternTaskComponent.prototype.editTask = function (task) {
        this.taskSelected = task;
        this.isTaskEdit = true;
        this.handleTaskEditor = true;
    };
    InternTaskComponent.prototype.deleteTask = function (task) {
        var _this = this;
        this.messageService.request();
        this.confirmSubscription = this.messageService.result.subscribe(function (result) {
            _this.confirmSubscription.unsubscribe();
            if (result == 1) {
                _this.internService.deleteTask(task).then(function () {
                    for (var i = 0; i < _this.tasks.length; i++) {
                        if (task.Id == _this.tasks[i].Id) {
                            _this.tasks.splice(i, 1);
                            return;
                        }
                    }
                }).catch(function (error) { return _this.handleError(error); });
            }
        });
    };
    InternTaskComponent.prototype.closeTask = function (task) {
        var _this = this;
        this.messageService.request();
        this.confirmSubscription = this.messageService.result.subscribe(function (result) {
            _this.confirmSubscription.unsubscribe();
            if (result == 1) {
                _this.internService.closeTask(task).then(function () {
                    for (var i = 0; i < _this.tasks.length; i++) {
                        if (task.Id == _this.tasks[i].Id) {
                            _this.tasks.splice(i, 1);
                            return;
                        }
                    }
                }).catch(function (error) { return _this.handleError(error); });
            }
        });
    };
    InternTaskComponent.prototype.refreshTasks = function () {
        var _this = this;
        this.internService.getTasks()
            .then(function (tasks) { return _this.tasks = tasks; })
            .catch(function (error) { return _this.handleError(error); });
    };
    InternTaskComponent.prototype.taskJobCancelled = function () {
        this.handleTaskEditor = false;
    };
    InternTaskComponent.prototype.taskCreated = function (task) {
        this.tasks.splice(0, 0, task);
        this.handleTaskEditor = false;
    };
    InternTaskComponent.prototype.taskUpdated = function (task) {
        this.taskSelected.Title = task.Title;
        this.taskSelected.Description = task.Description;
        this.handleTaskEditor = false;
    };
    //Check whether the current intern is involved in a task with the passed in taskId.
    InternTaskComponent.prototype.contain = function (taskId) {
        if (!this.isValid)
            return false;
        var contained = false;
        for (var i = 0; i < this.tasks.length; i++) {
            if (this.tasks[i].Id == taskId) {
                var participants = this.tasks[i].Participants;
                for (var j = 0; j < participants.length; j++) {
                    if (participants[j].Id == this.internId) {
                        contained = true;
                        break;
                    }
                }
                break;
            }
        }
        return contained;
    };
    InternTaskComponent.prototype.removeParticipant = function (task, participant) {
        var _this = this;
        this.messageService.request();
        this.confirmSubscription = this.messageService.result.subscribe(function (result) {
            _this.confirmSubscription.unsubscribe();
            if (result == 1) {
                var request = new manage_participant_request_1.ManageParticipantRequest();
                request.TaskId = task.Id;
                request.ParticipantId = participant.Id;
                request.IsJoining = false;
                _this.internService.manageParticipant(request).then(function (participants) {
                    task.Participants = participants;
                    //update version.
                    _this.queryParams.internVersion = Date.now();
                    _this.queryParams.updatecode = manage_intern_update_code_1.ManageInternUpdateCode.TASK;
                    _this.queryParams.internId = participant.Id;
                    _this.router.navigate([], {
                        queryParams: _this.queryParams,
                        relativeTo: _this.route
                    });
                }).catch(function (error) { return _this.handleError(error); });
            }
        });
    };
    InternTaskComponent.prototype.participate = function (task, isJoining) {
        var _this = this;
        this.messageService.request();
        this.confirmSubscription = this.messageService.result.subscribe(function (result) {
            _this.confirmSubscription.unsubscribe();
            if (result == 1) {
                var request = new manage_participant_request_1.ManageParticipantRequest();
                request.TaskId = task.Id;
                request.ParticipantId = _this.internId;
                request.IsJoining = isJoining;
                _this.internService.manageParticipant(request).then(function (participants) {
                    task.Participants = participants;
                    //update version.
                    _this.queryParams.internVersion = Date.now();
                    _this.queryParams.updatecode = manage_intern_update_code_1.ManageInternUpdateCode.TASK;
                    _this.router.navigate([], {
                        queryParams: _this.queryParams,
                        relativeTo: _this.route
                    });
                }).catch(function (error) { return _this.handleError(error); });
            }
        });
    };
    InternTaskComponent.prototype.taskReport = function (task, reporter) {
        var taskIdOrg = this.queryParams['taskId'] || global_constant_1.GlobalConstant.NUMBER_NOTHING;
        var internIdOrg = this.queryParams['internId'] || global_constant_1.GlobalConstant.NUMBER_NOTHING;
        if (taskIdOrg == task.Id && internIdOrg == reporter.Id) {
            this.clearParams();
        }
        else {
            this.queryParams['taskId'] = task.Id;
            this.queryParams['internId'] = reporter.Id;
            this.applyParams();
        }
    };
    InternTaskComponent.prototype.clearParams = function () {
        this.queryParams['taskId'] = global_constant_1.GlobalConstant.NUMBER_NOTHING;
        this.queryParams['internId'] = global_constant_1.GlobalConstant.NUMBER_NOTHING;
        this.applyParams();
    };
    InternTaskComponent.prototype.applyParams = function () {
        this.router.navigate([], { relativeTo: this.route, queryParams: this.queryParams });
    };
    InternTaskComponent = __decorate([
        core_1.Component({
            templateUrl: '/app/admin/intern-task.component.html',
            styles: ["\n        .ims-body-container{\n            margin-bottom:0px;\n        }\n\n        .panel-heading{\n                position:relative;\n        }\n\n        .ims-control-container{\n            position:absolute;\n            right:4px;\n            top:4px;\n        }\n\n         .ims-task-control{\n            text-align:left;\n            height:14px;\n            line-height:14px;\n        }\n\n        #ims-description{\n            white-space:pre-line;\n        }\n\n        .ims-inline-title{\n             text-decoration: underline;\n            font-weight:600;\n        }\n\n        .panel-body{\n            padding:1px;\n        }\n\n        .row{\n            margin:0px;\n         }\n        \n        .ims-content-display-area{\n            position:relative;\n            border:1px solid #f1f0fa;\n            margin: 4px 0px;\n            padding: 4px 2px;\n            border-radius:8px;\n\n        }\n       \n        .ims-filter-container{\n            padding: 4px 2px;\n\n        }\n        .ims-participant .imsselected{\n            color: blue;\n            font-size:1.2em;\n        }\n\n"],
            directives: [primeng_1.Column, primeng_1.Button, intern_task_editor_component_1.InternTaskEditorComponent, primeng_1.DataList, task_report_component_1.TaskReportComponent],
            providers: [user_information_service_1.UserInformationService]
        }), 
        __metadata('design:paramtypes', [message_service_1.MessageService, intern_service_1.InternService, router_1.Router, router_1.ActivatedRoute, user_information_service_1.UserInformationService])
    ], InternTaskComponent);
    return InternTaskComponent;
}());
exports.InternTaskComponent = InternTaskComponent;
//# sourceMappingURL=intern-task.component.js.map