import { RouterConfig }  from '@angular/router';
import { NoticeMainComponent } from '../invitation/notice-main.component';
import { AdminMainComponent } from '../main/admin-main.component';

//sub route.
import { adminManageInternRoutes } from './admin-manage-intern.route';


//   admin
export const adminRoutes: RouterConfig = [
    {
        path: 'admin',
        component: AdminMainComponent,
        children: [
            {
                path: '',
                component: NoticeMainComponent
            },
            ...adminManageInternRoutes
        ]
    }
];