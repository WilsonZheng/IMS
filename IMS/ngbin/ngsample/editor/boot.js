"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var app_1 = require('./app');
var forms_1 = require('@angular/forms');
platform_browser_dynamic_1.bootstrap(app_1.AppComponent, [forms_1.disableDeprecatedForms(), forms_1.provideForms()]).catch(function (err) { return console.error(err); });
//# sourceMappingURL=boot.js.map