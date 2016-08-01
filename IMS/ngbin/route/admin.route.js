"use strict";
var notice_main_component_1 = require('../invitation/notice-main.component');
var admin_main_component_1 = require('../main/admin-main.component');
var admin_dashboard_component_1 = require('../admin/admin-dashboard.component');
//sub route.
var admin_manage_intern_route_1 = require('./admin-manage-intern.route');
//   admin
exports.adminRoutes = [
    {
        path: 'admin',
        component: admin_main_component_1.AdminMainComponent,
        children: [
            {
                path: '',
                component: admin_dashboard_component_1.AdminDashboardComponent
            },
            {
                path: 'notice',
                component: notice_main_component_1.NoticeMainComponent
            }
        ].concat(admin_manage_intern_route_1.adminManageInternRoutes)
    }
];
//# sourceMappingURL=admin.route.js.map