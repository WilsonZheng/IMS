import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { ROUTER_DIRECTIVES, Router, ActivatedRoute }    from '@angular/router';
import {RestResult} from '../shared/rest-result';
import { Menubar, MenuItem } from 'primeng/primeng';
import { UserInformationService } from '../shared/user-information.service';

@Component({
    templateUrl: '/app/main/intern-main.component.html',
    styles: [`
            .ims-body-container{
                margin-top:4px;
            }
            .ims-body-container .panel-body{
                padding:2px;
            }
    `],
    directives: [ROUTER_DIRECTIVES, Menubar],
    providers: [UserInformationService]
})
export class InternMainComponent implements OnInit {
    private menuItems: MenuItem[];
    private title: string = ' ';
    private internId: number;
    constructor(private router: Router,
        private route: ActivatedRoute,
        private userInformationService: UserInformationService) {

    }

    ngOnInit() {
        //Add internId as part of global queryParams.
        this.userInformationService.fetchUser().then((user) => {

            this.internId = user.Id;
            this.router.navigate([], { relativeTo: this.route, queryParams: { internId: user.Id } });
        });
       
        this.menuItems = [
            //{
            //    label: 'Dashboard',
            //    command: (event) => {
            //        this.router.navigate(['.'], { queryParams: {}, relativeTo: this.route }); this.title = 'Dashboard';
            //    }
            //},
            {
                label: 'Task',
                items: [
                    {
                        label: "Report", command: (event) => {
                            this.router.navigate(['./task/report'], {
                                queryParams: { internId: this.internId },
                                relativeTo: this.route
                            }); this.title = "Task > Report"
                        }
                    }
                ]
            }
        ];
    }
}