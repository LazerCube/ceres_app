import { Component } from "@angular/core";
import { Router, RouterLink } from '@angular/router-deprecated';

import { AuthService } from '../../../../services/auth.service';
import { User } from '../../../../services/user.service';

@Component({
    selector: 'Signup',
    directives: [RouterLink],
    providers: [],
    templateUrl: './app/components/pages/public/signup-page/signup-page.html',
})

export class Signup {
    private errorMsg:string = '';

    constructor(private authService: AuthService, public router: Router) {}

    signup() {
        console.log("SEND");
    }

}
