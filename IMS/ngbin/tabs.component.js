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
var tabtitle_component_1 = require('./tabtitle.component');
var tabcontent_component_1 = require('./tabcontent.component');
var Tabs = (function () {
    function Tabs() {
        this.tabChanged = new core_1.EventEmitter();
    }
    Tabs.prototype.select = function (index) {
        var contents = this.tabContents.toArray();
        contents[this.active].isActive = false;
        this.active = index;
        contents[this.active].isActive = true;
        this.tabChanged.emit(index);
    };
    Tabs.prototype.ngAfterViewInit = function () { };
    Tabs.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.tabTitles.map(function (t) { return t.tabSelected; }).forEach(function (t, i) {
            t.subscribe(function (_) { _this.select(i); });
        });
        this.active = 0;
        this.select(0);
    };
    __decorate([
        core_1.Output('changed'), 
        __metadata('design:type', core_1.EventEmitter)
    ], Tabs.prototype, "tabChanged", void 0);
    __decorate([
        core_1.ContentChildren(tabtitle_component_1.TabTitle), 
        __metadata('design:type', core_1.QueryList)
    ], Tabs.prototype, "tabTitles", void 0);
    __decorate([
        core_1.ContentChildren(tabcontent_component_1.TabContent), 
        __metadata('design:type', core_1.QueryList)
    ], Tabs.prototype, "tabContents", void 0);
    Tabs = __decorate([
        core_1.Component({
            selector: "jay-tabs",
            templateUrl: 'agview/tabs.tp.html',
            directives: [tabtitle_component_1.TabTitle, tabcontent_component_1.TabContent]
        }), 
        __metadata('design:paramtypes', [])
    ], Tabs);
    return Tabs;
}());
exports.Tabs = Tabs;
//# sourceMappingURL=tabs.component.js.map