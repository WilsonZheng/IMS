import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { ROUTER_DIRECTIVES, Router, ActivatedRoute }    from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { MessageService } from '../shared/message.service';
import { RestResult } from '../shared/rest-result';
import { InternService } from './intern.service';

import { TaskToDo } from './task-to-do';
import { GlobalConstant } from '../shared/global-constant';
import { InternTaskEditorComponent } from './intern-task-editor.component';
import { ManageParticipantRequest } from './manage-participant-request';
import { ManageInternUpdateCode } from './manage-intern-update-code';

import { DataTable, Column, Header, Button} from 'primeng/primeng';
@Component({
    templateUrl: '/app/admin/intern-task.component.html',
    styles: [`
        .ims-body-container{
            margin-bottom:0px;
        }

        .panel-heading{
                position:relative;
        }

        .ims-control-container{
            position:absolute;
            right:4px;
            top:4px;
        }

         .ims-task-control{
            text-align:left;
            height:14px;
            line-height:14px;
        }

        #ims-description{
            white-space:pre-line;
        }

        .ims-inline-title{
             text-decoration: underline;
            font-weight:600;
        }

        .panel-body{
            padding:1px;
        }

`],
    directives: [DataTable, Column, Header, Button, InternTaskEditorComponent],
    providers: []
})
export class InternTaskComponent implements OnInit {

    private internIdSub: Subscription;
    private internId: number = GlobalConstant.NUMBER_NOTHING;

    //global queryParams.
    private queryParams: any;

    private tasks: TaskToDo[] = [];
    private taskSelected: TaskToDo;

    private headerRows: any[];

    private handleTaskEditor: boolean = false;
    private isTaskEdit: boolean = false;


    private get isValid(): boolean {
        return this.internId != GlobalConstant.NUMBER_NOTHING;
    }
    
    constructor(private messageService: MessageService,
        private internService: InternService,
        private router: Router,
        private route: ActivatedRoute)
    { }
    ngOnInit() {

        this.headerRows = [
            {
                columns: [
                    { header: "Search", filter: true, field: "Title", filterMatchMode: "contains" }
                ]
            }
        ];

        //fetch all available tasks with its participants information.
        this.internService.getTasks().then((tasks) => this.tasks = tasks).catch((error) => this.handleError(error));
        
        //when selected intern changes, if valid, load a new list of the comments.
        this.internIdSub = this.router.routerState.queryParams
            .subscribe((params) => {
                this.queryParams = params || {};
                this.internId = (params['internId'] || GlobalConstant.NUMBER_NOTHING);
            });
    }

    ngOnDestroy() {
        this.internIdSub.unsubscribe();
    }

    private handleError(error: string) {
        this.messageService.error(error);
    }

    private createTask() {
        this.isTaskEdit = false;
        this.handleTaskEditor = true;
    }
     

    private editTask(task: TaskToDo) {
        this.taskSelected = task;
        this.isTaskEdit = true;
        this.handleTaskEditor = true;
        
    }

    private deleteTask(task: TaskToDo) {
        this.internService.deleteTask(task).then(() => {
            for (let i = 0; i < this.tasks.length; i++){
                if (task.Id == this.tasks[i].Id)
                {
                    this.tasks.splice(i, 1);
                    return;
                }
            }
        }).catch((error) => this.handleError(error));
    }
       

    private refreshTasks() {
        this.internService.getTasks()
            .then((tasks) => this.tasks = tasks)
            .catch((error) => this.handleError(error));
    }

    private taskJobCancelled() {
        this.handleTaskEditor = false;
    }

    private taskCreated(task: TaskToDo) {
        this.tasks.splice(0, 0, task);
        this.handleTaskEditor = false;
    }

    private taskUpdated(task: TaskToDo) {
        this.taskSelected.Title = task.Title;
        this.taskSelected.Description = task.Description;
        this.handleTaskEditor = false;
    }


    //Check whether the current intern is involved in a task with the passed in taskId.
    private contain(taskId: number): boolean {
        if (!this.isValid) return false;
        let contained: boolean = false;
        for (let i = 0; i < this.tasks.length; i++) {
            if (this.tasks[i].Id == taskId) {
                let participants = this.tasks[i].Participants;
                for (let j = 0; j < participants.length; j++)
                {
                    if (participants[j].Id == this.internId)
                    {
                        contained = true;
                        break;
                    }
                }
                break;
            }
        }
        return contained;
     }


    private participate(task: TaskToDo, isJoining: boolean) {
        let request = new ManageParticipantRequest();
        request.TaskId = task.Id;
        request.ParticipantId = this.internId;
        request.IsJoining = isJoining;
        this.internService.manageParticipant(request).then((participants) => {
            task.Participants = participants;
            
            //update version.
            this.queryParams.internVersion = Date.now();
            this.queryParams.updatecode = ManageInternUpdateCode.TASK;
            this.router.navigate([], {
                queryParams: this.queryParams,
                relativeTo: this.route
            });

        }).catch((error) => this.handleError(error));
    }
  
}