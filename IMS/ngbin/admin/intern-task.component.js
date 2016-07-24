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
var intern_service_1 = require('./intern.service');
var global_constant_1 = require('../shared/global-constant');
var primeng_1 = require('primeng/primeng');
var InternTaskComponent = (function () {
    function InternTaskComponent(messageService, internService, router) {
        this.messageService = messageService;
        this.internService = internService;
        this.router = router;
        this.internId = global_constant_1.GlobalConstant.NUMBER_NOTHING;
        this.tasks = [];
    }
    Object.defineProperty(InternTaskComponent.prototype, "isValid", {
        get: function () {
            return this.internId != global_constant_1.GlobalConstant.NUMBER_NOTHING;
        },
        enumerable: true,
        configurable: true
    });
    InternTaskComponent.prototype.ngOnInit = function () {
        var _this = this;
        //fetch all available tasks with its participants information.
        this.internService.getTasks().then(function (tasks) { return _this.tasks = tasks; }).catch(function (error) { return _this.handleError(error); });
        //when selected intern changes, if valid, load a new list of the comments.
        this.internIdSub = this.router.routerState.queryParams
            .subscribe(function (params) {
            _this.queryParams = params || {};
            _this.internId = (params['internId'] || global_constant_1.GlobalConstant.NUMBER_NOTHING);
        });
    };
    InternTaskComponent.prototype.ngOnDestroy = function () {
        this.internIdSub.unsubscribe();
    };
    InternTaskComponent.prototype.handleError = function (error) {
        this.messageService.error(error);
    };
    InternTaskComponent = __decorate([
        core_1.Component({
            templateUrl: '/app/admin/intern-task.component.html',
            styles: ["\n        .ims-body-container{\n            margin-bottom:0px;\n        }\n\n        .panel-heading{\n                position:relative;\n        }\n\n        .ims-control-container{\n            position:absolute;\n            right:4px;\n            top:4px;\n        }\n\n"],
            directives: [primeng_1.DataTable, primeng_1.Column, primeng_1.Header, primeng_1.Button],
            providers: []
        }), 
        __metadata('design:paramtypes', [message_service_1.MessageService, intern_service_1.InternService, router_1.Router])
    ], InternTaskComponent);
    return InternTaskComponent;
}());
exports.InternTaskComponent = InternTaskComponent;
//# sourceMappingURL=intern-task.component.js.map