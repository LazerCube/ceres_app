import { Component, OnInit } from '@angular/core';
import { Router, RouteParams } from '@angular/router-deprecated';

import { UserService, User } from '../../../../services/user.service';

@Component({
    selector: 'User-Profile',
    templateUrl: './app/components/pages/protected/user-page/user-page.html',
})
export class UserProfile implements OnInit {
    user: User[];
    error: any;
    constructor(
        private _userService: UserService,
        private _routeParams: RouteParams) {
}

    ngOnInit() {
        if (this._routeParams.get('id') !== null) {
            let id = + this._routeParams.get('id');
            this._userService.getUser(id)
            .subscribe(
                data => this.user = data
            );
        } else {
            this._userService.getSelf()
            .subscribe(
                data => this.user = data
            );
        }
    }

}
