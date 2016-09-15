import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, CanActivate } from '@angular/router-deprecated';

import { UserService, UserModel } from '../shared';
import { UsersComponent } from '../';

@Component({
    selector: 'user-profile',
    directives: [RouterLink, UsersComponent, UserProfile],
    providers: [UserService],
    templateUrl: 'user-profile.component.html',
})

export class UserProfile implements OnInit {
    user: UserModel[];
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
