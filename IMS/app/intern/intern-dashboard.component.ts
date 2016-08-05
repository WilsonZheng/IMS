//Description: Dashboard for a signed in intern.
//Detail Not implemented.

import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { ROUTER_DIRECTIVES, Router }    from '@angular/router';

@Component({
    templateUrl: '/app/intern/intern-dashboard.component.html',
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
export class InternDashboardComponent implements OnInit {

    constructor(private router: Router) {

    }

    ngOnInit() {

    }
}