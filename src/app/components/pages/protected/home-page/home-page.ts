import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, CanActivate } from '@angular/router-deprecated';

import { AuthService, authenticated } from '../../../../services/auth.service';

import { UserService, User } from '../../../../services/user.service';

@Component({
    selector: 'Home-Page',
    directives: [RouterLink],
    providers: [UserService],
    templateUrl: './app/components/pages/protected/home-page/home-page.html',
})

@CanActivate(() => authenticated())

export class HomePage implements OnInit {
    user: User[];
    constructor(private authService: AuthService, private router: Router, private userService: UserService) { }

    getInformation() {
        // this.authService.get("http://localhost:8000/me/")
        //     .subscribe(
        //         data => console.log(data.json()),
        //         err => console.log(err.text()),
        //         () => console.log('Request Complete')
        //     );
        this.userService
            .getSelf()
            .subscribe(user => this.user = user);
    }

    logout() {
        localStorage.removeItem("id_token");
        this.router.parent.navigateByUrl('/');
    }

    ngOnInit() {
        this.getInformation();
    }
}
