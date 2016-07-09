import {Component, Input, Output, EventEmitter} from '@angular/core';
@Component({
    selector: "jay-tabcontent",
    templateUrl: 'agview/tabcontent.tp.html'
})
export class TabContent{
    isActive: boolean = false;
}