import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { ROUTER_DIRECTIVES, Router, ActivatedRoute }    from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { MessageService } from '../shared/message.service';
import { RestResult } from '../shared/rest-result';
import { InternService } from '../shared/intern.service';
import { UserInformationService } from '../shared/user-information.service';
import { TaskToDo } from '../shared/task-to-do';
import { GlobalConstant } from '../shared/global-constant';
import { InternTaskEditorComponent } from './intern-task-editor.component';
import { ManageParticipantRequest } from '../shared/manage-participant-request';
import { ManageInternUpdateCode } from '../shared/manage-intern-update-code';
import { User } from '../shared/user';
import { Intern } from '../shared/intern';
import { TaskReportComponent } from '../shared/task-report.component';


import { Column, Button, DataList} from 'primeng/primeng';
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

        .row{
            margin:0px;
         }
        
        .ims-content-display-area{
            position:relative;
            border:1px solid #f1f0fa;
            margin: 4px 0px;
            padding: 4px 2px;
            border-radius:8px;

        }
       
        .ims-filter-container{
            padding: 4px 2px;

        }
        .ims-participant .imsselected{
            color: blue;
            font-size:1.2em;
        }

`],
    directives: [Column, Button, InternTaskEditorComponent, DataList, TaskReportComponent],
    providers: [UserInformationService]
})
export class InternTaskComponent implements OnInit {
    private searchKey: string = "";

    private get filteredTasks(): TaskToDo[] {
        let searchKey = this.searchKey;
        return this.tasks.filter(function (task) {
            if (!searchKey) return true;
            return (task.Description.includes(searchKey)
                || task.SupervisorName.includes(searchKey)
                || task.Title.includes(searchKey));
        });
    }
    
    private authUser: User = new User();

    private confirmSubscription: Subscription;
    private internIdSub: Subscription;
    private internId: number = GlobalConstant.NUMBER_NOTHING;
    private taskId: number = GlobalConstant.NUMBER_NOTHING;

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
        private route: ActivatedRoute,
        private userInformationService: UserInformationService) { }
    
    ngOnInit() {
        this.userInformationService.fetchUser().then((user) => this.authUser = user).catch((error) => this.handleError(error));
        
        //fetch all available tasks with its participants information.
        this.internService.getTasks().then((tasks) => this.tasks = tasks).catch((error) => this.handleError(error));
        
        //when selected intern changes, if valid, load a new list of the comments.
        this.internIdSub = this.router.routerState.queryParams
            .subscribe((params) => {
                this.queryParams = params || {};
                this.internId = (params['internId'] || GlobalConstant.NUMBER_NOTHING);
                this.taskId = (params['taskId'] || GlobalConstant.NUMBER_NOTHING);
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

    private cloneTask(task: TaskToDo) {
        this.messageService.request();
        this.confirmSubscription = this.messageService.result.subscribe((result) => {
            this.confirmSubscription.unsubscribe();
            if (result == 1) {
                let cloned: TaskToDo = new TaskToDo();
                cloned.Description = task.Description;
                cloned.Title = task.Title;
                this.internService.createTask(cloned)
                    .then((response) => {
                        this.tasks.splice(0, 0, response);
                    })
                    .catch((error) => this.handleError(error));
            }
        });
    }

    private editTask(task: TaskToDo) {
        this.taskSelected = task;
        this.isTaskEdit = true;
        this.handleTaskEditor = true;
        
    }

    private deleteTask(task: TaskToDo) {
        this.messageService.request();
        this.confirmSubscription = this.messageService.result.subscribe((result) => {
            this.confirmSubscription.unsubscribe();
            if (result == 1) {
                this.internService.deleteTask(task).then(() => {
                    for (let i = 0; i < this.tasks.length; i++) {
                        if (task.Id == this.tasks[i].Id) {
                            this.tasks.splice(i, 1);
                            return;
                        }
                    }
                }).catch((error) => this.handleError(error));
            }
        });
    }


    private closeTask(task: TaskToDo) {
        this.messageService.request();
        this.confirmSubscription = this.messageService.result.subscribe((result) => {
            this.confirmSubscription.unsubscribe();
            if (result == 1) {
                this.internService.closeTask(task).then(() => {
                    for (let i = 0; i < this.tasks.length; i++) {
                        if (task.Id == this.tasks[i].Id) {
                            this.tasks.splice(i, 1);
                            return;
                        }
                    }
                }).catch((error) => this.handleError(error));
            }
        });
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

    private removeParticipant(task: TaskToDo, participant: Intern) {
        this.messageService.request();
        this.confirmSubscription = this.messageService.result.subscribe((result) => {
            this.confirmSubscription.unsubscribe();
            if (result == 1) {
                let request = new ManageParticipantRequest();
                request.TaskId = task.Id;
                request.ParticipantId = participant.Id;
                request.IsJoining = false;
                this.internService.manageParticipant(request).then((participants) => {
                    task.Participants = participants;
                    //update version.
                    this.queryParams.internVersion = Date.now();
                    this.queryParams.updatecode = ManageInternUpdateCode.TASK;
                    this.queryParams.internId = participant.Id;
                    this.router.navigate([], {
                        queryParams: this.queryParams,
                        relativeTo: this.route
                    });

                }).catch((error) => this.handleError(error));
            }
        });
      
    }


    private participate(task: TaskToDo, isJoining: boolean) {
        this.messageService.request();
        this.confirmSubscription = this.messageService.result.subscribe((result) => {
            this.confirmSubscription.unsubscribe();
            if (result == 1) {
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
        });
    }

    
    
    
    private taskReport(task: TaskToDo, reporter: Intern) {
        let taskIdOrg = this.queryParams['taskId'] || GlobalConstant.NUMBER_NOTHING;
        let internIdOrg = this.queryParams['internId'] || GlobalConstant.NUMBER_NOTHING;
        if (taskIdOrg == task.Id && internIdOrg == reporter.Id) {
            this.clearParams();
        }
        else {
            this.queryParams['taskId'] = task.Id;
            this.queryParams['internId'] = reporter.Id;
            this.applyParams();
        }
    }

    private clearParams() {
        this.queryParams['taskId'] = GlobalConstant.NUMBER_NOTHING;
        this.queryParams['internId'] = GlobalConstant.NUMBER_NOTHING;
        this.applyParams();
    }

    private applyParams() {
        this.router.navigate([], { relativeTo: this.route, queryParams: this.queryParams });
    }
}