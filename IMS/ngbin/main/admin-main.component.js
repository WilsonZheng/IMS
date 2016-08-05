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
    function AdminMainComponent(router, route) {
        this.router = router;
        this.route = route;
        this.title = 'Manage Intern > Task';
    }
    AdminMainComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.menuItems = [
            //{
            //    label: 'Dashboard',
            //    command: (event) => {
            //        this.router.navigate(['.'], { queryParams: {}, relativeTo: this.route }); this.title = 'Dashboard';
            //    }
            //},
            {
                label: 'Manage Account',
                command: function (event) {
                    _this.router.navigate(['account'], { queryParams: {}, relativeTo: _this.route });
                    _this.title = 'Manage Account';
                }
            },
            {
                label: 'Manage Notice',
                command: function (event) {
                    _this.router.navigate(['notice/invitation'], { queryParams: {}, relativeTo: _this.route });
                    _this.title = 'Manage Notice';
                }
            },
            {
                label: 'Manage Intern',
                items: [
                    { label: "Detail", command: function (event) { _this.router.navigate(['./intern/Detail'], { relativeTo: _this.route }); _this.title = "Manage Intern > Detail"; } },
                    { label: "Supervisor", command: function (event) { _this.router.navigate(['./intern/Supervisor'], { relativeTo: _this.route }); _this.title = "Manage Intern > Supervisors"; } },
                    { label: "Task", command: function (event) { _this.router.navigate(['./intern/Task'], { relativeTo: _this.route }); _this.title = "Manage Intern > Task"; } },
                    { label: "Task History", command: function (event) { _this.router.navigate(['./intern/TaskHistory'], { relativeTo: _this.route }); _this.title = "Manage Intern > Task History"; } },
                    { label: "Comment", command: function (event) { _this.router.navigate(['./intern/Comment'], { relativeTo: _this.route }); _this.title = "Manage Intern > Comment"; } }
                ]
            }
        ];
    };
    AdminMainComponent = __decorate([
        core_1.Component({
            templateUrl: '/app/main/admin-main.component.html',
            styles: ["\n            .ims-body-container{\n                margin-top:4px;\n            }\n            .ims-body-container .panel-body{\n                padding:2px;\n            }\n    "],
            directives: [router_1.ROUTER_DIRECTIVES, primeng_1.Menubar],
            providers: []
        }), 
        __metadata('design:paramtypes', [router_1.Router, router_1.ActivatedRoute])
    ], AdminMainComponent);
    return AdminMainComponent;
}());
exports.AdminMainComponent = AdminMainComponent;
//# sourceMappingURL=admin-main.component.js.map