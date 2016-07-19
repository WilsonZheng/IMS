import { Component } from '@angular/core';
import { NgForm }    from '@angular/forms';
import { Hero }    from './hero';

@Component({
    selector: 'hero-form',
    templateUrl: '/app/ngsample/forms/hero-form.component.html'
})
export class HeroFormComponent {
    powers = ['Really Smart', 'Super Flexible',
        'Super Hot', 'Weather Changer'];
    model = new Hero(18, 'Dr IQ', this.powers[1], 'Chuck Overstreet');

    submitted = false;
    active = true;

    onSubmit() {
        this.submitted = true;
       
    }

    // TODO: Remove this when we're done
    get diagnostic() { return JSON.stringify(this.model); }

    newHero() {
        this.model = new Hero(42, '', '');
        this.active = false;
        setTimeout(() => this.active = true, 0);
    }
}