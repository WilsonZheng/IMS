/// <reference path="../../node_modules/rxjs/add/operator/toPromise.d.ts" />
import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserInformationService } from '../shared/user-information.service';
import { MessageService } from '../shared/message.service';

import { User } from '../shared/user';
import { RoleName } from '../shared/role-name';

//Based upon the user's role, display the corresponding starting page.
@Component({
    template: '',
    providers: [UserInformationService]
})

export class DefaultMainComponent {
     constructor(private userInformationService: UserInformationService
        , private messageService: MessageService
        , private router: Router) {
    }
    
    ngAfterViewInit() {
        //Direct user based on their given role.
        this.userInformationService.fetchUser().then((user) => {
            let route:string = '';
            if (user.hasRole(RoleName.ADMIN)) {
                route = "/admin";
            }
            else if (user.hasRole(RoleName.STAFF)) {
                route = "/staff";
            }
            else if (user.hasRole(RoleName.INTERN)) {
                route = "/intern";
            }
            this.router.navigate([route]);
        })
            .catch((error) => { this.handleError(error); });
    }

    private handleError(error: string) {
        this.messageService.error(error);
    }    
   
}