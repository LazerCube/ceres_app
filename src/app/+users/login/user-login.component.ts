import { Component } from "@angular/core";
import { LoginForm } from './'

@Component({
    selector: 'login-page',
    directives: [LoginForm],
    templateUrl: 'user-login.component.html',
})

export class LoginPage {
}
