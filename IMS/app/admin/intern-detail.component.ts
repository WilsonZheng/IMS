import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { ROUTER_DIRECTIVES, Router, ActivatedRoute }    from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { MessageService } from '../shared/message.service';
import { RestResult } from '../shared/rest-result';
import { InternService } from './intern.service';

import { AdjustExpiryRequest } from './adjust-expiry-request';
import { Intern } from './intern';
import { GlobalConstant } from '../shared/global-constant';
import { ManageInternUpdateCode } from './manage-intern-update-code';
import { BracketDateTransformPipe } from '../shared/bracket-date-transform.pipe';
import { DataTable, Column, Header, Button, Spinner } from 'primeng/primeng';
@Component({
    templateUrl: '/app/admin/intern-detail.component.html',
    styles: [`
        .ims-body-container{
            margin-bottom:0px;
        }

        .panel-heading{
                position:relative;
        }

        .panel-body{
            padding:5px;
        }

        .ims-detail-name{
            font-size : 1.5em;
            color: #f09413;
        }
        
        .ims-title-1st{
            font-size: 1.2em;
            font-weight:700;
        }

        .ims-adjust-expiry{
            line-height:15px;
            height:40px;
        }

`],
    directives: [DataTable, Column, Header, Button, Spinner],
    providers: [],
    pipes: [BracketDateTransformPipe]
})
export class InternDetailComponent implements OnInit {
    //adjustment for internship expiry date.
    private adjustExpirtyRequest: AdjustExpiryRequest = new AdjustExpiryRequest();
    
    private internIdSub: Subscription;
    private internId: number = GlobalConstant.NUMBER_NOTHING;

    private intern: Intern;





    //global queryParams.
    private queryParams: any;
    
    private get isValid(): boolean {
        return this.internId != GlobalConstant.NUMBER_NOTHING;
    }

    constructor(private messageService: MessageService,
        private internService: InternService,
        private router: Router,
        private route: ActivatedRoute)
    { }
    ngOnInit() {
        this.internIdSub = this.router.routerState.queryParams
            .subscribe((params) => {
                this.queryParams = params || {};
                let oldId = this.internId;
                this.internId = (params['internId'] || GlobalConstant.NUMBER_NOTHING);
                if (this.internId != GlobalConstant.NUMBER_NOTHING && oldId != this.internId) {
                    this.load();
                }
            });
    }

    ngOnDestroy() {
        this.internIdSub.unsubscribe();
    }

    private load() {
        this.internService.getDetails(this.internId)
            .then((intern) => this.intern=intern)
            .catch((error) => this.handleError(error));
    }

    private handleError(error: string) {
        this.messageService.error(error);
    }
    
    private adjustExpiry(isExtension: boolean) {
        this.adjustExpirtyRequest.InternId = this.internId;
        this.adjustExpirtyRequest.IsExtension = isExtension;
        this.internService.adjustExpiry(this.adjustExpirtyRequest)
            .then((expiry) => this.intern.ExpiryAt=expiry)
            .catch((error) => this.handleError(error));
    }

}