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
var InvitationService = (function () {
    function InvitationService(http) {
        this.http = http;
        this.headers = new http_1.Headers({
            'Content-Type': 'application/json'
        });
    }
    InvitationService.prototype.sendInvitation = function (batch) {
        return this.http.post("/Invitation/Send", JSON.stringify(batch), { headers: this.headers }).toPromise()
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
    InvitationService.prototype.getInvitations = function (noticeIds, recruitStatusCodes) {
        return this.http.post("/Invitation/Search", JSON.stringify({ NoticeIds: noticeIds || [], RecruitStatusCodes: recruitStatusCodes || [] }), { headers: this.headers }).toPromise()
            .then(function (response) {
            var result = response.json();
            if (result.Error) {
                return Promise.reject(result.Error);
            }
            else {
                return result.Data;
            }
        }).catch(function (error) {
            return Promise.reject(error);
        });
    };
    InvitationService.prototype.deleteInvitation = function (invitation) {
        return this.http.post("/Invitation/Delete", JSON.stringify(invitation), { headers: this.headers }).toPromise()
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
    InvitationService.prototype.resendInvitation = function (invitation) {
        return this.http.post("/Invitation/Resend", JSON.stringify(invitation), { headers: this.headers }).toPromise()
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
    InvitationService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], InvitationService);
    return InvitationService;
}());
exports.InvitationService = InvitationService;
//# sourceMappingURL=invitation.service.js.map