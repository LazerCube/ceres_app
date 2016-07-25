import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router-deprecated';

import { User } from '../user';
import { UserService } from '../user.service';

@Component({
    selector: 'my-dashboard',
    templateUrl: 'app/dashboard/dashboard.component.html',
    styleUrls: ['app/dashboard/dashboard.component.css'],
})

export class DashboardComponent implements OnInit {
    user: User[];
    error: any;

    constructor(
        private router: Router,
        private userService: UserService ) { }

    getInformation() {
        this.userService
            .getSelf()
            .subscribe(user => this.user = user);
    }

    ngOnInit() {
        this.getInformation();
    }

    logout() {
      localStorage.removeItem('token');
      this.router.parent.navigateByUrl('/login');
    }
}
