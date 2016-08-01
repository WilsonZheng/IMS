import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { ROUTER_DIRECTIVES, Router, ActivatedRoute }    from '@angular/router';
import { DataTable, Column, Header, Button, Spinner } from 'primeng/primeng';
import { Subscription } from 'rxjs/Subscription';
import { MessageService } from '../shared/message.service';
import { RestResult } from '../shared/rest-result';
import { InternService } from '../shared/intern.service';
import { Intern } from '../shared/intern';
import { TaskToDo } from '../shared/task-to-do';
import { GlobalConstant } from '../shared/global-constant';
import { User } from '../shared/user';
import { UserInformationService } from '../shared/user-information.service';
@Component({
    templateUrl: '/app/intern/manage-task.component.html',
    styles: [`
                .panel-heading{
                position:relative;
                }

                .ims-control-container{
                position:absolute;
                right:4px;
                top:4px;
                }

                .panel-body{
                padding:1px;
                }

                .ims-body-container.panel{
                margin-bottom:2px;
                }
               
    `],
    directives: [DataTable, Column, Button, Header, ROUTER_DIRECTIVES, Spinner],
    providers: [InternService, UserInformationService]
})
export class ManageTaskComponent implements OnInit {

    private authUser: User = new User();
    private headerRows: any[];

    //Global QueryParams.
    private queryParams: any;


    private tasks: TaskToDo[] = [];
    private taskSelected: TaskToDo;

    private updateSub: Subscription;

    private confirmSubscription: Subscription;
    constructor(private messageService: MessageService,
        private internService: InternService,
        private router: Router,
        private route: ActivatedRoute,
        private userInformationService: UserInformationService)
    { }
    ngOnInit() {
        console.log("ManageTaskComponent.ngOnInit");
        this.userInformationService.fetchUser().then((user) => {
            this.authUser = user;
            this.refresh();
        }).catch((error) => this.handleError(error));
        
        this.headerRows = [
            {
                columns: [
                    { header: "Title",sortable: true },
                    { header: "Supervisor", sortable: true }
                ]
            }
        ];


        this.updateSub = this.router.routerState.queryParams
            .subscribe((params) => {
                console.log("ManageTaskComponent. changed");
                this.queryParams = params;
                //Handle the go back & forward operation by user.
                let taskId = + (params['taskId'] || GlobalConstant.NUMBER_NOTHING);
                this.setSelectFromQueryParam(taskId);
           });
       
    }

    //To notify update, change the value of any property in the queryParams object
    //or simply replace queryParams object with a new object reference.
    private clearParams() {
        this.queryParams["taskId"] = GlobalConstant.NUMBER_NOTHING;
        this.router.navigate([], { queryParams: this.queryParams});
    }

    private applyParams() {
        this.router.navigate([], { queryParams: this.queryParams });
    }


    private setSelectFromQueryParam(taskId: number) {
        //always check null.....
        if (this.taskSelected && (this.taskSelected.Id == taskId)) {
            //Do nothing....
            return;
        }
       
        if (taskId == GlobalConstant.NUMBER_NOTHING) {
            this.taskSelected = new TaskToDo();  //intentionally cause reference mismatch.
            return;
        }
        let taskSelected=this.tasks.find(function (task) {
            return task.Id == taskId;
        });
        this.taskSelected = taskSelected || new TaskToDo();
        
    }
   
    private refresh() {
        this.internService.getTasksForIntern(this.authUser.Id)
            .then((tasks) => this.tasks = tasks)
            .catch((error) => this.handleError(error));
        this.clearParams();
    }

    ngOnDestroy() {
        this.updateSub.unsubscribe();
    }


    private handleError(error: string) {
        this.messageService.error(error);
    }
       

    private onSelected(task: TaskToDo) {
        this.queryParams["taskId"] = task.Id;
        this.applyParams();
    }

    private onUnselected(task: TaskToDo) {
        this.clearParams();
    }

}