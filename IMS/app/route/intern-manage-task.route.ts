import { RouterConfig }  from '@angular/router';
import { TaskReportComponent } from '../shared/task-report.component';
import { ManageTaskComponent } from '../intern/manage-task.component';

export const internManageTaskRoutes: RouterConfig = [
    {
        path: 'task',
        component: ManageTaskComponent,
        children: [
            {
                path: 'report',
                component: TaskReportComponent
            }
        ]
    }
];