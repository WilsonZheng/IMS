import {bootstrap} from '@angular/platform-browser-dynamic';
import {AppComponent} from './app';
import {disableDeprecatedForms, provideForms} from '@angular/forms';
bootstrap(AppComponent, [disableDeprecatedForms(), provideForms()]).catch((err:any)=> console.error(err));