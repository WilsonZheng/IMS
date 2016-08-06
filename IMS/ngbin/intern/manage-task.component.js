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
//List the assigned tasks for the intern.
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var primeng_1 = require('primeng/primeng');
var message_service_1 = require('../shared/message.service');
var intern_service_1 = require('../shared/intern.service');
var task_to_do_1 = require('../shared/task-to-do');
var global_constant_1 = require('../shared/global-constant');
var user_1 = require('../shared/user');
var user_information_service_1 = require('../shared/user-information.service');
var ManageTaskComponent = (function () {
    function ManageTaskComponent(messageService, internService, router, route, userInformationService) {
        this.messageService = messageService;
        this.internService = internService;
        this.router = router;
        this.route = route;
        this.userInformationService = userInformationService;
        this.authUser = new user_1.User();
        this.tasks = [];
    }
    ManageTaskComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log("ManageTaskComponent.ngOnInit");
        this.userInformationService.fetchUser().then(function (user) {
            _this.authUser = user;
            _this.refresh();
        }).catch(function (error) { return _this.handleError(error); });
        this.headerRows = [
            {
                columns: [
                    { header: "Title", sortable: true },
                    { header: "Supervisor", sortable: true }
                ]
            }
        ];
        this.updateSub = this.router.routerState.queryParams
            .subscribe(function (params) {
            console.log("ManageTaskComponent. changed");
            _this.queryParams = params;
            //Handle the go back & forward operation by user.
            var taskId = +(params['taskId'] || global_constant_1.GlobalConstant.NUMBER_NOTHING);
            _this.setSelectFromQueryParam(taskId);
        });
    };
    //To notify update, change the value of any property in the queryParams object
    //or simply replace queryParams object with a new object reference.
    ManageTaskComponent.prototype.clearParams = function () {
        this.queryParams["taskId"] = global_constant_1.GlobalConstant.NUMBER_NOTHING;
        this.router.navigate([], { queryParams: this.queryParams });
    };
    ManageTaskComponent.prototype.applyParams = function () {
        this.router.navigate([], { queryParams: this.queryParams });
    };
    ManageTaskComponent.prototype.setSelectFromQueryParam = function (taskId) {
        //always check null.....
        if (this.taskSelected && (this.taskSelected.Id == taskId)) {
            //Do nothing....
            return;
        }
        if (taskId == global_constant_1.GlobalConstant.NUMBER_NOTHING) {
            this.taskSelected = new task_to_do_1.TaskToDo(); //intentionally cause reference mismatch.
            return;
        }
        var taskSelected = this.tasks.find(function (task) {
            return task.Id == taskId;
        });
        this.taskSelected = taskSelected || new task_to_do_1.TaskToDo();
    };
    ManageTaskComponent.prototype.refresh = function () {
        var _this = this;
        this.internService.getTasksForIntern(this.authUser.Id)
            .then(function (tasks) { return _this.tasks = tasks; })
            .catch(function (error) { return _this.handleError(error); });
        this.clearParams();
    };
    ManageTaskComponent.prototype.ngOnDestroy = function () {
        this.updateSub.unsubscribe();
    };
    ManageTaskComponent.prototype.handleError = function (error) {
        this.messageService.error(error);
    };
    ManageTaskComponent.prototype.onSelected = function (task) {
        this.queryParams["taskId"] = task.Id;
        this.applyParams();
    };
    ManageTaskComponent.prototype.onUnselected = function (task) {
        this.clearParams();
    };
    ManageTaskComponent = __decorate([
        core_1.Component({
            templateUrl: '/app/intern/manage-task.component.html',
            styles: ["\n                .panel-heading{\n                position:relative;\n                }\n\n                .ims-control-container{\n                position:absolute;\n                right:4px;\n                top:4px;\n                }\n\n                .panel-body{\n                padding:1px;\n                }\n\n                .ims-body-container.panel{\n                margin-bottom:2px;\n                }\n               \n    "],
            directives: [primeng_1.DataTable, primeng_1.Column, primeng_1.Button, primeng_1.Header, router_1.ROUTER_DIRECTIVES, primeng_1.Spinner],
            providers: [intern_service_1.InternService, user_information_service_1.UserInformationService]
        }), 
        __metadata('design:paramtypes', [message_service_1.MessageService, intern_service_1.InternService, router_1.Router, router_1.ActivatedRoute, user_information_service_1.UserInformationService])
    ], ManageTaskComponent);
    return ManageTaskComponent;
}());
exports.ManageTaskComponent = ManageTaskComponent;
//# sourceMappingURL=manage-task.component.js.map