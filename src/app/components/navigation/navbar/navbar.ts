import {Component} from "@angular/core";
import { Router, ROUTER_DIRECTIVES } from '@angular/router-deprecated';

import { AuthService } from '../../../services/auth.service';

@Component({
    selector: 'navbar',
    directives: [ROUTER_DIRECTIVES],
    providers: [],
    templateUrl: './app/components/navigation/navbar/navbar.html',
})

export class Navbar {
    public title = 'Ceres app';

    private showNavBar: boolean = false;

    constructor(private authService:AuthService, public router: Router) {
    }

    logout() {
        localStorage.removeItem("id_token");
        this.router.navigate(['Login']);
    }

}
