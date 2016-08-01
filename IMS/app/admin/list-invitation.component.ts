/// <reference path="../../node_modules/rxjs/add/operator/toPromise.d.ts" />
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute }    from '@angular/router';
import { DataTable, Column, Header, Button } from 'primeng/primeng';
import { Subscription } from 'rxjs/Subscription';

//Custom service
import { InvitationService } from '../invitation/shared/invitation.service';
import { MessageService } from '../shared/message.service';


//Custom Models.
import { Template } from '../invitation/template';
import { RestResult } from '../shared/rest-result';
import { RecruitStatusCode } from '../shared/recruit-status-code';
import { Invitation } from '../invitation/invitation';
import { GlobalConstant } from '../shared/global-constant';

//Custom Component
import { RecruitProgressComponent } from '../invitation/recruit-progress.component';

@Component({
    templateUrl: '/app/admin/list-invitation.component.html',
    styles: [`
                .ims-header-container{
                    text-align:left;
                }
            `],
    directives: [DataTable, Column, Button, Header
        , RecruitProgressComponent],
    providers: [InvitationService]
})
export class ListInvitationComponent implements OnInit {
    private noticeId: number = GlobalConstant.NUMBER_NOTHING;
    private recruitStatusCode: number = GlobalConstant.NUMBER_NOTHING;

    private get isValid() {
        return this.noticeId != GlobalConstant.NUMBER_NOTHING;
    }


    
    private queryParamSub: Subscription;

    private confirmSubscription: Subscription;

    constructor(private messageService: MessageService,
                private router: Router,
                private route: ActivatedRoute,
                private invitationService: InvitationService)
    { }
    
    headerRows: any[];

    ngOnInit() {
        this.headerRows = [
            {
                columns: [
                    { header: "Notice", filter: true, field: "NoticeName", filterMatchMode: "contains", sortable: true },
                    { header: "Email", filter: true, field: "Email", filterMatchMode: "contains", sortable: true },
                    { header: "Status" },
                    { header: "Manage" }
                ]
            }
        ];

        this.queryParamSub = this.router.routerState.queryParams.subscribe(params => {
            this.noticeId           = (params['noticeId'] || GlobalConstant.NUMBER_NOTHING);
            this.recruitStatusCode = (params['recruitStatusCode'] || GlobalConstant.NUMBER_NOTHING);
            if (this.isValid) this.refresh();
        });
    }
       
    ngOnDestroy() {
        this.queryParamSub.unsubscribe();
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

    //Search Intivation.
    private invitations: Invitation[];

    private refresh() {
        let codes: number[] = this.recruitStatusCode == GlobalConstant.NUMBER_NOTHING ? [] : [this.recruitStatusCode];
        this.invitationService.getInvitations([this.noticeId],codes).then((result) => {
            this.invitations = result;
        })
            .catch(error => { this.handleError(error); });
    }
    
    private resend(invitation: Invitation) {
        this.messageService.request();
        this.confirmSubscription = this.messageService.result.subscribe((result) => {
            this.confirmSubscription.unsubscribe();
            if (result == 1) {
                this.invitationService.resendInvitation(invitation)
                    .then(() => {
                        this.showInformModal("Completed");
                    })
                    .catch(error => { this.handleError(error); });
            }
        });
    }

  
    
    private deleteInvitation(invitation: Invitation) {
        this.messageService.request();
        this.confirmSubscription = this.messageService.result.subscribe((result) => {
            this.confirmSubscription.unsubscribe();
            if (result == 1) {
                this.invitationService.deleteInvitation(invitation)
                    .then(() => {
                        for (var i = 0; i < this.invitations.length; i++) {
                            if (this.invitations[i].Email == invitation.Email && this.invitations[i].NoticeId == invitation.NoticeId) {
                                this.invitations.splice(i, 1);
                                this.showInformModal("Deleted");
                                return;
                            }
                        }
                    })
                    .catch(error => { this.handleError(error); });
            }
        });
    }

  

}