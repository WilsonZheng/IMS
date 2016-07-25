import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { ROUTER_DIRECTIVES, Router }    from '@angular/router';
import {RestResult} from '../shared/rest-result';
import { Menubar, MenuItem, Breadcrumb } from 'primeng/primeng';


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
    directives: [ROUTER_DIRECTIVES, Menubar, Breadcrumb],
    providers:[]
})
export class AdminMainComponent implements OnInit {
    private menuItems: MenuItem[];
    private title: string = 'Manage Notice';
    constructor(private router:Router) {
       
    }

   



    ngOnInit(){
        this.menuItems = [
            {
                label: 'Manage Notice',
                command: (event) => {
                    this.router.navigate(['/admin'], { queryParams: { } }); this.title = 'Manage Notice';
                }
            },
            {
                label: 'Manage Intern',
                items: [
                    { label: "Detail", command: (event) => { this.router.navigate(['/admin/intern/Detail']); this.title = "Admin > Manage Intern > Detail" } },
                    { label: "Supervisor"       ,command: (event) => { this.router.navigate(['/admin/intern/Supervisor']); this.title = "Admin > Manage Intern > Supervisors" } },
                    { label: "Task", command: (event) => { this.router.navigate(['/admin/intern/Task']); this.title = "Admin > Manage Intern > Task" } },
                    { label: "Comment", command: (event) => { this.router.navigate(['/admin/intern/Comment']); this.title = "Admin > Manage Intern > Comment" } }
                ]
               
            }
        ];

    }
}