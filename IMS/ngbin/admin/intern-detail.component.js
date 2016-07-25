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
var message_service_1 = require('../shared/message.service');
var intern_service_1 = require('./intern.service');
var adjust_expiry_request_1 = require('./adjust-expiry-request');
var global_constant_1 = require('../shared/global-constant');
var bracket_date_transform_pipe_1 = require('../shared/bracket-date-transform.pipe');
var primeng_1 = require('primeng/primeng');
var InternDetailComponent = (function () {
    function InternDetailComponent(messageService, internService, router, route) {
        this.messageService = messageService;
        this.internService = internService;
        this.router = router;
        this.route = route;
        //adjustment for internship expiry date.
        this.adjustExpirtyRequest = new adjust_expiry_request_1.AdjustExpiryRequest();
        this.internId = global_constant_1.GlobalConstant.NUMBER_NOTHING;
    }
    Object.defineProperty(InternDetailComponent.prototype, "isValid", {
        get: function () {
            return this.internId != global_constant_1.GlobalConstant.NUMBER_NOTHING;
        },
        enumerable: true,
        configurable: true
    });
    InternDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.internIdSub = this.router.routerState.queryParams
            .subscribe(function (params) {
            _this.queryParams = params || {};
            var oldId = _this.internId;
            _this.internId = (params['internId'] || global_constant_1.GlobalConstant.NUMBER_NOTHING);
            if (_this.internId != global_constant_1.GlobalConstant.NUMBER_NOTHING && oldId != _this.internId) {
                _this.load();
            }
        });
    };
    InternDetailComponent.prototype.ngOnDestroy = function () {
        this.internIdSub.unsubscribe();
    };
    InternDetailComponent.prototype.load = function () {
        var _this = this;
        this.internService.getDetails(this.internId)
            .then(function (intern) { return _this.intern = intern; })
            .catch(function (error) { return _this.handleError(error); });
    };
    InternDetailComponent.prototype.handleError = function (error) {
        this.messageService.error(error);
    };
    InternDetailComponent.prototype.adjustExpiry = function (isExtension) {
        var _this = this;
        this.adjustExpirtyRequest.InternId = this.internId;
        this.adjustExpirtyRequest.IsExtension = isExtension;
        this.internService.adjustExpiry(this.adjustExpirtyRequest)
            .then(function (expiry) { return _this.intern.ExpiryAt = expiry; })
            .catch(function (error) { return _this.handleError(error); });
    };
    InternDetailComponent = __decorate([
        core_1.Component({
            templateUrl: '/app/admin/intern-detail.component.html',
            styles: ["\n        .ims-body-container{\n            margin-bottom:0px;\n        }\n\n        .panel-heading{\n                position:relative;\n        }\n\n        .panel-body{\n            padding:5px;\n        }\n\n        .ims-detail-name{\n            font-size : 1.5em;\n            color: #f09413;\n        }\n        \n        .ims-title-1st{\n            font-size: 1.2em;\n            font-weight:700;\n        }\n\n        .ims-adjust-expiry{\n            line-height:15px;\n            height:40px;\n        }\n\n"],
            directives: [primeng_1.DataTable, primeng_1.Column, primeng_1.Header, primeng_1.Button, primeng_1.Spinner],
            providers: [],
            pipes: [bracket_date_transform_pipe_1.BracketDateTransformPipe]
        }), 
        __metadata('design:paramtypes', [message_service_1.MessageService, intern_service_1.InternService, router_1.Router, router_1.ActivatedRoute])
    ], InternDetailComponent);
    return InternDetailComponent;
}());
exports.InternDetailComponent = InternDetailComponent;
//# sourceMappingURL=intern-detail.component.js.map