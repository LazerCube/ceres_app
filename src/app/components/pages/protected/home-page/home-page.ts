import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, CanActivate } from '@angular/router-deprecated';

import { AuthService, authenticated } from '../../../../services/auth.service';

import { UserService, User } from '../../../../services/user.service';

import { UsersComponent } from '../../../user/user.component';
import { UserProfile } from '../user-page/user-page';

@Component({
    selector: 'Home-Page',
    directives: [RouterLink, UsersComponent, UserProfile],
    providers: [UserService],
    templateUrl: './app/components/pages/protected/home-page/home-page.html',
})

export class HomePage implements OnInit {
    user: User[];
    constructor(private authService: AuthService, private router: Router, private userService: UserService) { }

    getInformation() {
        this.userService
            .getSelf()
            .subscribe(user => this.user = user);
    }

    ngOnInit() {
        this.getInformation();
    }
}
