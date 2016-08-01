import { RouterConfig }  from '@angular/router';
import { StaffMainComponent } from '../main/staff-main.component';
import { staffManageInternRoutes } from './staff-manage-intern.route';
import { StaffDashboardComponent } from '../staff/staff-dashboard.component';
export const staffRoutes: RouterConfig = [
    {
        path: 'staff',
        component: StaffMainComponent,
        children: [
            {
                path: '',
                component: StaffDashboardComponent
            },
            ...staffManageInternRoutes
        ]
    }
];