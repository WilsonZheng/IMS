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
var primeng_1 = require('primeng/primeng');
var AdminMainComponent = (function () {
    function AdminMainComponent(router) {
        this.router = router;
        this.titles = ["Manage Notice", "Manage Intern"];
        this.titleIndex = 0;
    }
    AdminMainComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.menuItems = [
            {
                label: this.titles[0],
                command: function (event) {
                    _this.router.navigate(['/admin']);
                    _this.titleIndex = 0;
                }
            },
            {
                label: this.titles[1],
                command: function (event) {
                    _this.router.navigate(['/admin/intern']);
                    _this.titleIndex = 1;
                }
            }
        ];
    };
    AdminMainComponent = __decorate([
        core_1.Component({
            templateUrl: '/app/main/admin-main.component.html',
            styles: ["\n            .ims-body-container{\n                margin-top:4px;\n            }\n            .ims-body-container .panel-body{\n                padding:2px;\n            }\n            .panel-title{\n                font-size:1em;\n                font-weight:700;\n            }\n    "],
            directives: [router_1.ROUTER_DIRECTIVES, primeng_1.Menubar],
            providers: []
        }), 
        __metadata('design:paramtypes', [router_1.Router])
    ], AdminMainComponent);
    return AdminMainComponent;
}());
exports.AdminMainComponent = AdminMainComponent;
//# sourceMappingURL=admin-main.component.js.map