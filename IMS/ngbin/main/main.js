"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var app_route_1 = require('../route/app.route');
var app_component_1 = require('./app.component');
var forms_1 = require('@angular/forms');
var core_1 = require('@angular/core');
core_1.enableProdMode();
platform_browser_dynamic_1.bootstrap(app_component_1.AppComponent, [forms_1.disableDeprecatedForms(), forms_1.provideForms(), app_route_1.appRouterProviders])
    .catch(function (err) { return console.error(err); });
//# sourceMappingURL=main.js.map