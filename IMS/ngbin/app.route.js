"use strict";
var router_1 = require('@angular/router');
var notice_main_component_1 = require('./invitation/notice-main.component');
var routes = [
    {
        path: '',
        redirectTo: '/notice'
    },
    {
        path: 'notice',
        component: notice_main_component_1.NoticeMainComponent
    }
];
exports.appRouterProviders = [
    router_1.provideRouter(routes)
];
//# sourceMappingURL=app.route.js.map