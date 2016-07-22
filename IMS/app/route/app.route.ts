import { provideRouter, RouterConfig }  from '@angular/router';
import { DefaultMainComponent } from '../main/default-main.component';
import { InternMainComponent } from '../main/intern-main.component';
import { StaffMainComponent } from '../main/staff-main.component';
import { adminRoutes } from './admin.route';
import { staffRoutes } from './staff.route';
import { internRoutes} from './intern.route';
const routes: RouterConfig = [
    ...adminRoutes,
    ...staffRoutes,
    ...internRoutes,
    {
        path: '**',
        component: DefaultMainComponent,
    },
];
export const appRouterProviders = [
    provideRouter(routes)
];