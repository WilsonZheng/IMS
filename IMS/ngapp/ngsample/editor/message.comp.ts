import {Component, Injectable} from '@angular/core';
import {MyLogger} from './mylogger.svc'
@Component({
    selector: 'my-message',
    template:
    `  Here is a message for you{{text}}.
    `
})
@Injectable()
export class MyMessage{
    public text: string;
    constructor(loger: MyLogger) {
        this.text = loger.name;
    }
}