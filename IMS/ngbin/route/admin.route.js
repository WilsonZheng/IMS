"use strict";
var notice_main_component_1 = require('../invitation/notice-main.component');
var admin_main_component_1 = require('../main/admin-main.component');
var list_invitation_component_1 = require('../admin/list-invitation.component');
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
                redirectTo: 'intern/Task'
            },
            {
                path: 'notice',
                component: notice_main_component_1.NoticeMainComponent,
                children: [
                    {
                        path: 'invitation',
                        component: list_invitation_component_1.ListInvitationComponent
                    }
                ]
            }
        ].concat(admin_manage_intern_route_1.adminManageInternRoutes)
    }
];
//# sourceMappingURL=admin.route.js.map