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
var InternDetailComponent = (function () {
    function InternDetailComponent(messageService, internService, router) {
        this.messageService = messageService;
        this.internService = internService;
        this.router = router;
    }
    InternDetailComponent.prototype.ngOnInit = function () {
    };
    InternDetailComponent.prototype.handleError = function (error) {
        this.messageService.error(error);
    };
    InternDetailComponent = __decorate([
        core_1.Component({
            templateUrl: '/app/admin/intern-detail.component.html',
            styles: [""],
            directives: [],
            providers: []
        }), 
        __metadata('design:paramtypes', [message_service_1.MessageService, intern_service_1.InternService, router_1.Router])
    ], InternDetailComponent);
    return InternDetailComponent;
}());
exports.InternDetailComponent = InternDetailComponent;
//# sourceMappingURL=intern-detail.component.js.map