(function (global) {

    // map tells the System loader where to look for things
    var map = {
        'app': 'app', // 'dist',
        'rxjs': 'lib/rxjs',
        '@angular': 'lib/@angular',

        '+users': 'app/+users',
        'shared': 'app/shared',

    };

    // packages tells the System loader how to load when no filename and/or no extension
    var packages = {
        'app': {main: 'app.component.js', defaultExtension: 'js'},
        'rxjs': {defaultExtension: 'js'},
    };

    var packageNames = [
        '@angular/common',
        '@angular/compiler',
        '@angular/core',
        '@angular/http',
        '@angular/platform-browser',
        '@angular/platform-browser-dynamic',
        '@angular/router',
        '@angular/router-deprecated',
        '@angular/testing',
        '@angular/upgrade',

        '+users',
        '+users/shared',
        '+users/user-profile',
        '+users/login',
        '+users/register',

        'shared',
        'shared/nav',
        'shared/sidebar',
    ];

    // add package entries for angular packages in the form '@angular/common': { main: 'index.js', defaultExtension: 'js' }

    packageNames.forEach(function (pkgName) {
        packages[pkgName] = {main: 'index.js', defaultExtension: 'js'};
    });

    var config = {
        map: map,
        packages: packages
    };

    // filterSystemConfig - index.html's chance to modify config before we register it.
    if (global.filterSystemConfig) {
        global.filterSystemConfig(config);
    }

    System.config(config);

})(this);
