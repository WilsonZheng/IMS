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
var primeng_1 = require('primeng/primeng');
//Custom service
var message_service_1 = require('../shared/message.service');
//Custom Component
var RecruitProgressComponent = (function () {
    function RecruitProgressComponent(messageService) {
        this.messageService = messageService;
    }
    RecruitProgressComponent.prototype.ngOnInit = function () {
        //this.headerRows = [
        //    {
        //        columns: [{ header: "Title", rowspan: 2, filter: true, field: "Name", filterMatchMode: "contains", sortable: true }, { header: "Progress", colspan: 4 }]
        //    },
        //    {
        //        columns: [{ header: "Total" }, { header: "Send" }, { header: "Replied" }, { header: "Approved" }]
        //    }
        //];
    };
    RecruitProgressComponent.prototype.handleError = function (message) {
        this.messageService.error(message);
    };
    RecruitProgressComponent = __decorate([
        core_1.Component({
            selector: 'inv-recruit-progress-list',
            templateUrl: '/app/invitation/recruit-progress-list.component.html',
            directives: [primeng_1.DataTable, primeng_1.Column, primeng_1.Button]
        }), 
        __metadata('design:paramtypes', [message_service_1.MessageService])
    ], RecruitProgressComponent);
    return RecruitProgressComponent;
}());
exports.RecruitProgressComponent = RecruitProgressComponent;
//# sourceMappingURL=recruit-progress-list.component.js.map