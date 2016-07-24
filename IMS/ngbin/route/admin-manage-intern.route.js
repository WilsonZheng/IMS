"use strict";
var manage_intern_component_1 = require('../admin/manage-intern.component');
var intern_comment_component_1 = require('../admin/intern-comment.component');
var intern_task_component_1 = require('../admin/intern-task.component');
var intern_supervisor_component_1 = require('../admin/intern-supervisor.component');
//   admin/intern
//   admin/intern/Details
//   admin/intern/Task
//   admin/intern/Supervisor
exports.adminManageInternRoutes = [
    {
        path: 'intern',
        component: manage_intern_component_1.ManageInternComponent,
        children: [
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
            }
        ]
    }
];
//# sourceMappingURL=admin-manage-intern.route.js.map