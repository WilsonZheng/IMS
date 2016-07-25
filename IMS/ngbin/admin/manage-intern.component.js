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
var primeng_1 = require('primeng/primeng');
var message_service_1 = require('../shared/message.service');
var intern_service_1 = require('./intern.service');
var intern_1 = require('./intern');
var manage_intern_update_code_1 = require('./manage-intern-update-code');
var global_constant_1 = require('../shared/global-constant');
var intern_search_condition_1 = require('./intern-search-condition');
var ManageInternComponent = (function () {
    function ManageInternComponent(messageService, internService, router, route) {
        this.messageService = messageService;
        this.internService = internService;
        this.router = router;
        this.route = route;
        this.internSearchCondition = new intern_search_condition_1.InternSearchCondition();
        this.interns = [];
        this.internVersion = 0;
    }
    ManageInternComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.headerRows = [
            {
                columns: [
                    { header: "First Name", filter: true, field: "FirstName", filterMatchMode: "contains", sortable: true },
                    { header: "Last Name", filter: true, field: "LastName", filterMatchMode: "contains", sortable: true },
                    { header: "User Name", filter: true, field: "UserName", filterMatchMode: "contains", sortable: true },
                    { header: "Supervisor", filter: false },
                    { header: "Task", filter: false }
                ]
            }
        ];
        this.updateSub = this.router.routerState.queryParams
            .subscribe(function (params) {
            //Handle the go back & forward operation by user.
            var internId = +(params['internId'] || global_constant_1.GlobalConstant.NUMBER_NOTHING);
            _this.setSelectFromQueryParam(internId);
            //Check the update.
            var version = +(params['internVersion'] || global_constant_1.GlobalConstant.NUMBER_NOTHING);
            if (version != global_constant_1.GlobalConstant.NUMBER_NOTHING && version != _this.internVersion) {
                _this.internVersion = version;
                var updatecode = +params['updatecode'];
                _this.onUpdate(updatecode);
            }
        });
        this.search();
    };
    ManageInternComponent.prototype.search = function () {
        var _this = this;
        this.internService.getInterns(this.internSearchCondition)
            .then(function (result) {
            _this.interns = result;
            //when the dataset is refreshed after one record has been selected, the selection match will be lost.
            //Without clearing the global queryParams(internId), the detail child-view would remain as it was.
            //To avoid this situation, clear all global queryParams which in turn deactivates its detail child-view.
            _this.router.navigate([], {
                queryParams: {},
                relativeTo: _this.route
            });
        })
            .catch(function (error) { _this.handleError(error); });
    };
    ManageInternComponent.prototype.setSelectFromQueryParam = function (internId) {
        var selectedIntern = new intern_1.Intern();
        if (internId == global_constant_1.GlobalConstant.NUMBER_NOTHING) {
            this.selectedIntern = selectedIntern;
        }
        if (this.selectedIntern && this.selectedIntern.Id == internId) {
            return;
        }
        for (var i = 0; i < this.interns.length; i++) {
            if (this.interns[i].Id == internId) {
                selectedIntern = this.interns[i];
                break;
            }
        }
        this.selectedIntern = selectedIntern;
    };
    //Detect any update from the component hosted inside router-outlet.
    ManageInternComponent.prototype.onUpdate = function (updatecode) {
        var _this = this;
        if (updatecode == manage_intern_update_code_1.ManageInternUpdateCode.SUPERVISOR) {
            this.internService.getSupervisorsForIntern(this.selectedIntern.Id)
                .then(function (supervisors) { return _this.selectedIntern.Supervisors = supervisors; })
                .catch(function (error) { return _this.handleError(error); });
        }
        else if (updatecode == manage_intern_update_code_1.ManageInternUpdateCode.TASK) {
            this.internService.getTasksForIntern(this.selectedIntern.Id)
                .then(function (tasks) { return _this.selectedIntern.TaskToDos = tasks; })
                .catch(function (error) { return _this.handleError(error); });
        }
    };
    ManageInternComponent.prototype.ngOnDestroy = function () {
        this.updateSub.unsubscribe();
    };
    ManageInternComponent.prototype.handleError = function (error) {
        this.messageService.error(error);
    };
    ManageInternComponent.prototype.superviser = function (internshipId) {
    };
    ManageInternComponent.prototype.onInternSelected = function (event) {
        var intern = event.data;
        this.router.navigate([], {
            queryParams: { internId: intern.Id },
            relativeTo: this.route
        });
    };
    //remove query params.
    ManageInternComponent.prototype.onInternUnselected = function (event) {
        var intern = event.data;
        this.router.navigate([], {
            queryParams: {},
            relativeTo: this.route
        });
    };
    ManageInternComponent = __decorate([
        core_1.Component({
            templateUrl: '/app/admin/manage-intern.component.html',
            styles: ["\n                .panel-heading{\n                position:relative;\n                }\n\n                .ims-control-container{\n                position:absolute;\n                right:4px;\n                top:4px;\n                }\n\n                .panel-body{\n                padding:1px;\n                }\n\n                .ims-body-container.panel{\n                margin-bottom:2px;\n                }\n               \n    "],
            directives: [primeng_1.DataTable, primeng_1.Column, primeng_1.Button, primeng_1.Header, router_1.ROUTER_DIRECTIVES, primeng_1.Spinner],
            providers: [intern_service_1.InternService]
        }), 
        __metadata('design:paramtypes', [message_service_1.MessageService, intern_service_1.InternService, router_1.Router, router_1.ActivatedRoute])
    ], ManageInternComponent);
    return ManageInternComponent;
}());
exports.ManageInternComponent = ManageInternComponent;
//# sourceMappingURL=manage-intern.component.js.map