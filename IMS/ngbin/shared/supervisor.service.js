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
var SupervisorService = (function () {
    function SupervisorService(http) {
        this.http = http;
        this.headers = new http_1.Headers({
            'Content-Type': 'application/json'
        });
    }
    SupervisorService.prototype.releaseLock = function (supervisorId) {
        return this.http.post("/Supervisor/releaseLock", JSON.stringify({ supervisorId: supervisorId }), { headers: this.headers }).toPromise()
            .then(function (response) {
            var result = response.json();
            if (result.Error) {
                return Promise.reject(result.Error);
            }
            else {
                return;
            }
        }).catch(function (error) {
            return Promise.reject(error);
        });
    };
    SupervisorService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], SupervisorService);
    return SupervisorService;
}());
exports.SupervisorService = SupervisorService;
//# sourceMappingURL=supervisor.service.js.map