# IMS
Internal Internship Management System


Set up Angular js environment:

1.download node js

2.create a new folder

3.create a new txt file in the new folder and copy the following into it, then save as package.json:

{
  "name": "angular2-quickstart",
  "version": "1.0.0",
  "scripts": {
    "start": "npm run lite",
    "lite": "lite-server"
  },
  "license": "ISC",
  "dependencies": {
    "@angular/common": "2.0.0-rc.4",
    "@angular/compiler": "2.0.0-rc.4",
    "@angular/core": "2.0.0-rc.4",
    "@angular/forms": "0.2.0",
    "@angular/http": "2.0.0-rc.4",
    "@angular/platform-browser": "2.0.0-rc.4",
    "@angular/platform-browser-dynamic": "2.0.0-rc.4",
    "@angular/router": "3.0.0-beta.1",
    "@angular/router-deprecated": "2.0.0-rc.2",
    "@angular/upgrade": "2.0.0-rc.4",

    "core-js": "^2.4.0",
    "reflect-metadata": "0.1.3",
    "rxjs": "5.0.0-beta.6",
    "zone.js": "0.6.12",

    "angular2-in-memory-web-api": "0.0.14",
    "bootstrap": "^3.3.6"
  },
  "devDependencies": {
    "concurrently": "^2.0.0",
    "lite-server": "^2.2.0"
  }
}


4. in the new folder, press shift and right click, open window cmd and input: npm install


5. copy the node_modules into project files


6. download typescript by go to nuget and search typescript(shown typescript 1.8.4 for visual studio2015) and then install it

7. in nuget install node js tool and restart
	
8. http://jameschambers.com/2015/09/upgrading-npm-in-visual-studio-2015/

9. typescript 1.8.6 will work but 1.8.4 does not (after install restart windows)
