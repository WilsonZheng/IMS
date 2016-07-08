import {Component, ElementRef, HostListener, Directive, Input} from '@angular/core';
import {Overlay} from './overlay'
@Directive({
    selector: '[saTooltip]'
})
export class Tooltip {
    @Input()
    saTooltip: string;

    constructor(private el: ElementRef, private overlay: Overlay) {
        this.overlay.attach(el.nativeElement);
    }
     
    @HostListener("mouseenter")
    onmouseenter() {
        this.overlay.open(this.el, this.saTooltip);
    }
    @HostListener("mouseleave")
    onmouseleave() {
        this.overlay.close();
    }
}