import { Component } from "@angular/core";
import { RegistrationForm } from './';

@Component({
    selector: 'register-page',
    directives: [RegistrationForm],
    templateUrl: 'app/+users/register/user-register.component.html',
})

export class RegisterPage {
}
