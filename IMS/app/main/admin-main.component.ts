import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { ROUTER_DIRECTIVES, Router }    from '@angular/router';
import {RestResult} from '../shared/rest-result';
import { Menubar,MenuItem } from 'primeng/primeng';


@Component({
    templateUrl: '/app/main/admin-main.component.html',
    styles: [`
            .ims-body-container{
                margin-top:4px;
            }
            .ims-body-container .panel-body{
                padding:2px;
            }
            .panel-title{
                font-size:1em;
                font-weight:700;
            }
    `],
    directives: [ROUTER_DIRECTIVES, Menubar],
    providers:[]
})
export class AdminMainComponent implements OnInit {
    private titles: string[] = ["Manage Notice", "Manage Intern"];
    private titleIndex: number = 0;

    private menuItems: MenuItem[];

    constructor(private router:Router) {
       
    }
        
    ngOnInit(){
        this.menuItems = [
            {
                label: this.titles[0],
                command: (event) => {
                    this.router.navigate(['/admin']);
                    this.titleIndex = 0;
                }
            },
            {
                label: this.titles[1],
                command: (event) => {
                    this.router.navigate(['/admin/intern']);
                    this.titleIndex = 1;
                } 
            }
        ];

    }
}