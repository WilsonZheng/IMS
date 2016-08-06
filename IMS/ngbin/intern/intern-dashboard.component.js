//Description: Dashboard for a signed in intern.
//Detail Not implemented.
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
var InternDashboardComponent = (function () {
    function InternDashboardComponent(router) {
        this.router = router;
    }
    InternDashboardComponent.prototype.ngOnInit = function () {
    };
    InternDashboardComponent = __decorate([
        core_1.Component({
            templateUrl: '/app/intern/intern-dashboard.component.html',
            styles: ["\n            .ims-body-container{\n                margin-top:4px;\n            }\n            .ims-body-container .panel-body{\n                padding:2px;\n            }\n    "],
            directives: [],
            providers: []
        }), 
        __metadata('design:paramtypes', [router_1.Router])
    ], InternDashboardComponent);
    return InternDashboardComponent;
}());
exports.InternDashboardComponent = InternDashboardComponent;
//# sourceMappingURL=intern-dashboard.component.js.map