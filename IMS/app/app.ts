import {Component, ViewEncapsulation,OnChanges,OnInit,AfterContentInit} from '@angular/core';
import {InputBox} from './textinput.component';
import {TodoList, Todo} from './todolist.component';
import {FancyButton} from './fancybutton.component';
import {Panel} from './panel.component';
import {UserPanel, UserRating} from './multi.component';
import {Tabs} from './tabs.component';
import {TabTitle} from './tabtitle.component';
import {TabContent} from './tabcontent.component';

@Component({ 
    selector: "app",
    templateUrl: "agview/todo.html",
    encapsulation: ViewEncapsulation.Emulated,
    directives: [InputBox, TodoList, FancyButton,Panel]
 })
class AppComponent1 {
todos: Todo[] = [{
label: "Buy Milk", completed: false
}, {
label: "Save the world", completed: false
}];
name: string = "Jhon";
addTodo(label) {
    this.todos.push({ label: label, completed:false });
}
removeTodo() { }
toggleCompletion(todo: Todo) {
    todo.completed =!todo.completed;
}
}
@Component({
    selector: "app",
    template: "<user-panel><user-rating></user-rating></user-panel>",
    directives: [UserPanel, UserRating]
})
class AppComponent2{ }


@Component({
    selector: "app",
    templateUrl: "agview/app.tabs.html",
    directives: [Tabs, TabTitle, TabContent]
})
export class AppComponent implements OnChanges, OnInit, AfterContentInit {
    tabChanged(index: number){
        
    }

    
    ngOnInit() {
        console.log("Init");
    }

    ngOnChanges(changes) {

        

    }

    ngAfterContentInit() {
        console.log("After content Init");
    }
}