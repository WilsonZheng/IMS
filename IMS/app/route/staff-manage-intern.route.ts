import { RouterConfig }  from '@angular/router';
import { ManageInternComponent } from '../admin/manage-intern.component';
import { InternCommentComponent } from '../admin/intern-comment.component';
import { InternTaskComponent } from '../admin/intern-task.component';

export const staffManageInternRoutes: RouterConfig = [
    {
        path: 'intern',
        component: ManageInternComponent,
        children: [
            {
                path: 'Comment',
                component: InternCommentComponent
            },
            {
                path: 'Task',
                component: InternTaskComponent
            }
        ]
    }
];