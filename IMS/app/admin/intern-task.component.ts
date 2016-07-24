import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { ROUTER_DIRECTIVES, Router }    from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { MessageService } from '../shared/message.service';
import { RestResult } from '../shared/rest-result';
import { InternService } from './intern.service';

import { TaskToDo } from './task-to-do';
import { GlobalConstant } from '../shared/global-constant';

import { DataTable, Column, Header, Button} from 'primeng/primeng';
@Component({
    templateUrl: '/app/admin/intern-task.component.html',
    styles: [`
        .ims-body-container{
            margin-bottom:0px;
        }

        .panel-heading{
                position:relative;
        }

        .ims-control-container{
            position:absolute;
            right:4px;
            top:4px;
        }

`],
    directives: [DataTable, Column, Header, Button],
    providers: []
})
export class InternTaskComponent implements OnInit {

    private internIdSub: Subscription;
    private internId: number = GlobalConstant.NUMBER_NOTHING;

    //global queryParams.
    private queryParams: any;

    private tasks: TaskToDo[] = [];


    private get isValid(): boolean {
        return this.internId != GlobalConstant.NUMBER_NOTHING;
    }
    
    constructor(private messageService: MessageService, private internService: InternService, private router: Router)
    { }
    ngOnInit() {
        //fetch all available tasks with its participants information.
        this.internService.getTasks().then((tasks) => this.tasks = tasks).catch((error) => this.handleError(error));
        
        //when selected intern changes, if valid, load a new list of the comments.
        this.internIdSub = this.router.routerState.queryParams
            .subscribe((params) => {
                this.queryParams = params || {};
                this.internId = (params['internId'] || GlobalConstant.NUMBER_NOTHING);
            });
    }

    ngOnDestroy() {
        this.internIdSub.unsubscribe();
    }

    private handleError(error: string) {
        this.messageService.error(error);
    }
}