import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router-deprecated';

import { User } from '../user';
import { UserService } from '../user.service';

@Component({
    selector: 'my-dashboard',
    templateUrl: 'app/dashboard/dashboard.component.html',
    styleUrls: ['app/dashboard/dashboard.component.css'],
    providers: [UserService]
})

export class DashboardComponent implements OnInit {
    user: User[];
    error: any;

    constructor(
        public _router: Router,
        private _userService: UserService) { }

    getInformation() {
        this._userService
            .getSelf()
            .then(user => this.user = user)
            .catch(error => this.error = error);
    }

    ngOnInit() {
        this.getInformation();
    }

    logout() {
      localStorage.removeItem('token');
      this._router.parent.navigateByUrl('/login');
    }
}
