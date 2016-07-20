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
var http_1 = require('@angular/http');
var primeng_1 = require('primeng/primeng');
var message_service_1 = require('../shared/message.service');
var AppComponent = (function () {
    function AppComponent(messageService) {
        this.messageService = messageService;
        //Global Confirm modal
        this.confirmModal = false;
        //Global Message(Growl)
        this.msgs = [];
    }
    AppComponent.prototype.confirm = function (result) {
        this.confirmModal = false;
        this.messageService.announceResult(result);
    };
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscriptionConfirm =
            this.messageService.request$.subscribe(function (request) {
                _this.confirmModal = true;
            });
        this.subscriptionInform =
            this.messageService.requestInform$.subscribe(function (request) {
                _this.msgs.push({ severity: request.severity, summary: request.summary, detail: request.detail });
            });
    };
    AppComponent.prototype.ngOnDestroy = function () {
        this.subscriptionConfirm.unsubscribe();
        this.subscriptionInform.unsubscribe();
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'ims-app',
            templateUrl: '/app/main/app.component.html',
            directives: [primeng_1.Dialog, primeng_1.Footer, primeng_1.Header, primeng_1.Button, primeng_1.Growl, router_1.ROUTER_DIRECTIVES],
            providers: [http_1.HTTP_PROVIDERS, message_service_1.MessageService]
        }), 
        __metadata('design:paramtypes', [message_service_1.MessageService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map