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
var mylogger_svc_1 = require('./mylogger.svc');
var MyMessage = (function () {
    function MyMessage(loger) {
        this.text = loger.name;
    }
    MyMessage = __decorate([
        core_1.Component({
            selector: 'my-message',
            template: "  Here is a message for you{{text}}.\n    "
        }),
        core_1.Injectable(), 
        __metadata('design:paramtypes', [mylogger_svc_1.MyLogger])
    ], MyMessage);
    return MyMessage;
}());
exports.MyMessage = MyMessage;
//# sourceMappingURL=message.comp.js.map