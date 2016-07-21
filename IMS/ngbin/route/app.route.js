"use strict";
var router_1 = require('@angular/router');
var default_main_component_1 = require('../main/default-main.component');
var admin_route_1 = require('./admin.route');
var staff_route_1 = require('./staff.route');
var intern_route_1 = require('./intern.route');
var routes = admin_route_1.adminRoutes.concat(staff_route_1.staffRoutes, intern_route_1.internRoutes, [
    {
        path: '**',
        component: default_main_component_1.DefaultMainComponent,
    },
]);
exports.appRouterProviders = [
    router_1.provideRouter(routes)
];
//# sourceMappingURL=app.route.js.map