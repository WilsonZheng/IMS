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
var textinput_component_1 = require('./textinput.component');
var todolist_component_1 = require('./todolist.component');
var fancybutton_component_1 = require('./fancybutton.component');
var panel_component_1 = require('./panel.component');
var multi_component_1 = require('./multi.component');
var tabs_component_1 = require('./tabs.component');
var tabtitle_component_1 = require('./tabtitle.component');
var tabcontent_component_1 = require('./tabcontent.component');
var AppComponent1 = (function () {
    function AppComponent1() {
        this.todos = [{
                label: "Buy Milk", completed: false
            }, {
                label: "Save the world", completed: false
            }];
        this.name = "Jhon";
    }
    AppComponent1.prototype.addTodo = function (label) {
        this.todos.push({ label: label, completed: false });
    };
    AppComponent1.prototype.removeTodo = function () { };
    AppComponent1.prototype.toggleCompletion = function (todo) {
        todo.completed = !todo.completed;
    };
    AppComponent1 = __decorate([
        core_1.Component({
            selector: "app",
            templateUrl: "agview/todo.html",
            encapsulation: core_1.ViewEncapsulation.Emulated,
            directives: [textinput_component_1.InputBox, todolist_component_1.TodoList, fancybutton_component_1.FancyButton, panel_component_1.Panel]
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent1);
    return AppComponent1;
}());
var AppComponent2 = (function () {
    function AppComponent2() {
    }
    AppComponent2 = __decorate([
        core_1.Component({
            selector: "app",
            template: "<user-panel><user-rating></user-rating></user-panel>",
            directives: [multi_component_1.UserPanel, multi_component_1.UserRating]
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent2);
    return AppComponent2;
}());
var AppComponent = (function () {
    function AppComponent() {
    }
    AppComponent.prototype.tabChanged = function (index) {
    };
    AppComponent.prototype.ngOnInit = function () {
        console.log("Init");
    };
    AppComponent.prototype.ngOnChanges = function (changes) {
    };
    AppComponent.prototype.ngAfterContentInit = function () {
        console.log("After content Init");
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: "app",
            templateUrl: "agview/app.tabs.html",
            directives: [tabs_component_1.Tabs, tabtitle_component_1.TabTitle, tabcontent_component_1.TabContent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.js.map