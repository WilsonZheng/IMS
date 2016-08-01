import {bootstrap} from '@angular/platform-browser-dynamic';

import { appRouterProviders } from '../route/app.route';
import { AppComponent } from './app.component';
import { disableDeprecatedForms, provideForms } from '@angular/forms';
import { enableProdMode } from '@angular/core';
import { UserInformationService } from '../shared/user-information.service';
enableProdMode();
bootstrap(AppComponent, [disableDeprecatedForms(), provideForms(), appRouterProviders, UserInformationService])
    .catch((err: any) => console.error(err));