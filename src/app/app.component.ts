import {Component} from "@angular/core";
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';

import {LoggedInRouterOutlet} from './LoggedInOutlet';
import { DashboardComponent } from './dashboard/dashboard.components';

import { UserService } from './user.service';
import { Login } from './login/login';

@Component({
    selector: 'my-app',
    templateUrl: './app/app.html',
    directives: [LoggedInRouterOutlet],
    providers: [
        ROUTER_PROVIDERS,
        UserService
    ]
})
@RouteConfig([
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: DashboardComponent,
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
])
export class AppComponent {
    title = 'Ceres app';
}
