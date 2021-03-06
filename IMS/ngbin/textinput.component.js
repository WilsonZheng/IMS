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
var InputBox = (function () {
    function InputBox() {
        this.inputText = new core_1.EventEmitter();
    }
    InputBox.prototype.emitText = function (text) {
        this.inputText.emit(text);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], InputBox.prototype, "inputPlaceholder", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], InputBox.prototype, "buttonLabel", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], InputBox.prototype, "inputText", void 0);
    InputBox = __decorate([
        core_1.Component({
            selector: "input-box",
            templateUrl: 'agview/textinput.tp.html'
        }), 
        __metadata('design:paramtypes', [])
    ], InputBox);
    return InputBox;
}());
exports.InputBox = InputBox;
//# sourceMappingURL=textinput.component.js.map