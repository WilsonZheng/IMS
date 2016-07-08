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
var overlay_1 = require('./overlay');
var Tooltip = (function () {
    function Tooltip(el, overlay) {
        this.el = el;
        this.overlay = overlay;
        this.overlay.attach(el.nativeElement);
    }
    Tooltip.prototype.onmouseenter = function () {
        this.overlay.open(this.el, this.saTooltip);
    };
    Tooltip.prototype.onmouseleave = function () {
        this.overlay.close();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Tooltip.prototype, "saTooltip", void 0);
    __decorate([
        core_1.HostListener("mouseenter"), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], Tooltip.prototype, "onmouseenter", null);
    __decorate([
        core_1.HostListener("mouseleave"), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], Tooltip.prototype, "onmouseleave", null);
    Tooltip = __decorate([
        core_1.Directive({
            selector: '[saTooltip]'
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, overlay_1.Overlay])
    ], Tooltip);
    return Tooltip;
}());
exports.Tooltip = Tooltip;
//# sourceMappingURL=tooltip.js.map