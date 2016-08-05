import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { ROUTER_DIRECTIVES, Router, ActivatedRoute }    from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { MessageService } from '../shared/message.service';
import { RestResult } from '../shared/rest-result';
import { InternService } from '../shared/intern.service';
import { UserInformationService } from '../shared/user-information.service';
import { BracketDateTransformPipe } from '../shared/bracket-date-transform.pipe';


import { TaskReportListRequest } from '../shared/task-report-list-request';
import { TaskToDo } from '../shared/task-to-do';
import { GlobalConstant } from '../shared/global-constant';
import { User } from '../shared/user';
import { TaskReport } from '../shared/task-report';
import { InternReportEditorComponent } from '../shared/intern-report-editor.component';
import { InternReportViewerComponent } from '../shared/intern-report-viewer.component';
import { Column, Button, DataTable, Header} from 'primeng/primeng';
@Component({
    selector:'intern-task-report',
    templateUrl: '/app/shared/task-report.component.html',
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

        #ims-content{
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
    directives: [Column, Button, DataTable, InternReportEditorComponent, InternReportViewerComponent],
    providers: [UserInformationService],
    pipes: [BracketDateTransformPipe]
})
export class TaskReportComponent implements OnInit {

    private authUser: User = new User();


    private searchKey: string = "";
    private confirmSubscription: Subscription;
    private headerRows: any[];
    private reports: TaskReport[] = [];
    private reportSelected: TaskReport;
    //global queryParams.
    private queryParams: any;

    taskIdSub: Subscription;
    taskId: number = GlobalConstant.NUMBER_NOTHING;
    internId: number = GlobalConstant.NUMBER_NOTHING;

    //hint for whether or not to display view.
    get isValid(): boolean {
        return this.taskId != GlobalConstant.NUMBER_NOTHING && this.internId != GlobalConstant.NUMBER_NOTHING;
    }

    private handleEditor: boolean = false;
    private isEditting: boolean = false;

    private handleViewer: boolean = false;

    constructor(private messageService: MessageService,
        private internService: InternService,
        private router: Router,
        private route: ActivatedRoute,
        private userInformationService: UserInformationService) { }

    ngOnInit() {
        this.userInformationService.fetchUser().then((user) => this.authUser = user);
        this.taskIdSub = this.router.routerState.queryParams
            .subscribe((params) => {
                this.queryParams = params || {};
                let taskIdOrg = this.taskId;
                let internIdOrg = this.internId;
                this.taskId = (params['taskId'] || GlobalConstant.NUMBER_NOTHING);
                this.internId = (params['internId'] || GlobalConstant.NUMBER_NOTHING);
                //only when getting updated and valid taskId, fetch the reports
                if (this.isValid && (this.taskId != taskIdOrg || this.internId != internIdOrg)) {
                    this.refresh();
                }
            });


        this.headerRows = [
            {
                columns: [
                    { header: "Date", filter: false, field: "CreatedAt", sortable: true },
                    { header: "Title", filter: true, field: "Title", filterMatchMode: "contains", sortable: true },
                    { header: "Manage", filter: false },
                ]
            }
        ];
    }

    ngOnDestroy() {
        this.taskIdSub.unsubscribe();
    }

    private handleError(error: string) {
        this.messageService.error(error);
    }
   
    private refresh() {
        let request = new TaskReportListRequest();
        request.TaskId = this.taskId;
        request.InternId = this.internId;
        this.internService.getReports(request).then((reports) => this.reports = reports).catch((error) => this.handleError(error));

        //close window.-> back to list view.
        this.handleEditor = false;
        this.handleViewer = false;
    }

    private view(report: TaskReport) {
        this.reportSelected = report;
        this.handleViewer = true;
    }

    private delete(report: TaskReport) {
        this.messageService.request();
        this.confirmSubscription = this.messageService.result.subscribe((result) => {
            this.confirmSubscription.unsubscribe();
            if (result == 1) {
                this.internService.deleteReport(report).then((report) => {
                    for (var i = 0; i < this.reports.length; i++) {
                        let tmp: TaskReport = this.reports[i];
                        if (tmp.Id == report.Id) {
                            this.reports.splice(i, 1);
                            break;
                        }
                    }
                }).catch((error) => this.handleError(error));
            }
        });
    }


    private create() {
        this.isEditting = false;
        this.handleEditor = true;
    }

    private edit(report: TaskReport) {
        this.reportSelected = report;
        this.isEditting = true;
        this.handleEditor = true;
    }

    private created(report: TaskReport) {
        this.reports.splice(0, 0, report);
        this.handleEditor = false;
    }

    private updated(report: TaskReport) {
        let tmp: TaskReport;
        for (let i = 0; i < this.reports.length; i++) {
            tmp = this.reports[i];
            if (tmp.Id == report.Id) {
                tmp.Title = report.Title;
                tmp.Content = report.Content;
                break;
            }
        }
        this.handleEditor = false;
    }

    private cancelled() {
        this.handleEditor = false;
    }

    private viewCancelled() {
        this.handleViewer = false;
    }
}