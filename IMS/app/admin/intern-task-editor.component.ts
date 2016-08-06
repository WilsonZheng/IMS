//Description: the Editor to create, update a task with.

import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Button, Editor, Header } from 'primeng/primeng';

import { InternService } from '../shared/intern.service';
import { RestResult } from '../shared/rest-result';
import { TaskToDo } from '../shared/task-to-do';

@Component({
    selector: 'admin-task-editor',
    templateUrl: '/app/admin/intern-task-editor.component.html',
    styles: [`
        textarea[name='Description']{
            height:8em;
        }
       
      
`],
    directives: [Button, Editor, Header]
})
export class InternTaskEditorComponent implements OnInit {
    @Input("task") task: TaskToDo;
    @Input() isCreateMode: boolean;
    @Output() created = new EventEmitter<TaskToDo>();
    @Output() updated = new EventEmitter<TaskToDo>();
    @Output() canceled = new EventEmitter<void>();
    @Output() error = new EventEmitter<any>();

    private get mode(): string {
        return this.isCreateMode ? 'New' : 'Update';
    }
    
    constructor(private internService: InternService) {
        
    }
    ngOnInit() {
        if (this.isCreateMode) {
            this.task = new TaskToDo();
        }
    }

    save() {
        if (!this.isCreateMode) {
            this.update();
        }
        else {
            this.create();
        }
    }

    cancel() {
        this.canceled.emit(null);
    }

    private update() {
        this.internService.updateTask(this.task)
            .then(() => {
                this.updated.emit(this.task);
            })
            .catch(error => {
                this.handleError(error);
            });
    }

    private create() {
        this.internService.createTask(this.task)
            .then((task) => {
                this.created.emit(task);
            })
            .catch(error => {
                this.handleError(error);
            });
    }

    private handleError(msg: string) {
        this.error.emit(msg);
    }
}