import { RouterConfig }  from '@angular/router';
import { NoticeMainComponent } from '../invitation/notice-main.component';
import { AdminMainComponent } from '../main/admin-main.component';
import { AdminDashboardComponent } from '../admin/admin-dashboard.component';
import { ListInvitationComponent } from '../admin/list-invitation.component';

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
                redirectTo:'intern/Task'
                //component: AdminDashboardComponent
            },
            {
                path: 'notice',
                component: NoticeMainComponent,
                children: [
                    {
                        path:'invitation',
                        component:ListInvitationComponent
                    }
                ]
            },
            ...adminManageInternRoutes
        ]
    }
];