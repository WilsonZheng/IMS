import {bootstrap} from '@angular/platform-browser-dynamic';

import { appRouterProviders } from '../app.route';
import { AppComponent } from './app.component';
import { disableDeprecatedForms, provideForms } from '@angular/forms';
import { enableProdMode } from '@angular/core';
enableProdMode();
bootstrap(AppComponent, [disableDeprecatedForms(), provideForms(), appRouterProviders])
    .catch((err: any) => console.error(err));