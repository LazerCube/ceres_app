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
        if (this.authService.login(username, password)) {
            console.log("/dash");
            this.router.parent.navigateByUrl('/dashboard');
        }
    }
}
