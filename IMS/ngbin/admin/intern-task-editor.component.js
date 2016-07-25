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
var primeng_1 = require('primeng/primeng');
var intern_service_1 = require('./intern.service');
var task_to_do_1 = require('./task-to-do');
var InternTaskEditorComponent = (function () {
    function InternTaskEditorComponent(internService) {
        this.internService = internService;
        this.created = new core_1.EventEmitter();
        this.updated = new core_1.EventEmitter();
        this.canceled = new core_1.EventEmitter();
        this.error = new core_1.EventEmitter();
    }
    Object.defineProperty(InternTaskEditorComponent.prototype, "mode", {
        get: function () {
            return this.isCreateMode ? 'New' : 'Update';
        },
        enumerable: true,
        configurable: true
    });
    InternTaskEditorComponent.prototype.ngOnInit = function () {
        if (this.isCreateMode) {
            this.task = new task_to_do_1.TaskToDo();
        }
    };
    InternTaskEditorComponent.prototype.save = function () {
        if (!this.isCreateMode) {
            this.update();
        }
        else {
            this.create();
        }
    };
    InternTaskEditorComponent.prototype.cancel = function () {
        this.canceled.emit(null);
    };
    InternTaskEditorComponent.prototype.update = function () {
        var _this = this;
        this.internService.updateTask(this.task)
            .then(function () {
            _this.updated.emit(_this.task);
        })
            .catch(function (error) {
            _this.handleError(error);
        });
    };
    InternTaskEditorComponent.prototype.create = function () {
        var _this = this;
        this.internService.createTask(this.task)
            .then(function (task) {
            _this.created.emit(task);
        })
            .catch(function (error) {
            _this.handleError(error);
        });
    };
    InternTaskEditorComponent.prototype.handleError = function (msg) {
        this.error.emit(msg);
    };
    __decorate([
        core_1.Input("task"), 
        __metadata('design:type', task_to_do_1.TaskToDo)
    ], InternTaskEditorComponent.prototype, "task", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], InternTaskEditorComponent.prototype, "isCreateMode", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], InternTaskEditorComponent.prototype, "created", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], InternTaskEditorComponent.prototype, "updated", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], InternTaskEditorComponent.prototype, "canceled", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], InternTaskEditorComponent.prototype, "error", void 0);
    InternTaskEditorComponent = __decorate([
        core_1.Component({
            selector: 'admin-task-editor',
            templateUrl: '/app/admin/intern-task-editor.component.html',
            styles: ["\n        textarea[name='Description']{\n            height:8em;\n        }\n       \n      \n"],
            directives: [primeng_1.Button, primeng_1.Editor, primeng_1.Header]
        }), 
        __metadata('design:paramtypes', [intern_service_1.InternService])
    ], InternTaskEditorComponent);
    return InternTaskEditorComponent;
}());
exports.InternTaskEditorComponent = InternTaskEditorComponent;
//# sourceMappingURL=intern-task-editor.component.js.map