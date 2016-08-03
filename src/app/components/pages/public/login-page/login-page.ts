import { Component } from "@angular/core";
import { Router, RouterLink } from '@angular/router-deprecated';

import { AuthService } from '../../../../services/auth.service';

@Component({
    selector: 'login-page',
    directives: [RouterLink],
    providers: [],
    templateUrl: './app/components/pages/public/login-page/login-page.html',
})

export class Login {
    constructor(private authService: AuthService, private router: Router) {}

    doLogin(event, username, password) {
        event.preventDefault();
        this.authService.login(username, password);
        if (this.authService.authenticated) {
            this.router.parent.navigateByUrl('/dashboard');
        }
        console.log('Failed');
    }
}
