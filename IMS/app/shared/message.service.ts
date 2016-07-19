import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/subject';
import { GlobalMessage } from './global-message';

@Injectable()
export class MessageService {

    ///Confirmation Modal area.
    private confirmSource = new Subject<number>();
    result = this.confirmSource.asObservable();
    private requestSource = new Subject<number>();
    request$ = this.requestSource.asObservable();

    //Announce the user's choice. (0:No, 1:Yes)
    announceResult(result: number) {
        this.confirmSource.next(result);
    }
    
    //Send request to open up Confirmation Dialog.
    request() {
        this.requestSource.next(1);
    }
    
    //Inform or Alert Modal Area.
    private requestInformSource = new Subject<GlobalMessage>();
    requestInform$ = this.requestInformSource.asObservable();
    //Send message to open up Information Dialog.
    requestInform(message: string) {
        this.info(message);
    }
    error(message:string) {
        this.requestInformSource.next(new GlobalMessage("error","error",message));
    }
    info(message: string) {
        this.requestInformSource.next(new GlobalMessage("info", "info", message));
    }
    warn(message: string) {
        this.requestInformSource.next(new GlobalMessage("warn", "warn", message));
    }
}