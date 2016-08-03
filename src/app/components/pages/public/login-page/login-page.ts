import {Component} from "@angular/core";

@Component({
    selector: 'login-page',
    directives: [],
    providers: [],
    templateUrl: './app/components/pages/public/login-page/login-page.html',
})

export class Login {
    constructor() {}

    doLogin(event, username, password) {
        console.log('Login');
    }

}
