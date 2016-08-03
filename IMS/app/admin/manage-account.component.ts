import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { ROUTER_DIRECTIVES, Router, ActivatedRoute }    from '@angular/router';
import { DataTable, Column, Header, Button} from 'primeng/primeng';
import { Subscription } from 'rxjs/Subscription';
import { MessageService } from '../shared/message.service';
import { RestResult } from '../shared/rest-result';
import { GlobalConstant } from '../shared/global-constant';
import { BracketDateTransformPipe } from '../shared/bracket-date-transform.pipe';
import { AccountService } from '../shared/account.service';
import { AccountUser } from '../shared/account-user';

@Component({
    templateUrl: '/app/admin/manage-account.component.html',
    styles: [`
                .panel-heading{
                position:relative;
                }

                .ims-control-container{
                position:absolute;
                right:4px;
                top:4px;
                }

                .panel-body{
                padding:1px;
                }

                .ims-body-container.panel{
                margin-bottom:2px;
                }
               
    `],
    directives: [DataTable, Column, Button, Header, ROUTER_DIRECTIVES],
    providers: [AccountService],
    pipes: [BracketDateTransformPipe]

})
export class ManageAccountComponent implements OnInit {
    private users:AccountUser[] = [];
    
    private headerRows: any[];
        

    private confirmSubscription: Subscription;
    constructor(private messageService: MessageService,
        private router: Router,
        private accountService: AccountService,
        private route: ActivatedRoute)
    { }

    ngOnInit() {
        this.headerRows = [
            {
                columns:[
                    { header: "Name", field: "FullName", filter: true, filterMatchMode: "contains", sortable: true },
                    { header: "Username", field: "UserName", filter: true, filterMatchMode: "contains", sortable: true},
                    { header: "Role" },
                    { header: "Manage" }
                ]
            }
        ];
        this.refresh();
    }
  
    
    ngOnDestroy() {
      
    }


    private handleError(error: string) {
        this.messageService.error(error);
    }
     
    private refresh() {
        this.accountService.getUsers().then((response) => this.users = response)
            .catch((error) => this.handleError(error));
    }

    private resetPassword(user: AccountUser) {
        this.accountService.resetPassword(user.Id).then(() => {
            this.messageService.info("Password has been reset to 111111.");
        })
            .catch((error) => this.handleError(error));
    }

    private release(user: AccountUser) {
        this.accountService.release(user.Id).then(() => {
            user.Locked = false;
            })
            .catch((error) => this.handleError(error));
    }

    private lock(user: AccountUser) {
        this.accountService.lock(user.Id).then(() => {
            user.Locked = true;
        })
            .catch((error) => this.handleError(error));
    }
}