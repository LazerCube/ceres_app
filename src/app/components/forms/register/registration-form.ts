import { Component } from "@angular/core";
import { FormBuilder, Validators } from '@angular/common';
import { Router, RouterLink } from '@angular/router-deprecated';

import { UserService, User } from '../../../services/user.service';
import { EventsService } from '../../../services/events.service';
import { ValidationService } from '../../../services/validation.service';

@Component({
    selector: 'registration-form',
    directives: [RouterLink],
    templateUrl: './app/components/forms/register/registration-form.html',
})
export class RegistrationForm {
    private _user: User;
    private res: any;
    public registrationForm: any;

    constructor(
        private _builder: FormBuilder,
        private _userService: UserService,
        private _router: Router,
        private _eventsService: EventsService) {

        this.registrationForm = _builder.group({
            'username': ['', Validators.required],
            'email': ['', Validators.required],
            'first_name': ['', Validators.required],
            'last_name': ['', Validators.required],
            'password': ['', Validators.compose([Validators.required, ValidationService.passwordValidator])],
            'confirm_password': ['', Validators.compose([Validators.required])],
        });
    }

    doRegister(event) {
        if (this.registrationForm.dirty && this.registrationForm.valid) {
            console.log(this.registrationForm.value);
            event.preventDefault();
            this._userService
                .save(this.registrationForm.value)
                .subscribe(
                    data => this.res = data
                );
        }
    }
}
