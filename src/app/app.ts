import { bootstrap }    from '@angular/platform-browser-dynamic';
import { Component, provide } from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';
import { HTTP_PROVIDERS, Http } from '@angular/http';

import { enableProdMode } from '@angular/core';

import { AuthService, AuthConfig } from './services/auth.service';

import { Navbar } from './components/navbar/navbar';

import { Login } from './components/pages/public/login-page/login-page';
import { HomePage } from './components/pages/protected/home-page/home-page';

// enableProdMode();

@Component({
  selector: 'app',
  templateUrl: './app/app.html',
  directives: [Navbar, ROUTER_DIRECTIVES],
})

@RouteConfig([
    {
        path: '',
        name: 'Login',
        component: Login,
    },
    {
        path: '/home',
        name: 'Home-Page',
        component: HomePage,
    },
])

export class App {
}

bootstrap(App, [
    ROUTER_PROVIDERS,
    HTTP_PROVIDERS,
    provide(AuthService, {
        useFactory: (http) => {
          return new AuthService(new AuthConfig({
              headerName: 'Authorization',
              headerPrefix: 'Bearer',
              clientId: 'AAABBBCCC',
              tokenUrl: 'http://192.168.2.48:8000/token/',
              tokenName: 'id_token',
              userInfoUrl: 'http://192.168.2.48:8000/me/',
              tokenGetter: (localStorage.getItem(this.tokenName)),
              //globalHeaders: [{'Content-Type':'application/json'}],
              noJwtError: true
          }), http);
        },
        deps: [Http]
    })
]);
