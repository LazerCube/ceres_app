import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router-deprecated';
import { DerpPipe } from '../../pipes/derp.pipe';

import { UserService, User } from '../../services/user.service';

@Component({
    selector: 'user-component',
    templateUrl: './app/components/user/user.component.html',
    pipes: [DerpPipe]
})
export class UsersComponent implements OnInit {
    users: User[];
    selectedUser: User;
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

    close(savedUser: User) {
        this.addingUser = false;
        if (savedUser) {
            this.getUsers();
        }
    }

    onSelect(user: User) {
        this.selectedUser = user;
        this.addingUser = false;
    }

    ngOnInit() {
        this.getUsers();
    }

}
