import { bootstrap }    from '@angular/platform-browser-dynamic';
import { PLATFORM_DIRECTIVES, Component, provide, OnInit } from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';
import { HTTP_PROVIDERS, Http } from '@angular/http';

import { enableProdMode } from '@angular/core';

import {
    LoginPage,
    RegisterPage,
    UserProfile,
    UserService,
} from './+users';

import {
    AuthConfig,
    EventsService,
    AuthService,
    ValidationService,
    ControlMessagesComponent,
    LoggedInRouterOutlet,
    authenticated,
    Navbar,
    Sidebar,
} from './shared';

// enableProdMode();

@Component({
  selector: 'app',
  templateUrl: 'app/app.component.html',
  directives: [Sidebar, Navbar, LoggedInRouterOutlet],
})

// @RouteConfig([
//     {
//         path: '',
//         name: 'Login',
//         component: LoginPage,
//     },
//     {
//         path: '/signup',
//         name: 'Signup',
//         component: Signup,
//     },
//     {
//         path: '/home',
//         name: 'Home-Page',
//         component: HomePage,
//     },
//     {
//         path: '/profile/:uuid',
//         name: 'User-Profile',
//         component: UserProfile
//     },
// ])
@RouteConfig([
    {
        path: '',
        name: 'Login-Page',
        component: LoginPage,
    },
    {
        path: '/register',
        name: 'Register-Page',
        component: RegisterPage,
    },
    {
        path: '/profile/',
        name: 'User-Profile',
        component: UserProfile
    },
])

export class App implements OnInit {
    private class: string = "";

    constructor(private authService:AuthService, private eventsService: EventsService) {
        this.eventsService.showNavigation.subscribe((mode: boolean) => {
            if (mode) {
                this.class = "col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main";
            } else {
                this.class = "main";
            }
        });
    }

    ngOnInit() {
        this.eventsService.showNavigation.emit(authenticated());
    }
}

bootstrap(App, [
    ROUTER_PROVIDERS,
    HTTP_PROVIDERS,
    EventsService,
    UserService,
    ValidationService,
    provide(PLATFORM_DIRECTIVES, {useValue: (ControlMessagesComponent), multi: true}),
    provide(AuthService, {
        useFactory: (http) => {
          return new AuthService(new AuthConfig({
              headerName: 'Authorization',
              headerPrefix: 'Bearer',
              clientId: 'AAABBBCCC',
              tokenUrl: 'http://192.168.2.48:8000/auth/token/',
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
