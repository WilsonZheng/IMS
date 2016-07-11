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
var http_1 = require('@angular/http');
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
require('rxjs/add/operator/toPromise');
var template_service_1 = require('./shared/template.service');
var TemplateComponent = (function () {
    function TemplateComponent(templateService, http) {
        this.templateService = templateService;
        this.http = http;
        this.templateService = templateService;
    }
    TemplateComponent.prototype.ngOnInit = function () {
        // this.templateService.getTemplates()            
        //.map((r: Response) => r.json())
        //     .subscribe((res: Template[]) => {
        //         console.log(res[0].Description);
        //     });
        var tt = this.http.get("/TemplateManage/Templates1").toPromise()
            .then(function (response) { return response.json(); }).catch(function (error) {
            return Promise.reject("Something wrong happened");
        });
        tt.then(function (kk) { console.log("This is the length of this array:" + kk.length); }).catch(function (reason) {
            console.log("return from error" + reason);
        });
    };
    TemplateComponent = __decorate([
        core_1.Component({
            selector: 'inv-template',
            templateUrl: '/app/invitation/template.component.html'
        }), 
        __metadata('design:paramtypes', [template_service_1.TemplateService, http_1.Http])
    ], TemplateComponent);
    return TemplateComponent;
}());
exports.TemplateComponent = TemplateComponent;
//# sourceMappingURL=template.component.js.map