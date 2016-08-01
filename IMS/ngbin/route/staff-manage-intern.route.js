"use strict";
var manage_intern_component_1 = require('../admin/manage-intern.component');
var intern_comment_component_1 = require('../admin/intern-comment.component');
var intern_task_component_1 = require('../admin/intern-task.component');
exports.staffManageInternRoutes = [
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
            }
        ]
    }
];
//# sourceMappingURL=staff-manage-intern.route.js.map