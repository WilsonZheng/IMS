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
var user_information_service_1 = require('../shared/user-information.service');
var InternMainComponent = (function () {
    function InternMainComponent(router, route, userInformationService) {
        this.router = router;
        this.route = route;
        this.userInformationService = userInformationService;
        this.title = ' ';
    }
    InternMainComponent.prototype.ngOnInit = function () {
        var _this = this;
        //Add internId as part of global queryParams.
        this.userInformationService.fetchUser().then(function (user) {
            _this.internId = user.Id;
            _this.router.navigate([], { relativeTo: _this.route, queryParams: { internId: user.Id } });
        });
        this.menuItems = [
            //{
            //    label: 'Dashboard',
            //    command: (event) => {
            //        this.router.navigate(['.'], { queryParams: {}, relativeTo: this.route }); this.title = 'Dashboard';
            //    }
            //},
            {
                label: 'Task',
                items: [
                    {
                        label: "Report", command: function (event) {
                            _this.router.navigate(['./task/report'], {
                                queryParams: { internId: _this.internId },
                                relativeTo: _this.route
                            });
                            _this.title = "Task > Report";
                        }
                    }
                ]
            }
        ];
    };
    InternMainComponent = __decorate([
        core_1.Component({
            templateUrl: '/app/main/intern-main.component.html',
            styles: ["\n            .ims-body-container{\n                margin-top:4px;\n            }\n            .ims-body-container .panel-body{\n                padding:2px;\n            }\n    "],
            directives: [router_1.ROUTER_DIRECTIVES, primeng_1.Menubar],
            providers: [user_information_service_1.UserInformationService]
        }), 
        __metadata('design:paramtypes', [router_1.Router, router_1.ActivatedRoute, user_information_service_1.UserInformationService])
    ], InternMainComponent);
    return InternMainComponent;
}());
exports.InternMainComponent = InternMainComponent;
//# sourceMappingURL=intern-main.component.js.map