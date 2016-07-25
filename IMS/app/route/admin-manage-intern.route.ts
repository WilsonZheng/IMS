import { RouterConfig }  from '@angular/router';
import { ManageInternComponent } from '../admin/manage-intern.component';
import { InternCommentComponent } from '../admin/intern-comment.component';
import { InternTaskComponent } from '../admin/intern-task.component';
import { InternSupervisorComponent } from '../admin/intern-supervisor.component';
import { InternDetailComponent } from '../admin/intern-detail.component';

export const adminManageInternRoutes: RouterConfig = [
    {
        path: 'intern',
        component: ManageInternComponent,
        children: [
            {
                path: 'Detail',
                component: InternDetailComponent
            },
            {
                path: 'Comment',
                component: InternCommentComponent
            },
            {
                path: 'Task',
                component: InternTaskComponent
            },
            {
                path: 'Supervisor',
                component: InternSupervisorComponent
            }
        ]
    }
];