import { bootstrap }    from '@angular/platform-browser-dynamic';
import { Component, provide } from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';

import { enableProdMode } from '@angular/core';

import { Login } from './components/pages/public/login-page/login-page';

// enableProdMode();

@Component({
  selector: 'app',
  templateUrl: './app/app.html',
  directives: [ROUTER_DIRECTIVES],
  providers: [ROUTER_PROVIDERS],
})

@RouteConfig([
    {
        path: '',
        name: 'Login',
        component: Login,
    },
])

export class App {
    title = 'Ceres app';
}

bootstrap(App);
