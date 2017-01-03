import { Component } from "@angular/core";
import { FormBuilder, Validators } from '@angular/common';
import { Router, RouterLink } from '@angular/router-deprecated';

import {
    AuthService,
    EventsService,
    ValidationService,
} from '../../shared';

@Component({
    selector: 'login-form',
    directives: [RouterLink],
    templateUrl: 'app/+users/login/user-login-form.component.html',
})
export class LoginForm {
    public loginForm: any;

    constructor(
        private _builder: FormBuilder,
        private _authService: AuthService,
        private _router: Router,
        private _eventsService: EventsService) {

        this.loginForm = _builder.group({
            'username': ['', Validators.required],
            'password': ['', Validators.compose([Validators.required, ValidationService.passwordValidator])]
        });
    }

    doLogin(event) {
        if (this.loginForm.dirty && this.loginForm.valid) {
            this._authService.login(this.loginForm.value.username, this.loginForm.value.password)
                .subscribe(
                     data => {
                         localStorage.setItem("id_token", data.json().access_token);
                         console.log("Authorizated");
                         this._eventsService.showNavigation.emit(true);
                         this._router.parent.navigate(['User-Profile']);
                     },
                );
            event.preventDefault();
        }
    }

    signup(event) {
        event.preventDefault();
        this._router.parent.navigateByUrl('/signup');
    }
}
