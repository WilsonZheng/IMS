//Description: Editor for an invitation email.

import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

import { Button, Editor, Header, Dialog } from 'primeng/primeng';

import { TemplateService } from './shared/template.service';
import { InvitationService } from './shared/invitation.service';
import { MessageService } from '../shared/message.service';
import { UtilityService } from '../shared/utility.service';

import { Template } from './template';
import { TemplateContent } from './template-content';

import { InvitationBatchModel } from './invitation-batch.model';
import { InvitationBatchTransfer } from './invitation-batch.transfer';

@Component({
    selector: 'inv-invitation-editor',
    templateUrl: '/app/invitation/invitation-editor.component.html',
    directives: [Button, Editor, Header, Dialog],
    providers: [InvitationService, UtilityService]
})
export class InvitationEditorComponent implements OnInit {
    @Input() notice: Template;
    @Output() success = new EventEmitter<Template>();
    @Output() cancelled  = new EventEmitter<void>();
    invitation: InvitationBatchModel;
   

    constructor(private invitationService: InvitationService, private messageService: MessageService, private utilityService: UtilityService) {
        
    }
    ngOnInit() {
        this.invitation = new InvitationBatchModel();
        this.invitation.Subject = this.notice.Content.DefaultSubject;
        this.invitation.Content = this.notice.Content.DefaultContent;
        this.invitation.NoticeId = this.notice.Id;
    }


    private transform(): InvitationBatchTransfer {
        let emails: string[] = this.invitation.Email.replace(/\s/g, "").split(",");
        let isValid = true;
        emails.forEach((email, index, arr) => {
            if (!this.utilityService.validEmail(email)) {
                this.messageService.warn(email + ' is not a valid address');
                isValid = false;
            }
        });
        if (!isValid) return null;
        let batch = new InvitationBatchTransfer(this.invitation.NoticeId, this.invitation.Subject, this.invitation.Content, emails);
        return batch;
    }
   
    private send() {
        let batch = this.transform();
        if (batch) {
            this.invitationService.sendInvitation(batch).then(() => {
                this.success.emit(this.notice);
            }).catch((error) => this.handleError(error));
        }       
    }
    
    private cancel() {
        this.cancelled.emit(null);
    }
    
    
    handleError(message: string) {
        this.messageService.error(message);
    }
}