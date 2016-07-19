import { provideRouter, RouterConfig }  from '@angular/router';
import { NoticeMainComponent } from './invitation/notice-main.component';

const routes: RouterConfig = [
    {
        path: '',
        redirectTo: '/notice'
    },
    {
        path: 'notice',
        component: NoticeMainComponent
    }
];

export const appRouterProviders = [
    provideRouter(routes)
];