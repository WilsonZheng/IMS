"use strict";
var router_1 = require('@angular/router');
var default_main_component_1 = require('../main/default-main.component');
var routes = [
    {
        path: '/',
        component: default_main_component_1.DefaultMainComponent
    },
    {
        path: '**',
        redirectTo: '/'
    }
];
exports.appRouterProviders = [
    router_1.provideRouter(routes)
];
//# sourceMappingURL=app.route.js.map