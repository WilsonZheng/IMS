import {Component, Input, Output, EventEmitter} from '@angular/core';
@Component({
    selector: "jay-tabtitle",
    templateUrl: 'agview/tabtitle.tp.html'
})
export class TabTitle {
    tabSelected: EventEmitter<TabTitle> = new EventEmitter<TabTitle>();
    handleClick() {
        this.tabSelected.emit(this);
    }
}