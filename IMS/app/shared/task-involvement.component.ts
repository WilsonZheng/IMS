import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { ROUTER_DIRECTIVES, Router, ActivatedRoute }    from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { MessageService } from '../shared/message.service';
import { RestResult } from '../shared/rest-result';
import { InternService } from '../shared/intern.service';
import { GlobalConstant } from '../shared/global-constant';
import { BracketDateTransformPipe } from '../shared/bracket-date-transform.pipe';
import { User } from '../shared/user';
import { Column, Button, DataTable} from 'primeng/primeng';
import { TaskInvolvement } from '../shared/task-involvement';
@Component({
    templateUrl: '/app/shared/task-involvement.component.html',
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

`],
    directives: [Column, Button, DataTable],
    providers: [],
    pipes: [BracketDateTransformPipe]

})
export class TaskInvolvementComponent implements OnInit {

    private list: TaskInvolvement[] = [];
    
    private internIdSub: Subscription;
    private internId: number = GlobalConstant.NUMBER_NOTHING;

    //global queryParams.
    private queryParams: any;
    
    private headerRows: any[];
    
    private get isValid(): boolean {
        return this.internId != GlobalConstant.NUMBER_NOTHING;
    }

    constructor(private messageService: MessageService,
        private internService: InternService,
        private router: Router,
        private route: ActivatedRoute) { }

    ngOnInit() {
        //when selected intern changes, if valid, load a new list of the comments.
        this.internIdSub = this.router.routerState.queryParams
            .subscribe((params) => {
                this.queryParams = params || {};
                this.internId = (params['internId'] || GlobalConstant.NUMBER_NOTHING);
                if (this.internId != GlobalConstant.NUMBER_NOTHING) {
                    this.refresh();
                }
            });


        this.headerRows = [
            {
                columns: [
                    { header: "Task", filter: true, field: "TaskName", filterMatchMode: "contains" },
                    { header: "Supervisor", filter: true, field: "SupervisorName", filterMatchMode: "contains" },
                    { header: "Finished", filter: false, field: "IsClosed" },
                    { header: "From", filter: false, field: "JoinAt"},
                    { header: "Until", filter: false, field: "LeftAt" }
                ]
            }
        ];
    }

    private refresh() {
        this.internService.getTaskHistoryForIntern(this.internId)
            .then((involvements) => {
                this.list = involvements;
            })
            .catch((error) => this.handleError(error));
    }

    ngOnDestroy() {
        this.internIdSub.unsubscribe();
    }

    private handleError(error: string) {
        this.messageService.error(error);
    }
}