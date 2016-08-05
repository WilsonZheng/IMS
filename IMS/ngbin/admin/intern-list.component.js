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
var ManageInternComponent = (function () {
    function ManageInternComponent(messageService, internService, router) {
        this.messageService = messageService;
        this.internService = internService;
        this.router = router;
    }
    ManageInternComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.internService.getInterns().then(function (result) { _this.interns = result; }).catch(function (error) { _this.handleError(error); });
        this.headerRows = [
            // {
            //     columns: [{ header: "Title", rowspan: 2, filter: true, field: "Name", filterMatchMode:"contains", sortable:true}, {header:"Progress", colspan:4 }]
            // },
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
    };
    ManageInternComponent.prototype.handleError = function (error) {
        this.messageService.error(error);
    };
    ManageInternComponent.prototype.superviser = function (internshipId) {
    };
    ManageInternComponent = __decorate([
        core_1.Component({
            templateUrl: '/app/admin/intern-list.component.html',
            styles: [""],
            directives: [primeng_1.DataTable, primeng_1.Column, primeng_1.Button, primeng_1.Header, router_1.ROUTER_DIRECTIVES],
            providers: [intern_service_1.InternService]
        }), 
        __metadata('design:paramtypes', [message_service_1.MessageService, intern_service_1.InternService, router_1.Router])
    ], ManageInternComponent);
    return ManageInternComponent;
}());
exports.ManageInternComponent = ManageInternComponent;
//# sourceMappingURL=intern-list.component.js.map