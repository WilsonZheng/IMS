//Description: Display the list of supervisor comments, and Create, Delete, Update comment
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
require('rxjs/add/operator/map');
var primeng_1 = require('primeng/primeng');
var message_service_1 = require('../shared/message.service');
var intern_service_1 = require('../shared/intern.service');
var user_information_service_1 = require('../shared/user-information.service');
var supervising_comment_1 = require('../shared/supervising-comment');
var user_1 = require('../shared/user');
var global_constant_1 = require('../shared/global-constant');
var bracket_date_transform_pipe_1 = require('../shared/bracket-date-transform.pipe');
var InternCommentComponent = (function () {
    function InternCommentComponent(messageService, internService, router, route, userInformationService) {
        this.messageService = messageService;
        this.internService = internService;
        this.router = router;
        this.route = route;
        this.userInformationService = userInformationService;
        this.internId = global_constant_1.GlobalConstant.NUMBER_NOTHING;
        this.authUser = new user_1.User();
        this.supervisingComments = [];
        this.commentToBeEditted = new supervising_comment_1.SupervisingComment();
        this.handleEdit = false;
    }
    Object.defineProperty(InternCommentComponent.prototype, "isValid", {
        //hint for whether or not to display view.
        get: function () {
            return this.internId != global_constant_1.GlobalConstant.NUMBER_NOTHING;
        },
        enumerable: true,
        configurable: true
    });
    InternCommentComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userInformationService.fetchUser().then(function (user) { return _this.authUser = user; }).catch(function (error) { return _this.handleError(error); });
        this.headerRows = [
            {
                columns: [
                    { header: "Search", filter: true, field: "Comment", filterMatchMode: "contains" }
                ]
            }
        ];
        //When selected intern changes, reset commentInput to be in create comment mode.
        this.resetCommentInputSub = this.router.routerState.queryParams.subscribe(function (params) {
            var internId = (params['internId'] || global_constant_1.GlobalConstant.NUMBER_NOTHING);
            if (internId != _this.internId) {
                _this.resetCommentInput();
            }
        });
        //when selected intern changes, if valid, load a new list of the comments.
        this.internIdSub = this.router.routerState.queryParams
            .subscribe(function (params) {
            _this.queryParams = params || {};
            var internId = (params['internId'] || global_constant_1.GlobalConstant.NUMBER_NOTHING);
            //only when getting a new internId in queryParams, fetch fresh supervising comments.
            //otherwise, do nothing.
            if (internId != global_constant_1.GlobalConstant.NUMBER_NOTHING && _this.internId != internId) {
                _this.supervisingComments.splice(0, _this.supervisingComments.length);
                _this.internService.getSupervisingComments(internId)
                    .then(function (comments) { return _this.supervisingComments = comments; })
                    .catch(function (error) { return _this.handleError(error); });
            }
            //update internId
            _this.internId = internId;
        });
    };
    InternCommentComponent.prototype.ngOnDestroy = function () {
        this.internIdSub.unsubscribe();
        this.resetCommentInputSub.unsubscribe();
    };
    InternCommentComponent.prototype.handleError = function (error) {
        this.messageService.error(error);
    };
    InternCommentComponent.prototype.edit = function (comment) {
        this.commentSelected = comment;
        var commentToBeEditted = new supervising_comment_1.SupervisingComment();
        commentToBeEditted.Id = comment.Id;
        commentToBeEditted.Comment = comment.Comment;
        this.commentToBeEditted = commentToBeEditted;
        this.handleEdit = true;
    };
    InternCommentComponent.prototype.cancel = function () {
        this.resetCommentInput();
    };
    //The view for manipulating comment must be in the create mode if no comment is not selected now.
    InternCommentComponent.prototype.resetCommentInput = function () {
        this.commentToBeEditted = new supervising_comment_1.SupervisingComment();
        this.handleEdit = false;
    };
    InternCommentComponent.prototype.create = function () {
        var _this = this;
        //When creating a new one, set the internId mannually.
        this.commentToBeEditted.InternshipId = this.internId;
        this.internService.createComment(this.commentToBeEditted).then(function (comment) {
            _this.supervisingComments.splice(0, 0, comment);
            _this.resetCommentInput();
        })
            .catch(function (error) { return _this.handleError(error); });
    };
    InternCommentComponent.prototype.delete = function (comment) {
        var _this = this;
        this.messageService.request();
        this.confirmSubscription = this.messageService.result.subscribe(function (result) {
            _this.confirmSubscription.unsubscribe();
            if (result == 1) {
                _this.internService.deleteComment(comment).then(function () {
                    for (var i = 0; i < _this.supervisingComments.length; i++) {
                        if (_this.supervisingComments[i].Id == comment.Id) {
                            _this.supervisingComments.splice(i, 1);
                            _this.resetCommentInput();
                            break;
                        }
                    }
                }).catch(function (error) { return _this.handleError(error); });
            }
        });
    };
    InternCommentComponent.prototype.update = function () {
        var _this = this;
        this.internService.updateComment(this.commentToBeEditted).then(function () {
            _this.commentSelected.Comment = _this.commentToBeEditted.Comment;
            _this.resetCommentInput();
        }).catch(function (error) { return _this.handleError(error); });
    };
    InternCommentComponent = __decorate([
        core_1.Component({
            templateUrl: '/app/admin/intern-comment.component.html',
            styles: ["\n\n.ims-body-container{\n    margin-bottom:0px;\n}\n\n.ims-comment-container{\n    padding:0px;\n    margin:2px 0px;\n}\n\n.ims-comment-container .ims-comment-input{\n     height:8em;\n }\n\n.ims-comment-container .ims-comment-control{\n    padding-top:2px;\n}\n\n.ims-content-display-area{\n    white-space:pre-line;\n}\n\n.ims-comment-date{\n    font-style:italic;\n    font-weight:700;\n}\n\n\n    "],
            directives: [primeng_1.DataTable, primeng_1.Column, primeng_1.Header, primeng_1.Button, primeng_1.Editor],
            providers: [user_information_service_1.UserInformationService],
            pipes: [bracket_date_transform_pipe_1.BracketDateTransformPipe]
        }), 
        __metadata('design:paramtypes', [message_service_1.MessageService, intern_service_1.InternService, router_1.Router, router_1.ActivatedRoute, user_information_service_1.UserInformationService])
    ], InternCommentComponent);
    return InternCommentComponent;
}());
exports.InternCommentComponent = InternCommentComponent;
//# sourceMappingURL=intern-comment.component.js.map