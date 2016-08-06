//List the current registered users. Can reset password, lock or release a selected account.
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
var bracket_date_transform_pipe_1 = require('../shared/bracket-date-transform.pipe');
var account_service_1 = require('../shared/account.service');
var ManageAccountComponent = (function () {
    function ManageAccountComponent(messageService, router, accountService, route) {
        this.messageService = messageService;
        this.router = router;
        this.accountService = accountService;
        this.route = route;
        this.users = [];
    }
    ManageAccountComponent.prototype.ngOnInit = function () {
        this.headerRows = [
            {
                columns: [
                    { header: "Name", field: "FullName", filter: true, filterMatchMode: "contains", sortable: true },
                    { header: "Username", field: "UserName", filter: true, filterMatchMode: "contains", sortable: true },
                    { header: "Role" },
                    { header: "Manage" }
                ]
            }
        ];
        this.refresh();
    };
    ManageAccountComponent.prototype.ngOnDestroy = function () {
    };
    ManageAccountComponent.prototype.handleError = function (error) {
        this.messageService.error(error);
    };
    ManageAccountComponent.prototype.refresh = function () {
        var _this = this;
        this.accountService.getUsers().then(function (response) { return _this.users = response; })
            .catch(function (error) { return _this.handleError(error); });
    };
    ManageAccountComponent.prototype.resetPassword = function (user) {
        var _this = this;
        this.accountService.resetPassword(user.Id).then(function () {
            _this.messageService.info("Password has been reset to 111111.");
        })
            .catch(function (error) { return _this.handleError(error); });
    };
    ManageAccountComponent.prototype.release = function (user) {
        var _this = this;
        this.accountService.release(user.Id).then(function () {
            user.Locked = false;
        })
            .catch(function (error) { return _this.handleError(error); });
    };
    ManageAccountComponent.prototype.lock = function (user) {
        var _this = this;
        this.accountService.lock(user.Id).then(function () {
            user.Locked = true;
        })
            .catch(function (error) { return _this.handleError(error); });
    };
    ManageAccountComponent = __decorate([
        core_1.Component({
            templateUrl: '/app/admin/manage-account.component.html',
            styles: ["\n                .panel-heading{\n                position:relative;\n                }\n\n                .ims-control-container{\n                position:absolute;\n                right:4px;\n                top:4px;\n                }\n\n                .panel-body{\n                padding:1px;\n                }\n\n                .ims-body-container.panel{\n                margin-bottom:2px;\n                }\n               \n    "],
            directives: [primeng_1.DataTable, primeng_1.Column, primeng_1.Button, primeng_1.Header, router_1.ROUTER_DIRECTIVES],
            providers: [account_service_1.AccountService],
            pipes: [bracket_date_transform_pipe_1.BracketDateTransformPipe]
        }), 
        __metadata('design:paramtypes', [message_service_1.MessageService, router_1.Router, account_service_1.AccountService, router_1.ActivatedRoute])
    ], ManageAccountComponent);
    return ManageAccountComponent;
}());
exports.ManageAccountComponent = ManageAccountComponent;
//# sourceMappingURL=manage-account.component.js.map