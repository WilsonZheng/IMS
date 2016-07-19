import { Component, Injectable, OnInit, OnDestroy } from '@angular/core';
import { ROUTER_DIRECTIVES, provideRouter, RouterConfig } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { HTTP_PROVIDERS } from '@angular/http';
import { Subscription } from 'rxjs/Subscription';

import { Dialog, Header, Footer, Button, Growl, Message } from 'primeng/primeng';

import { NoticeMainComponent } from './notice-main.component';
import { TemplateService } from './shared/template.service';
import { MessageService } from '../shared/message.service';
import { GlobalMessage } from '../shared/global-message';

@Component({
    selector: 'inv-app',
    templateUrl: '/app/invitation/app.component.html',
    directives: [NoticeMainComponent, Dialog, Footer, Header, Button, Growl, ROUTER_DIRECTIVES ],
    providers: [TemplateService, HTTP_PROVIDERS, MessageService ]
})
export class AppComponent {
    //Global Confirm modal
    confirmModal: boolean = false;
    subscriptionConfirm: Subscription;
    confirm(result: number) {
        this.confirmModal = false;
        this.messageService.announceResult(result);
    }
    
    //Global Message(Growl)
    msgs: Message[] = [];
    //Subscription to receive a message request.
    subscriptionInform: Subscription;

    constructor(private messageService: MessageService) {

    }

    ngOnInit() {
        this.subscriptionConfirm=
            this.messageService.request$.subscribe((request) => {
            this.confirmModal = true;
            });

        this.subscriptionInform =
            this.messageService.requestInform$.subscribe((request) => {
            this.msgs.push({ severity: request.severity, summary: request.summary, detail: request.detail});
            });
    }
    
    ngOnDestroy() {
        this.subscriptionConfirm.unsubscribe();
        this.subscriptionInform.unsubscribe();
    }
    
}