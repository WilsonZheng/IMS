/// <reference path="../../node_modules/rxjs/add/operator/toPromise.d.ts" />
import { Component, OnInit, Input } from '@angular/core';
import { Button, DataList } from 'primeng/primeng';

//Custom service
import { MessageService } from '../shared/message.service';

//Custom Models.
import { Template } from './template';
import { RestResult } from '../shared/rest-result';
import { Invitation } from './invitation';

//Custom Component
import { RecruitStatusCode } from '../shared/recruit-status-code';

@Component({
    selector: 'inv-recruit-progress',
    templateUrl: '/app/invitation/recruit-progress.component.html',
    directives: [DataList, Button]
    
})
export class RecruitProgressComponent implements OnInit {

    @Input() notice: Template;
    @Input() recruitStatusCode: RecruitStatusCode;
    constructor(private messageService: MessageService)
    { }
    
    get invitations(): Invitation[] {
        let recruitStatusCode = this.recruitStatusCode;
        return this.notice.Invitations.filter(function (invitation) {
            return recruitStatusCode==100||invitation.RecruitStatusCode == recruitStatusCode;
        });
    }


    ngOnInit() { }
    
    handleError(message: string) {
        this.messageService.error(message);
    }
       
    
}