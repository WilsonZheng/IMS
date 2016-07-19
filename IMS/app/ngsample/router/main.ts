import {bootstrap} from '@angular/platform-browser-dynamic';
import {AppComponent} from './app';
import {disableDeprecatedForms, provideForms} from '@angular/forms';
import { APP_ROUTER_PROVIDERS } from './app.route';
bootstrap(AppComponent, [   disableDeprecatedForms()
                        ,   provideForms()
                        ,   APP_ROUTER_PROVIDERS]).catch((err: any) => console.error(err));