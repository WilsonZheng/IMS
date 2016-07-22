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
var primeng_1 = require('primeng/primeng');
var message_service_1 = require('../shared/message.service');
var InternListComponent = (function () {
    function InternListComponent(messageService) {
        this.messageService = messageService;
    }
    InternListComponent.prototype.ngOnInit = function () {
    };
    InternListComponent = __decorate([
        core_1.Component({
            templateUrl: '/app/admin/intern-list.component.html',
            styles: [""],
            directives: [primeng_1.DataTable, primeng_1.Column, primeng_1.Button, primeng_1.Header, primeng_1.Menu,
                primeng_1.Tooltip, primeng_1.DataList],
            providers: []
        }), 
        __metadata('design:paramtypes', [message_service_1.MessageService])
    ], InternListComponent);
    return InternListComponent;
}());
exports.InternListComponent = InternListComponent;
//# sourceMappingURL=intern-list.component.js.map