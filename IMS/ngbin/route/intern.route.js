"use strict";
var intern_main_component_1 = require('../main/intern-main.component');
var intern_manage_task_route_1 = require('./intern-manage-task.route');
exports.internRoutes = [
    {
        path: 'intern',
        component: intern_main_component_1.InternMainComponent,
        children: [
            {
                path: '',
                redirectTo: 'task/report'
            }
        ].concat(intern_manage_task_route_1.internManageTaskRoutes)
    }
];
//# sourceMappingURL=intern.route.js.map