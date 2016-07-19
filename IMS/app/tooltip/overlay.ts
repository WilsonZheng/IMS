import {ElementRef} from '@angular/core';
export class Overlay {
    attach(el: ElementRef) {

    }
    open(el: ElementRef, tooltip: string) {
        
        console.log("mouseenter=>tooltip=" + tooltip);
    }
    close() {
        console.log("mouseleave");
    }
}