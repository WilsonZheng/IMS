"use strict";
var notice_main_component_1 = require('../invitation/notice-main.component');
var intern_list_component_1 = require('../internmanage/intern-list.component');
var admin_main_component_1 = require('../main/admin-main.component');
exports.adminRoutes = [
    {
        path: 'admin',
        component: admin_main_component_1.AdminMainComponent,
        children: [
            {
                path: '',
                component: notice_main_component_1.NoticeMainComponent
            },
            {
                path: 'intern',
                component: intern_list_component_1.InternListComponent
            }
        ]
    }
];
//# sourceMappingURL=admin.route.js.map