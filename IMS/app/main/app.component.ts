import { Component, OnInit, OnDestroy } from '@angular/core';
import { ROUTER_DIRECTIVES, provideRouter, RouterConfig, Router } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { HTTP_PROVIDERS } from '@angular/http';
import { Subscription } from 'rxjs/Subscription';
import { Dialog, Header, Footer, Button, Growl, Message } from 'primeng/primeng';
import { MessageService } from '../shared/message.service';
import { GlobalMessage } from '../shared/global-message';

@Component({
    selector: 'ims-app',
    templateUrl: '/app/main/app.component.html',
    styles: [`
#ims-top-container{
    margin-top:4px;
}
`],
    directives: [Dialog, Footer, Header, Button, Growl, ROUTER_DIRECTIVES],
    providers: [HTTP_PROVIDERS, MessageService]
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
        this.subscriptionConfirm =
            this.messageService.request$.subscribe((request) => {
                this.confirmModal = true;
            });

        this.subscriptionInform =
            this.messageService.requestInform$.subscribe((request) => {
                this.msgs.push({ severity: request.severity, summary: request.summary, detail: request.detail });
            });
    }
       
    
    ngOnDestroy() {
        this.subscriptionConfirm.unsubscribe();
        this.subscriptionInform.unsubscribe();
    }
       
    
}