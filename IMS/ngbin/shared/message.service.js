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
var subject_1 = require('rxjs/subject');
var MessageService = (function () {
    function MessageService() {
        ///Confirmation Modal area.
        this.confirmSource = new subject_1.Subject();
        this.result = this.confirmSource.asObservable();
        this.requestSource = new subject_1.Subject();
        this.request$ = this.requestSource.asObservable();
        //Inform or Alert Modal Area.
        this.requestInformSource = new subject_1.Subject();
        this.requestInform$ = this.requestInformSource.asObservable();
    }
    //Announce the user's choice. (0:No, 1:Yes)
    MessageService.prototype.announceResult = function (result) {
        this.confirmSource.next(result);
    };
    //Send request to open up Confirmation Dialog.
    MessageService.prototype.request = function () {
        this.requestSource.next(1);
    };
    //Send message to open up Information Dialog.
    MessageService.prototype.requestInform = function (message) {
        this.requestInformSource.next(message);
    };
    MessageService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], MessageService);
    return MessageService;
}());
exports.MessageService = MessageService;
//# sourceMappingURL=message.service.js.map