"use strict";
var task_report_component_1 = require('../shared/task-report.component');
var manage_task_component_1 = require('../intern/manage-task.component');
exports.internManageTaskRoutes = [
    {
        path: 'task',
        component: manage_task_component_1.ManageTaskComponent,
        children: [
            {
                path: 'report',
                component: task_report_component_1.TaskReportComponent
            }
        ]
    }
];
//# sourceMappingURL=intern-manage-task.route.js.map