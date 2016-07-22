import { RouterConfig }  from '@angular/router';
import { NoticeMainComponent } from '../invitation/notice-main.component';
import { InternListComponent } from '../admin/intern-list.component';
import { AdminMainComponent } from '../main/admin-main.component';

export const adminRoutes: RouterConfig = [
    {
        path: 'admin',
        component: AdminMainComponent,
        children: [
            {
                path: '',
                component: NoticeMainComponent
            },
            {
                path: 'intern',
                component: InternListComponent
            }
        ]
    }
];