/// <reference path="../../node_modules/rxjs/add/operator/toPromise.d.ts" />
import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { DataTable, Column, Header, Button, Menu, MenuItem, Tooltip, DataList } from 'primeng/primeng';
import { Subscription } from 'rxjs/Subscription';

//Custom service
import { TemplateService } from './shared/template.service';
import { InvitationService } from './shared/invitation.service';
import { MessageService } from '../shared/message.service';


//Custom Models.
import { Template } from './template';
import { RestResult } from './shared/rest-result';
import { RecruitStatusCode } from '../shared/recruit-status-code';
import { Invitation } from './invitation';

//Custom Component
import { NoticeEditorComponent } from  './notice-editor.component';
import { InvitationEditorComponent } from './invitation-editor.component';
import { RecruitProgressComponent } from './recruit-progress.component';

@Component({
    selector: 'inv-notice-main',
    templateUrl:'app/invitation/notice-main.component.html',
    styleUrls: ["app/invitation/notice-main.component.css"],
    directives: [DataTable, Column, Button, Header, Menu, NoticeEditorComponent
        , InvitationEditorComponent, RecruitProgressComponent, Tooltip, DataList],
    providers: [InvitationService]
})
export class NoticeMainComponent implements OnInit {

    

    templates: Template[];
    confirmSubscription: Subscription;

    constructor(private templateService: TemplateService,
        private messageService: MessageService, private invitationService: InvitationService)
    { }


    headerRows: any[];

    private menuItems: MenuItem[];

    ngOnInit() {
        this.loadNotice();
        this.headerRows = [
           // {
           //     columns: [{ header: "Title", rowspan: 2, filter: true, field: "Name", filterMatchMode:"contains", sortable:true}, {header:"Progress", colspan:4 }]
           // },
            { columns: [{ header: "Title", filter: true, field: "Name", filterMatchMode: "contains", sortable: true }] }
            
        ];

        this.menuItems = [
                        { label: 'Send Invitation', icon: 'fa-envelope-o', command: (event) => { this.writeEmail(); } },
                        { label: 'Edit', icon: 'fa-edit', command: (event) => { this.editNotice(); } },
                        { label: 'Archive', icon: 'fa-archive', command: (event) => { this.deleteNotice(); }}
        ];
    }
    
    @ViewChild(Menu)
    private menuComponent: Menu;

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
    editNotice() {
        this.isCreatNotice = false;
        this.handleNotice = true;
    }

        
    closeNotice() {
        this.handleNotice = false;
    }

    deleteNotice() {
        
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
    
    //Listing invitation by condition.
    listInvitation() {
        //Not implemented yet.
    }
        
    //Write Invitation
    handleInvitation: boolean = false;
    invitationOption = {
        resizable:false
    }
    writeEmail() {
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
    
    manageNotice(event: Event, notice: Template) {
        this.notice = notice;
        this.menuComponent.hide();
        this.menuComponent.toggle(event);
    }
    
    //Search Intivation.
    
    private invitations: Invitation[];
    progressTotal(event: Event, notice: Template) {
        this.invitationService.getInvitations([notice.Id], []).then((result) => {
            this.invitations = result;
        })
        .catch(error => { this.handleError(error); });
    }
    
    progressSent(event: Event, notice: Template) {
        this.invitationService.getInvitations([notice.Id], [RecruitStatusCode.InvitationSent]).then((result) => {
            this.invitations = result;
        })
            .catch(error => { this.handleError(error); });
    }

    progressReplied(event: Event, notice: Template) {
        this.invitationService.getInvitations([notice.Id], [RecruitStatusCode.ContractReceived]).then((result) => {
            this.invitations = result;
        })
            .catch(error => { this.handleError(error); });
    }


    progressApproved(event: Event, notice: Template) {
        this.invitationService.getInvitations([notice.Id], [RecruitStatusCode.Approved]).then((result) => {
            this.invitations = result;
        })
            .catch(error => { this.handleError(error); });
    }
    
    private resend(invitation: Invitation) {
        this.messageService.request();
        this.confirmSubscription = this.messageService.result.subscribe((result) => {
            this.confirmSubscription.unsubscribe();
            if (result == 1) {
                this.proceedResend(invitation);
            }
        });
        
    }
    
    private proceedResend(invitation: Invitation) {
        this.invitationService.resendInvitation(invitation)
            .then(() => {
                this.showInformModal("Completed");
            })
            .catch(error => { this.handleError(error); });
    }



    private deleteInvitation(invitation: Invitation) {
        
        this.messageService.request();
        this.confirmSubscription = this.messageService.result.subscribe((result) => {
            this.confirmSubscription.unsubscribe();
            if (result == 1) {
                this.proceedDeleteInvitation(invitation);
            }
        });
    }

    private proceedDeleteInvitation(invitation: Invitation) {
        this.invitationService.deleteInvitation(invitation)
            .then(() => {
                for (var i = 0; i < this.invitations.length; i++) {
                    if (this.invitations[i].Email == invitation.Email && this.invitations[i].NoticeId == invitation.NoticeId) {
                        this.invitations.splice(i, 1);
                        this.showInformModal("Deleted");

                        //Refresh the status information for the corresponding notice which owned this deleted invitation.
                        this.templateService.getRecruitStatus(invitation.NoticeId)
                            .then((status) => {
                                let notice = this.templates.find(function (template) {
                                    return template.Id == invitation.NoticeId
                                });
                                if (notice) {
                                    notice.RecruitStatus = status;
                                }
                            })
                            .catch(error => { this.handleError(error); });
                        return;
                    }
                }
            })
            .catch(error => { this.handleError(error); });
    }
   
}