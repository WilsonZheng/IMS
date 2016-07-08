import {Component, Input, Output, EventEmitter} from '@angular/core';
@Component({
    selector: "input-box",
    templateUrl: 'agview/textinput.tp.html'
})
export class InputBox {
    @Input() inputPlaceholder: string;
    @Input()buttonLabel: string;
    @Output() inputText = new EventEmitter<string>();
    emitText(text: string) {
        this.inputText.emit(text);
    } 
}