import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { DataTable, Column, Header, Button, Menu, MenuItem, Tooltip, DataList } from 'primeng/primeng';
import { Subscription } from 'rxjs/Subscription';
import { MessageService } from '../shared/message.service';
import {RestResult} from '../shared/rest-result';

@Component({
    templateUrl: '/app/admin/intern-list.component.html',
    styles: [``],
    directives: [DataTable, Column, Button, Header, Menu
        , Tooltip, DataList],
    providers: []
})
export class InternListComponent implements OnInit {
    private confirmSubscription: Subscription;
    constructor(private messageService: MessageService)
    { }
    ngOnInit() {
        
    }






}