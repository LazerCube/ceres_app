import { bootstrap }    from '@angular/platform-browser-dynamic';
import { PLATFORM_DIRECTIVES, Component, provide, OnInit } from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';
import { HTTP_PROVIDERS, Http } from '@angular/http';

import { enableProdMode } from '@angular/core';

import { LoggedInRouterOutlet } from './components/navigation/loggedInOutlet';

import { ControlMessagesComponent } from './components/forms/control-messages.component';

import { AuthService, AuthConfig, authenticated } from './services/auth.service';
import { EventsService } from './services/events.service';
import { UserService } from './services/user.service';
import { ValidationService } from './services/validation.service';

import { Navbar } from './components/navigation/navbar/navbar';
import { Sidebar } from './components/navigation/sidebar/sidebar';

import { LoginPage } from './components/pages/public/login-page/login-page';
import { Signup } from './components/pages/public/signup-page/signup-page';
import { HomePage } from './components/pages/protected/home-page/home-page';
import { UserProfile } from './components/pages/protected/user-page/user-page';

// enableProdMode();

@Component({
  selector: 'app',
  templateUrl: './app/app.html',
  directives: [Navbar, Sidebar, LoggedInRouterOutlet],
})

@RouteConfig([
    {
        path: '',
        name: 'Login',
        component: LoginPage,
    },
    {
        path: '/signup',
        name: 'Signup',
        component: Signup,
    },
    {
        path: '/home',
        name: 'Home-Page',
        component: HomePage,
    },
    {
        path: '/profile/:id',
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
