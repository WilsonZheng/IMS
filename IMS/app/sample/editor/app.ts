import {Component, Injectable} from '@angular/core';
import {InputText, Editor, Header} from 'primeng/primeng';
import { MyMessage} from './message.comp';
import {MyLogger} from './mylogger.svc';
@Component({
    selector: 'my-app',
    template:
    `
        <input type="text" pInputText [(ngModel)]="Address"/>
        <p-editor [(ngModel)]="Address" [style]="{'height':'320px'}"></p-editor>
        <p>
            <my-message></my-message>
        </p>
    `,
    directives: [MyMessage, InputText, Editor, Header],
    providers: [MyLogger]
})
@Injectable()
export class AppComponent {
    Address = "aaaaaaaaaaaaaaaaaaaaaaaaaaGod!";
}