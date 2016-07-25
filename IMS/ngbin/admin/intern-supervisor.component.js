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
require('rxjs/add/operator/map');
var primeng_1 = require('primeng/primeng');
var message_service_1 = require('../shared/message.service');
var intern_service_1 = require('./intern.service');
var supervising_request_1 = require('./supervising-request');
var manage_intern_update_code_1 = require('./manage-intern-update-code');
var global_constant_1 = require('../shared/global-constant');
var InternSupervisorComponent = (function () {
    function InternSupervisorComponent(messageService, internService, router, route) {
        this.messageService = messageService;
        this.internService = internService;
        this.router = router;
        this.route = route;
        this.internId = global_constant_1.GlobalConstant.NUMBER_NOTHING;
        //all available supervisors.
        this.supervisors = [];
        //currently connected supervisors with the intern to be worked on.
        this.supervisorsAssigned = [];
    }
    Object.defineProperty(InternSupervisorComponent.prototype, "isValid", {
        //hint for whether or not to display view.
        get: function () {
            return this.internId != global_constant_1.GlobalConstant.NUMBER_NOTHING;
        },
        enumerable: true,
        configurable: true
    });
    InternSupervisorComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.headerRows = [
            {
                columns: [
                    { header: "First Name", filter: true, field: "FirstName", filterMatchMode: "contains", sortable: true },
                    { header: "Last Name", filter: true, field: "LastName", filterMatchMode: "contains", sortable: true },
                    { header: "Supervised Interns" }
                ]
            }
        ];
        this.internIdSub = this.router.routerState.queryParams
            .subscribe(function (params) {
            _this.queryParams = params || {};
            var internId = (params['internId'] || global_constant_1.GlobalConstant.NUMBER_NOTHING);
            //only when getting updated and valid internId, fetch the current supervisor information.(including assigned interns)
            if (internId != global_constant_1.GlobalConstant.NUMBER_NOTHING && _this.internId != internId) {
                var supervisorsAssigned_1 = _this.supervisorsAssigned;
                _this.internService.getSupervisors().then(function (supervisors) {
                    //populate the variable with all the available supervisors(=staff)
                    _this.supervisors = supervisors;
                    //find already assigned supervisors for the intern to be worked on.
                    //replace the current with the newly fetched data.
                    _this.supervisorsAssigned.splice(0, _this.supervisorsAssigned.length);
                    supervisors.forEach(function (supervisor) {
                        if (supervisor.Interns.find(function (intern) { return intern.Id == internId; }) != undefined) {
                            supervisorsAssigned_1.push(supervisor);
                        }
                    });
                }).catch(function (error) { return _this.handleError(error); });
            }
            //update internId
            _this.internId = internId;
        });
    };
    InternSupervisorComponent.prototype.ngOnDestroy = function () {
        this.internIdSub.unsubscribe();
    };
    InternSupervisorComponent.prototype.handleError = function (error) {
        this.messageService.error(error);
    };
    InternSupervisorComponent.prototype.handleSupervising = function (supervisor, toConnect) {
        var _this = this;
        var model = new supervising_request_1.SupervisingRequest();
        model.ToConnect = toConnect;
        model.InternId = this.internId;
        model.SupervisorId = supervisor.Id;
        this.internService.handleSupervising(model)
            .then(function (result) {
            //update version.
            _this.queryParams.internVersion = Date.now();
            _this.queryParams.updatecode = manage_intern_update_code_1.ManageInternUpdateCode.SUPERVISOR;
            supervisor.Interns = result.Interns;
            _this.router.navigate([], {
                queryParams: _this.queryParams,
                relativeTo: _this.route
            });
        })
            .catch(function (error) { return _this.handleError(error); });
    };
    InternSupervisorComponent = __decorate([
        core_1.Component({
            templateUrl: '/app/admin/intern-supervisor.component.html',
            styles: ["\n\n .ims-body-container{\n            margin-bottom:0px;\n        }\n\n .panel-body{\n            padding:1px;\n        }\n    "],
            directives: [primeng_1.DataTable, primeng_1.Column, primeng_1.Header, primeng_1.Button],
            providers: []
        }), 
        __metadata('design:paramtypes', [message_service_1.MessageService, intern_service_1.InternService, router_1.Router, router_1.ActivatedRoute])
    ], InternSupervisorComponent);
    return InternSupervisorComponent;
}());
exports.InternSupervisorComponent = InternSupervisorComponent;
//# sourceMappingURL=intern-supervisor.component.js.map