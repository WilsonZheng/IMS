"use strict";
var router_1 = require('@angular/router');
var index_1 = require('./index');
exports.routes = [
    { path: '/', component: index_1.HomeComponent },
    { path: 'crisis-center', component: index_1.CrisisCenterComponent },
    { path: 'heroes', component: index_1.HeroListComponent },
    { path: 'hero/:id', component: index_1.HeroDetailComponent }
];
exports.APP_ROUTER_PROVIDERS = [
    router_1.provideRouter(exports.routes)
];
//# sourceMappingURL=app.route.js.map