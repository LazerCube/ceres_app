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
    constructor(private authService: AuthService, public router: Router) {}

    login(event, username, password) {
        event.preventDefault();
        this.authService.login(username, password)
            .subscribe(
                 data => {
                     localStorage.setItem("id_token", data.json().access_token);
                 },
                 err => console.log(err.text()),
                 () => {
                     console.log("Authorizated");
                     this.router.parent.navigate(['Home-Page']);
                 }
            );
    }

    signup(event) {
        event.preventDefault();
        this.router.parent.navigateByUrl('/signup');
    }

    // doLogin(event, username, password) {
    //     event.preventDefault();
    //     this.authService.login(username, password, function(router: Router) {
    //         console.log("Authorizated");
    //         this.router.parent.navigate(['Home-Page']);
    //     });
    // }
}
