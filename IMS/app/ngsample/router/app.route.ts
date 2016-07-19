import { provideRouter, RouterConfig } from '@angular/router';

import {CrisisCenterComponent, HeroDetailComponent, HeroListComponent, HomeComponent} from './index'; 

export const routes: RouterConfig = [
    { path: '/', component: HomeComponent },
    { path: 'crisis-center', component: CrisisCenterComponent },
    { path: 'heroes', component: HeroListComponent },
    { path: 'hero/:id', component: HeroDetailComponent }
];

export const APP_ROUTER_PROVIDERS = [
    provideRouter(routes)
];