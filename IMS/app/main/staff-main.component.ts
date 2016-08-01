import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { ROUTER_DIRECTIVES, Router, ActivatedRoute }    from '@angular/router';
import {RestResult} from '../shared/rest-result';
import { Menubar, MenuItem } from 'primeng/primeng';


@Component({
    templateUrl: '/app/main/staff-main.component.html',
    styles: [`
            .ims-body-container{
                margin-top:4px;
            }
            .ims-body-container .panel-body{
                padding:2px;
            }
    `],
    directives: [ROUTER_DIRECTIVES, Menubar ],
    providers: []
})
export class StaffMainComponent implements OnInit {
    private menuItems: MenuItem[];
    private title: string = 'Dashboard';
    constructor(private router: Router, private route: ActivatedRoute) {

    }
    
    ngOnInit() {
        this.menuItems = [
            {
                label: 'Dashboard',
                command: (event) => {
                    this.router.navigate(['.'], { queryParams: {}, relativeTo: this.route }); this.title = 'Dashboard';
                }
            },
            {
                label: 'Manage Intern',
                items: [
                    { label: "Task", command: (event) => { this.router.navigate(['./intern/Task'], { relativeTo: this.route }); this.title = "Manage Intern > Task" } },
                    { label: "Comment", command: (event) => { this.router.navigate(['./intern/Comment'], { relativeTo: this.route }); this.title = "Manage Intern > Comment" } }
                ]
            }
        ];
    }
}