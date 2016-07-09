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
var message_comp_1 = require('./message.comp');
var mylogger_svc_1 = require('./mylogger.svc');
var AppComponent = (function () {
    function AppComponent() {
        this.Address = "2-way binding...";
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            template: "\n        <input type=\"text\" pInputText [(ngModel)]=\"Address\"/>\n        <p-editor [(ngModel)]=\"Address\" [style]=\"{'height':'320px'}\"></p-editor>\n        <p>\n            <my-message></my-message>\n        </p>\n    ",
            directives: [message_comp_1.MyMessage, primeng_1.InputText, primeng_1.Editor, primeng_1.Header],
            providers: [mylogger_svc_1.MyLogger]
        }),
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.js.map