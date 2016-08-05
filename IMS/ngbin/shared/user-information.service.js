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
require('rxjs/add/operator/toPromise');
var user_1 = require('./user');
var UserInformationService = (function () {
    function UserInformationService(http) {
        this.http = http;
        this.headers = new http_1.Headers({
            'Content-Type': 'application/json'
        });
    }
    Object.defineProperty(UserInformationService.prototype, "User", {
        get: function () {
            return this.user;
        },
        enumerable: true,
        configurable: true
    });
    UserInformationService.prototype.fetchUser = function () {
        var _this = this;
        return this.http.post("/UserInfo/GetUser", JSON.stringify({}), { headers: this.headers }).toPromise()
            .then(function (response) {
            var result = response.json();
            if (result.Error) {
                return Promise.reject(result.Error);
            }
            else {
                var data = result.Data;
                var user = new user_1.User();
                user.Id = data.Id;
                user.Roles = data.Roles;
                user.UserName = data.UserName;
                _this.user = user;
                return user;
            }
        })
            .catch(function (error) {
            return Promise.reject(error);
        });
    };
    UserInformationService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], UserInformationService);
    return UserInformationService;
}());
exports.UserInformationService = UserInformationService;
//# sourceMappingURL=user-information.service.js.map