import { Component } from "@angular/core";
import { Router, RouterLink } from '@angular/router-deprecated';

import { AuthService } from '../../../../services/auth.service';
import { EventsService } from '../../../../services/events.service';

@Component({
    selector: 'login-page',
    directives: [RouterLink],
    providers: [],
    templateUrl: './app/components/pages/public/login-page/login-page.html',
})

export class Login {
    public errorMsg:string = '';

    constructor(
        private authService: AuthService,
        public router: Router,
        private eventsService: EventsService) {}

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
                     this.eventsService.showNavigation.emit(true);
                     this.router.parent.navigate(['Home-Page']);
                 }
            );
    }

    signup(event) {
        event.preventDefault();
        this.router.parent.navigateByUrl('/signup');
    }
}
