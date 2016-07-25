import { Component, OnInit,OnDestroy, Input, Output, EventEmitter} from '@angular/core';
import { ROUTER_DIRECTIVES, Router, ActivatedRoute }    from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/map';

import { DataTable, Column, Header, Button } from 'primeng/primeng';

import { MessageService } from '../shared/message.service';
import { RestResult } from '../shared/rest-result';
import { InternService } from './intern.service';
import { Supervisor } from './supervisor';
import { SupervisingRequest } from './supervising-request';
import { ManageInternUpdateCode } from './manage-intern-update-code';

import { GlobalConstant } from '../shared/global-constant';

@Component({
    templateUrl: '/app/admin/intern-supervisor.component.html',
    styles: [`

 .ims-body-container{
            margin-bottom:0px;
        }

 .panel-body{
            padding:1px;
        }
    `],
    directives: [DataTable, Column, Header, Button],
    providers: []
})
export class InternSupervisorComponent implements OnInit {
    
    internIdSub: Subscription;
    internId: number = GlobalConstant.NUMBER_NOTHING;

    //hint for whether or not to display view.
    get isValid(): boolean {
        return this.internId != GlobalConstant.NUMBER_NOTHING;
    }
    
    private headerRows: any[];

    private queryParams:any;


    //all available supervisors.
    private supervisors: Supervisor[] = [];
    //currently connected supervisors with the intern to be worked on.
    private supervisorsAssigned: Supervisor[] = [];
    
    constructor(private messageService: MessageService,
        private internService: InternService,
        private router: Router,
        private route: ActivatedRoute){}
    
    ngOnInit() {
        
        this.headerRows = [
            {
                columns: [
                    { header: "First Name", filter: true, field: "FirstName", filterMatchMode: "contains", sortable: true },
                    { header: "Last Name", filter: true, field: "LastName", filterMatchMode: "contains", sortable: true },
                    { header: "Supervised Interns"}
                ]
            }
        ];
                
        this.internIdSub = this.router.routerState.queryParams
            .subscribe((params) => {
                this.queryParams = params || {};
                let internId = (params['internId'] || GlobalConstant.NUMBER_NOTHING);
                 //only when getting updated and valid internId, fetch the current supervisor information.(including assigned interns)
                if (internId != GlobalConstant.NUMBER_NOTHING && this.internId != internId) {
                    let supervisorsAssigned = this.supervisorsAssigned;
                    this.internService.getSupervisors().then((supervisors) => {

                        //populate the variable with all the available supervisors(=staff)
                        this.supervisors = supervisors;

                        //find already assigned supervisors for the intern to be worked on.
                        //replace the current with the newly fetched data.
                        this.supervisorsAssigned.splice(0, this.supervisorsAssigned.length);
                        supervisors.forEach(function (supervisor) {
                            if (supervisor.Interns.find(function (intern) { return intern.Id == internId; }) != undefined) {
                                supervisorsAssigned.push(supervisor);
                            }
                        });
                    }).catch((error) => this.handleError(error));
                }
                //update internId
                this.internId = internId;
            });
    }

    ngOnDestroy() {
        this.internIdSub.unsubscribe();
    }

    private handleError(error: string) {
        this.messageService.error(error);
    }

    private handleSupervising(supervisor: Supervisor, toConnect: boolean) {
        let model = new SupervisingRequest();
        model.ToConnect = toConnect;
        model.InternId =  this.internId;
        model.SupervisorId = supervisor.Id;
       
        this.internService.handleSupervising(model)
            .then((result) =>
            {
                //update version.
                this.queryParams.internVersion = Date.now();
                this.queryParams.updatecode = ManageInternUpdateCode.SUPERVISOR;

                supervisor.Interns = result.Interns;
                this.router.navigate([], {
                    queryParams: this.queryParams,
                    relativeTo: this.route
                });
            })
            .catch((error) => this.handleError(error));
    }
 
   
}