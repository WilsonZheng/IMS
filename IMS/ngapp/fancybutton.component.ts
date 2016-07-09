import {Component, Input, Output, EventEmitter} from '@angular/core';
@Component({
    selector: "fancy-button",
    templateUrl: 'agview/fancybutton.tp.html'
})
export class FancyButton {
    @Input() inputPlaceholder: string;
    @Input() buttonLabel: string;
    @Output() inputText = new EventEmitter<string>();
    emitText(text: string) {
        this.inputText.emit(text);
    }
} 