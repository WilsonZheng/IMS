import { RouterConfig }  from '@angular/router';
import { InternMainComponent } from '../main/intern-main.component';
import { InternDashboardComponent } from '../intern/intern-dashboard.component';
import { internManageTaskRoutes } from './intern-manage-task.route';
export const internRoutes: RouterConfig = [
    {
        path: 'intern',
        component: InternMainComponent,
         children: [
            {
                 path: '',
                 redirectTo:'task/report'
                 //component: InternDashboardComponent
             },
             ...internManageTaskRoutes
         ]
       
    }
];