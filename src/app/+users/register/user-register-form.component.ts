import { Component } from "@angular/core";
import { FormBuilder, Validators } from '@angular/common';
import { Router, RouterLink } from '@angular/router-deprecated';

import {
    UserService,
    UserModel,
} from '../shared';

import {
    EventsService,
    ValidationService,
} from '../../shared';

@Component({
    selector: 'registration-form',
    directives: [RouterLink],
    templateUrl: 'app/+users/register/user-register-form.component.html',
})
export class RegistrationForm {
    private _user: UserModel;
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
            'matching_password' : _builder.group({
                'password': ['', Validators.compose([Validators.required, ValidationService.passwordValidator])],
                'confirm_password': ['', Validators.required],
            }, { validator: ValidationService.areEqual })
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
