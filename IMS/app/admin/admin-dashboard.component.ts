﻿import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { ROUTER_DIRECTIVES, Router }    from '@angular/router';

@Component({
    templateUrl: '/app/admin/admin-dashboard.component.html',
    styles: [`
            .ims-body-container{
                margin-top:4px;
            }
            .ims-body-container .panel-body{
                padding:2px;
            }
    `],
    directives: [],
    providers: []
})
export class AdminDashboardComponent implements OnInit {

    constructor(private router: Router) {

    }

    ngOnInit() {

    }
}