//Description: List the created notices with the current progression information.

/// <reference path="../../node_modules/rxjs/add/operator/toPromise.d.ts" />
import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import {ROUTER_DIRECTIVES, Router, ActivatedRoute }    from '@angular/router';
import { DataTable, Column, Header, Button, Menu, MenuItem, Tooltip, DataList } from 'primeng/primeng';
import { Subscription } from 'rxjs/Subscription';

//Custom service
import { TemplateService } from './shared/template.service';
import { InvitationService } from './shared/invitation.service';
import { MessageService } from '../shared/message.service';


import { GlobalConstant } from '../shared/global-constant';

//Custom Models.
import { Template } from './template';
import { RestResult } from '../shared/rest-result';
import { RecruitStatusCode } from '../shared/recruit-status-code';
import { Invitation } from './invitation';

//Custom Component
import { NoticeEditorComponent } from  './notice-editor.component';
import { InvitationEditorComponent } from './invitation-editor.component';
//import { RecruitProgressComponent } from './recruit-progress.component';

@Component({
    selector: 'inv-notice-main',
    templateUrl: '/app/invitation/notice-main.component.html',
    styles: [`
                div[class*="col-"] {
                    padding:1px;
                    margin:0px;
                }

                .recruit-status-stat .label-container{
                    font-weight:400;
                    border-radius:8px;
                    border:1px solid #9cada0;
                } 

                .ims-header-container{
                    line-height:26px;
                    height:26px;
                    text-align:left;
                }

                .label-container{
                    display:inline-block;
                    width:100%;
                    text-align:center;
                }

                .ims-iterator{
                    border-radius:8px;
                    background-color:#f5f5f5;
                    margin:4px 0;
                    padding:5px;
                }

                .badge.imsselected{
                    color: red;
                    background-color:yellow;
                 }
            `],
    directives: [DataTable, Column, Button, Header, Menu, NoticeEditorComponent
        , InvitationEditorComponent, Tooltip, DataList, ROUTER_DIRECTIVES],
    providers: [TemplateService,InvitationService]
})
export class NoticeMainComponent implements OnInit {


    ///////////////////////// RecruitStatusCode constant/////////////////////////
    private get CODE_SENT():number {
        return RecruitStatusCode.InvitationSent;
    }

    private get CODE_REPLIED():number {
        return RecruitStatusCode.ContractReceived;
    }

    private get CODE_APPROVED(): number {
        return RecruitStatusCode.Approved;
    }

    private get CODE_ALL(): number {
        return GlobalConstant.NUMBER_NOTHING;
    }


    private isSelected(notice: Template, status: number) {
        return this.noticeId == notice.Id && this.recruitStatusCode == status;
    }


    private noticeId: number = GlobalConstant.NUMBER_NOTHING;
    private recruitStatusCode: number = GlobalConstant.NUMBER_NOTHING;
    
    templates: Template[];
    confirmSubscription: Subscription;
    private queryParamSub: Subscription;
    constructor(private templateService: TemplateService,
        private messageService: MessageService,
        private invitationService: InvitationService,
        private router: Router,
        private route: ActivatedRoute)
    { }


    headerRows: any[];


    
    
    ngOnInit() {
        this.loadNotice();
        
        this.headerRows = [
            {
                columns: [
                            { header: "Title", filter: true, field: "Name", filterMatchMode: "contains", sortable: true },
                            { header: "Progress"},
                            { header: "Manage"}
                ]
            }
        ];

        this.queryParamSub = this.router.routerState.queryParams.subscribe(params => {
            this.noticeId = (params['noticeId'] || GlobalConstant.NUMBER_NOTHING);
            this.recruitStatusCode = (params['recruitStatusCode'] || GlobalConstant.NUMBER_NOTHING);
        });
    }


    ngOnDestroy() {
        this.queryParamSub.unsubscribe();
    }

    //Edit Notice (A Notice is actually A Template). 
    //Notice control properties.
    //selected Notice
    notice: Template;

