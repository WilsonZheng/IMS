"use strict";
var staff_main_component_1 = require('../main/staff-main.component');
var staff_manage_intern_route_1 = require('./staff-manage-intern.route');
exports.staffRoutes = [
    {
        path: 'staff',
        component: staff_main_component_1.StaffMainComponent,
        children: [
            {
                path: '',
                redirectTo: 'intern/Task'
            }
        ].concat(staff_manage_intern_route_1.staffManageInternRoutes)
    }
];
//# sourceMappingURL=staff.route.js.map