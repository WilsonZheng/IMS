import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { ROUTER_DIRECTIVES, Router, ActivatedRoute }    from '@angular/router';
import { DataTable, Column, Header, Button } from 'primeng/primeng';
import { Subscription } from 'rxjs/Subscription';
import { MessageService } from '../shared/message.service';
import { RestResult } from '../shared/rest-result';
import { InternService } from './intern.service';
import { Intern } from './intern';
import { ManageInternUpdateCode } from './manage-intern-update-code';
import { GlobalConstant } from '../shared/global-constant';
import { InternSearchCondition } from './intern-search-condition';

@Component({
    templateUrl: '/app/admin/manage-intern.component.html',
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
    directives: [DataTable, Column, Button, Header, ROUTER_DIRECTIVES ],
    providers: [InternService]
})
export class ManageInternComponent implements OnInit {
    private internSearchCondition:InternSearchCondition = new InternSearchCondition();
    private headerRows: any[];
    private interns: Intern[] = [];
    private selectedIntern: Intern;

    private updateSub: Subscription;
    private internVersion: number = 0;

    private confirmSubscription: Subscription;
    constructor(private messageService: MessageService,
        private internService: InternService,
        private router: Router, private route: ActivatedRoute)
    { }
    ngOnInit() {
        this.internService.getInterns().then((result) => { this.interns = result; }).catch((error) => { this.handleError(error); });
        this.headerRows = [
            {
                columns: [
                    { header: "First Name", filter: true, field: "FirstName", filterMatchMode: "contains", sortable: true },
                    { header: "Last Name", filter: true, field: "LastName", filterMatchMode: "contains", sortable: true },
                    { header: "User Name", filter: true, field: "UserName", filterMatchMode: "contains", sortable: true },
                    { header: "Supervisor", filter: false },
                    { header: "Task", filter: false }
                ]
            }
        ];
       
        this.updateSub = this.router.routerState.queryParams
            .subscribe((params) => {
                //Handle the go back & forward operation by user.
                let internId = + (params['internId'] || GlobalConstant.NUMBER_NOTHING);
                this.setSelectFromQueryParam(internId);
                
                //Check the update.
                let version = + (params['internVersion'] || GlobalConstant.NUMBER_NOTHING);
                if (version != GlobalConstant.NUMBER_NOTHING && version != this.internVersion) {
                    this.internVersion = version;
                    let updatecode = + params['updatecode'];
                    this.onUpdate(updatecode);
                }
            });
              

    }



    private setSelectFromQueryParam(internId: number) {
        let selectedIntern: Intern = new Intern();
        if (internId == GlobalConstant.NUMBER_NOTHING)
        {
            this.selectedIntern = selectedIntern;
        }
        if (this.selectedIntern && this.selectedIntern.Id == internId) {
            return;
        }
      
        for (let i = 0; i < this.interns.length; i++) {
            if (this.interns[i].Id == internId) {
                selectedIntern = this.interns[i];
                break;
            }
        }
        this.selectedIntern = selectedIntern;
    }




    //Detect any update from the component hosted inside router-outlet.
    private onUpdate(updatecode: number) {
        if (updatecode == ManageInternUpdateCode.SUPERVISOR) {
            this.internService.getSupervisorsForIntern(this.selectedIntern.Id)
                .then((supervisors) => this.selectedIntern.Supervisors = supervisors)
                .catch((error) => this.handleError(error));
        }
        else if (updatecode == ManageInternUpdateCode.TASK) {
            this.internService.getTasksForIntern(this.selectedIntern.Id)
                .then((tasks) => this.selectedIntern.TaskToDos=tasks)
                .catch((error) => this.handleError(error));
        }
    }


    ngOnDestroy() {
        this.updateSub.unsubscribe();
    }


    private handleError(error: string) {
        this.messageService.error(error);
    }

    private superviser(internshipId: number) {
        
    }

    private onInternSelected(event: any) {
        let intern: Intern = event.data;
        this.router.navigate([], {
            queryParams: { internId: intern.Id },
            relativeTo: this.route
        });
       
    }

    //remove query params.
    private onInternUnselected(event: any) {
        let intern: Intern = event.data;
        this.router.navigate([], {
            queryParams: {},
            relativeTo: this.route
        });
    }


    private test(event: any) {
        console.log("test");
    }

}