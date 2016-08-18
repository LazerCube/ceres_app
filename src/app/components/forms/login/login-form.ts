import { Component } from "@angular/core";
import { ControlGroup, Control, FormBuilder, Validators, FORM_DIRECTIVES } from '@angular/common';
import { Router, RouterLink } from '@angular/router-deprecated';

import { AuthService } from '../../../services/auth.service';
import { EventsService } from '../../../services/events.service';
import { ValidationService } from '../../../services/validation.service';

@Component({
    selector: 'login-form',
    directives: [RouterLink, FORM_DIRECTIVES],
    templateUrl: './app/components/forms/login/login-form.html',
})
export class LoginForm {
    loginForm: ControlGroup;

    username: Control;
    password: Control;

    constructor(
        private _builder: FormBuilder,
        private _authService: AuthService,
        private _router: Router,
        private eventsService: EventsService) {
        this.username = new Control("", Validators.required);
        this.password = new Control("", Validators.compose(
            [Validators.required, ValidationService.passwordValidator])
        );

        this.loginForm = _builder.group({
            username:   this.username,
            password:   this.password
        });
    }

    doLogin(event) {
        if (this.loginForm.dirty && this.loginForm.valid) {
            console.log(this.loginForm.value);
            this._authService.login(this.loginForm.value.username, this.loginForm.value.password)
                .subscribe(
                     data => {
                         localStorage.setItem("id_token", data.json().access_token);
                     },
                     err => console.log(err.text()),
                     () => {
                         console.log("Authorizated");
                         this.eventsService.showNavigation.emit(true);
                         this._router.parent.navigate(['Home-Page']);
                     }
                );
            event.preventDefault();
        }
    }

    signup(event) {
        event.preventDefault();
        this._router.parent.navigateByUrl('/signup');
    }
}
