import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router-deprecated';

import { UserService, UserModel } from './shared';
import { DerpPipe } from '../shared';

@Component({
    selector: 'user-component',
    templateUrl: './app/components/user/user.component.html',
    pipes: [DerpPipe]
})
export class UsersComponent implements OnInit {
    users:  UserModel[];
    selectedUser:  UserModel;
    addingUser = false;
    error: any;

    constructor(
        private _router: Router,
        private _userService: UserService) { }

    getUsers() {
        this._userService
            .getSelf()
            .subscribe(
                data => {
                    this.users = data,
                    console.log(this.users);
                }
            );
    }

    addUser() {
        this.addingUser = true;
        this.selectedUser = null;
    }

    close(savedUser: UserModel) {
        this.addingUser = false;
        if (savedUser) {
            this.getUsers();
        }
    }

    onSelect(user: UserModel) {
        this.selectedUser = user;
        this.addingUser = false;
    }

    ngOnInit() {
        this.getUsers();
    }

}
