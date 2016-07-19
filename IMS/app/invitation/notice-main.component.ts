/// <reference path="../../node_modules/rxjs/add/operator/toPromise.d.ts" />
import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { DataTable, Column, Dialog, Header, Button, Menu, MenuItem } from 'primeng/primeng';
import { Subscription } from 'rxjs/Subscription';

//Custom service
import { TemplateService } from './shared/template.service';
import { InvitationService } from './shared/invitation.service';
import { MessageService } from '../shared/message.service';


//Custom Models.
import { Template } from './template';
import { RestResult } from './shared/rest-result';
import { RecruitStatusCode } from '../shared/recruit-status-code';

//Custom Component
import { NoticeEditorComponent } from  './notice-editor.component';
import { InvitationEditorComponent } from './invitation-editor.component';
import { RecruitProgressComponent } from './recruit-progress.component';

@Component({
    selector: 'inv-notice-main',
    templateUrl:'app/invitation/notice-main.component.html',
    styleUrls:["app/invitation/notice-main.component.css"],
    directives: [ DataTable, Column, Dialog, Button, Header, Menu, NoticeEditorComponent, InvitationEditorComponent, RecruitProgressComponent ],
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

        this.templateService.getTemplates()
            .then(templates => {
                this.templates = templates;
                //for (var i = 0; i < this.templates.length; i++) {
                //    this.templates[i].RecruitStatus.Received = i;
                //}
            })
            .catch(error => { this.handleError(error); });
  
        this.headerRows = [
           // {
           //     columns: [{ header: "Title", rowspan: 2, filter: true, field: "Name", filterMatchMode:"contains", sortable:true}, {header:"Progress", colspan:4 }]
           // },
            { columns: [{ header: "Title", filter: true, field: "Name", filterMatchMode: "contains", sortable: true }] }
            
        ];

        this.menuItems = [
                        { label: 'Send Invitation', icon: 'fa-envelope-o', command: (event) => { this.writeEmail(); } },
                        { label: 'Edit', icon: 'fa-edit', command: (event) => { this.editNotice(); } },
                        { label: 'Delete', icon: 'fa-trash-o', command: (event) => { this.deleteNotice(); }}
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
                        this.showInformModal("Deleted");
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
    
    manageNotice(event: Event, notice: Template) {
        this.notice = notice;
        this.menuComponent.hide();
        this.menuComponent.toggle(event);
    }
    
    progress(event: Event, notice: Template) {
        this.invitationService.getInvitations([notice.Id],[]).then((result) => {
           
           
           
        })
        .catch(error => { this.handleError(error); });
    }
   
}