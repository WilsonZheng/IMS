"use strict";
var manage_intern_component_1 = require('../admin/manage-intern.component');
var intern_comment_component_1 = require('../admin/intern-comment.component');
var intern_task_component_1 = require('../admin/intern-task.component');
var intern_supervisor_component_1 = require('../admin/intern-supervisor.component');
var intern_detail_component_1 = require('../admin/intern-detail.component');
var task_involvement_component_1 = require('../shared/task-involvement.component');
exports.adminManageInternRoutes = [
    {
        path: 'intern',
        component: manage_intern_component_1.ManageInternComponent,
        children: [
            {
                path: 'Detail',
                component: intern_detail_component_1.InternDetailComponent
            },
            {
                path: 'Comment',
                component: intern_comment_component_1.InternCommentComponent
            },
            {
                path: 'Task',
                component: intern_task_component_1.InternTaskComponent
            },
            {
                path: 'Supervisor',
                component: intern_supervisor_component_1.InternSupervisorComponent
            },
            {
                path: 'TaskHistory',
                component: task_involvement_component_1.TaskInvolvementComponent
            }
        ]
    }
];
//# sourceMappingURL=admin-manage-intern.route.js.map