    isCreatNotice: boolean = false;
    noticeOption = {
        resizable: false
    }
    handleNotice: boolean = false;

    private loadNotice() {
        this.templateService.getTemplates()
            .then(templates => {
                this.templates = templates;
                this.clearParams();
            })
            .catch(error => { this.handleError(error); });
    }


    //notice manipulation callback.
    noticeUpdated(notice: Template) {
                for (var i = 0; i < this.templates.length; i++) {
                    if (this.templates[i].Id == notice.Id) {
                        this.templates[i].Name = notice.Name;
                        break;
                    }
                }
                this.closeNotice();
                this.showInformModal("Updated");
    }


    private clearParams() {
        this.router.navigate([], { queryParams: {}, relativeTo: this.route });
    }


    noticeCreated(notice: Template) {
        this.templates.splice(0, 0, notice);
        this.closeNotice();
        this.showInformModal("created");
    }

    newNotice() {
        this.isCreatNotice = true;
        this.handleNotice = true;
    }

    //notice manipuation function.
    editNotice(notice: Template) {
        this.notice = notice;
        this.isCreatNotice = false;
        this.handleNotice = true;
    }

        
    closeNotice() {
        this.handleNotice = false;
    }

    deleteNotice(notice: Template) {
        this.notice = notice;
        this.messageService.request();
        this.confirmSubscription= this.messageService.result.subscribe((result) => {
            this.confirmSubscription.unsubscribe();
            if (result == 1) {
                this.proceedDelete(this.notice.Id);
            }
        });
    }

    private proceedDelete(id: number) {
        this.templateService.deleteTemplate(id)
            .then(() => {
                for (var i = 0; i < this.templates.length; i++) {
                    if (this.templates[i].Id == id) {
                        this.templates.splice(i, 1);
                        this.showInformModal("Archived");
                        return;
                    }
                }
            })
            .catch(error => {
                this.showErrorModal(error);
            });
    }         
        
        
    showInformModal(message: string) {
        this.messageService.info(message);
    }

    showErrorModal(message: string) {
        this.messageService.error(message);
    }
    
    handleError(message: string) {
        this.messageService.error(message);
    }
      
        
    //Write Invitation
    handleInvitation: boolean = false;
    invitationOption = {
        resizable:false
    }
    private writeEmail(notice: Template) {
        this.notice = notice;
        //Fetch the default email subject & content which have been stored for the notice(=template).
        this.templateService.getEmailTemplateContent(this.notice.Id)
            .then((templateContent) => {
                this.notice.Content = templateContent;
                this.handleInvitation = true;   
            })
            .catch(error => { this.handleError(error); });
    }

    invitationSuccess(notice: Template) {
        this.messageService.info("Request completed");
        this.handleInvitation = false;
        //update RecruitStatus.
        this.templateService.getRecruitStatus(notice.Id)
            .then((status) => {
                notice.RecruitStatus = status;
            })
            .catch(error => { this.handleError(error); });
    }

    private invitationCancelled() {
        this.handleInvitation = false;
    }
        
    private invitations: Invitation[];
    private progressTotal(notice: Template) {
        this.router.navigate(['invitation'], { queryParams: {noticeId: notice.Id}, relativeTo: this.route });
    }
    
    private progressSent(notice: Template) {
        let queryParams = {
            noticeId: notice.Id,
            recruitStatusCode: RecruitStatusCode.InvitationSent
        };
        this.router.navigate(['invitation'], { queryParams: queryParams, relativeTo: this.route });
    }

    private progressReplied(notice: Template) {
        let queryParams = {
            noticeId: notice.Id,
            recruitStatusCode: RecruitStatusCode.ContractReceived
        };
        this.router.navigate(['invitation'], { queryParams: queryParams, relativeTo: this.route });
    }
    
    private progressApproved(notice: Template) {
        let queryParams = {
            noticeId: notice.Id,
            recruitStatusCode: RecruitStatusCode.Approved
        };
        this.router.navigate(['invitation'], { queryParams: queryParams,relativeTo: this.route });
    }
}