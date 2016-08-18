import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, CanActivate } from '@angular/router-deprecated';

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
    constructor(private _router: Router, private _userService: UserService) { }

    getInformation() {
        this._userService
            .getSelf()
            .subscribe(user => this.user = user);
    }

    ngOnInit() {
        this.getInformation();
    }
}
