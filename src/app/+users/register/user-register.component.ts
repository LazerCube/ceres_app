import { Component } from "@angular/core";
import { RegistrationForm } from './'

@Component({
    selector: 'register-page',
    directives: [RegistrationForm],
    templateUrl: 'user-register.component.html',
})

export class RegisterPage {
}
