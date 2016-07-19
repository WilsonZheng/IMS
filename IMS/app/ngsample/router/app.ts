import { Component }         from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
@Component({
    selector: 'my-app',
    template: `
              <h1>Component Router</h1>
              <nav>
                <a [routerLink]="['/']">Home</a>
                <a [routerLink]="['/crisis-center']">Crisis Center</a>
                <a [routerLink]="['/heroes']">Heroes</a>
              </nav>
              <router-outlet></router-outlet>
            `,
    directives: [ROUTER_DIRECTIVES]
})
export class AppComponent { }