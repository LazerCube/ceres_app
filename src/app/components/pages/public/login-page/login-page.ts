import { Component } from "@angular/core";

import { LoginForm } from '../../../forms/login/login-form';

@Component({
    selector: 'login-page',
    directives: [LoginForm],
    templateUrl: './app/components/pages/public/login-page/login-page.html',
})

export class LoginPage {
}
