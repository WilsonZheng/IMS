"use strict";
var notice_main_component_1 = require('../invitation/notice-main.component');
var admin_main_component_1 = require('./admin-main.component');
exports.adminRoutes = [
    {
        path: 'admin',
        component: admin_main_component_1.AdminMainComponent,
        children: [
            {
                path: '',
                component: notice_main_component_1.NoticeMainComponent
            }
        ]
    }
];
//# sourceMappingURL=admin.route.js.map