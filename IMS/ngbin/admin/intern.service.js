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
var InternService = (function () {
    function InternService(http) {
        this.http = http;
        this.headers = new http_1.Headers({
            'Content-Type': 'application/json'
        });
    }
    InternService.prototype.getInterns = function () {
        return this.http.post("/Intern/getInterns", JSON.stringify({}), { headers: this.headers }).toPromise()
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
    InternService.prototype.getSupervisors = function () {
        return this.http.post("/Intern/getSupervisors", JSON.stringify({}), { headers: this.headers }).toPromise()
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
    InternService.prototype.getSupervisorsForIntern = function (internId) {
        return this.http.post("/Intern/getSupervisorsForIntern", JSON.stringify({ internId: internId }), { headers: this.headers }).toPromise()
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
    InternService.prototype.handleSupervising = function (model) {
        return this.http.post("/Intern/handleSupervising", JSON.stringify(model), { headers: this.headers }).toPromise()
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
    InternService.prototype.getSupervisingComments = function (internId) {
        return this.http.post("/Intern/getSupervisingComments", JSON.stringify({ internId: internId }), { headers: this.headers }).toPromise()
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
    InternService.prototype.createComment = function (comment) {
        return this.http.post("/Intern/createSupervisingComment", JSON.stringify(comment), { headers: this.headers }).toPromise()
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
    InternService.prototype.deleteComment = function (comment) {
        return this.http.post("/Intern/deleteSupervisingComment", JSON.stringify(comment), { headers: this.headers }).toPromise()
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
    InternService.prototype.updateComment = function (comment) {
        return this.http.post("/Intern/updateSupervisingComment", JSON.stringify(comment), { headers: this.headers }).toPromise()
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
    /////////////////////////////Manage Task & Participant//////////////////////////////////////////////////////
    InternService.prototype.getTasks = function () {
        return this.http.post("/Intern/getTasks", JSON.stringify({}), { headers: this.headers }).toPromise()
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
    InternService.prototype.createTask = function (task) {
        return this.http.post("/Intern/createTask", JSON.stringify(task), { headers: this.headers }).toPromise()
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
    InternService.prototype.deleteTask = function (task) {
        return this.http.post("/Intern/deleteTask", JSON.stringify(task), { headers: this.headers }).toPromise()
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
    InternService.prototype.updateTask = function (task) {
        return this.http.post("/Intern/updateTask", JSON.stringify(task), { headers: this.headers }).toPromise()
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
    InternService.prototype.manageParticipant = function (request) {
        return this.http.post("/Intern/manageParticipant", JSON.stringify(request), { headers: this.headers }).toPromise()
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
    InternService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], InternService);
    return InternService;
}());
exports.InternService = InternService;
//# sourceMappingURL=intern.service.js.map