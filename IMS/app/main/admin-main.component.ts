import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { ROUTER_DIRECTIVES, Router, ActivatedRoute }    from '@angular/router';
import {RestResult} from '../shared/rest-result';
import { Menubar, MenuItem } from 'primeng/primeng';
import { GlobalConstant } from '../shared/global-constant';

@Component({
    templateUrl: '/app/main/admin-main.component.html',
    styles: [`
            .ims-body-container{
                margin-top:4px;
            }
            .ims-body-container .panel-body{
                padding:2px;
            }
    `],
    directives: [ROUTER_DIRECTIVES, Menubar ],
    providers:[]
})
export class AdminMainComponent implements OnInit {
    private menuItems: MenuItem[];
    private title: string = 'Manage Intern > Task';
    constructor(private router: Router, private route: ActivatedRoute) {
       
    }
    
    ngOnInit(){
        this.menuItems = [
            //{
            //    label: 'Dashboard',
            //    command: (event) => {
            //        this.router.navigate(['.'], { queryParams: {}, relativeTo: this.route }); this.title = 'Dashboard';
            //    }
            //},
            {
                label: 'Manage Account',
                command: (event) => {
                    this.router.navigate(['account'], { queryParams: {}, relativeTo: this.route }); this.title = 'Manage Account';
                }
            },
            {
                label: 'Manage Notice',
                command: (event) => {
                    this.router.navigate(['notice/invitation'], { queryParams: {}, relativeTo: this.route }); this.title = 'Manage Notice';
                }
            },
            {
                label: 'Manage Intern',
                items: [
                    { label: "Detail", command: (event) => { this.router.navigate(['./intern/Detail'], { relativeTo: this.route }); this.title = "Manage Intern > Detail" } },
                    { label: "Supervisor", command: (event) => { this.router.navigate(['./intern/Supervisor'], { relativeTo: this.route }); this.title = "Manage Intern > Supervisors" } },
                    { label: "Task", command: (event) => { this.router.navigate(['./intern/Task'], { relativeTo: this.route }); this.title = "Manage Intern > Task" } },
                    { label: "Task History", command: (event) => { this.router.navigate(['./intern/TaskHistory'], { relativeTo: this.route }); this.title = "Manage Intern > Task History" } },
                    { label: "Comment", command: (event) => { this.router.navigate(['./intern/Comment'], { relativeTo: this.route }); this.title = "Manage Intern > Comment" } }
                ]
               
            }
        ];

    }
}