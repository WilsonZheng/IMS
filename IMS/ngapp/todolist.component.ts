import {Component, Input, Output, EventEmitter} from '@angular/core';
@Component({
    selector: "todo-list",
    templateUrl: 'agview/todolist.tp.html',
    styles: [
        "ul li{list-style:none;} .completed{text-decoration:line-through;}"
    ]
}) 
export class TodoList {
    @Input() todos: Todo[];
    @Output("toggle") toggleEvent = new EventEmitter<Todo>();
    toggle(index: number) {
        let todo = this.todos[index];
        this.toggleEvent.emit(todo);
    }
}
export interface Todo {
    completed: boolean;
    label: string;
}