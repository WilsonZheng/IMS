import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { ROUTER_DIRECTIVES, Router, ActivatedRoute }    from '@angular/router';
import { DataTable, Column, Header, Button, Spinner } from 'primeng/primeng';
import { Subscription } from 'rxjs/Subscription';
import { MessageService } from '../shared/message.service';
import { RestResult } from '../shared/rest-result';
import { InternService } from '../shared/intern.service';
import { Intern } from '../shared/intern';
import { ManageInternUpdateCode } from '../shared/manage-intern-update-code';
import { GlobalConstant } from '../shared/global-constant';
import { InternSearchCondition } from '../shared/intern-search-condition';
import { BracketDateTransformPipe } from '../shared/bracket-date-transform.pipe';

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
    directives: [DataTable, Column, Button, Header, ROUTER_DIRECTIVES, Spinner ],
    providers: [InternService],
    pipes: [BracketDateTransformPipe]

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
        this.headerRows = [
            {
                columns: [
                    { header: "Name", field: "FullName", rowspan: 2, filter: true, filterMatchMode: "contains", sortable: true },
                    { header: "Internship", colspan:3 },
                    { header: "Supervisor", rowspan:2 },
                    { header: "Current Task", rowspan:2}
                ]
            },
            {
                columns: [
                    { header: "From",field:"CommenceAt",sortable:true},
                    { header: "To", field: "ExpiryAt", sortable: true },
                    { header: "Days left", field: "DaysToExpiry", sortable: true }
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
              
        this.search();
    }
    private search() {
        this.internService.getInterns(this.internSearchCondition)
            .then((result) => {
                this.interns = result;
                //when the dataset is refreshed after one record has been selected, the selection match will be lost.
                //Without clearing the global queryParams(internId), the detail child-view would remain as it was.
                //To avoid this situation, clear all global queryParams which in turn deactivates its detail child-view.
                this.router.navigate([], {
                    queryParams: {},
                    relativeTo: this.route
                });
            })
            .catch((error) => { this.handleError(error); });
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


   
}