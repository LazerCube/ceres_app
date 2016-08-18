import { Component } from "@angular/core";
import { RegistrationForm } from '../../../forms/register/registration-form';

@Component({
    selector: 'Signup',
    directives: [RegistrationForm],
    templateUrl: './app/components/pages/public/signup-page/signup-page.html',
})
export class Signup {
}
