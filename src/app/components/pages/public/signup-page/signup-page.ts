import { Component, OnInit } from "@angular/core";
import { Router, RouterLink } from '@angular/router-deprecated';

import { UserService } from '../../../../services/user.service';
import { User } from '../../../../services/user.service';

@Component({
    selector: 'Signup',
    directives: [RouterLink],
    providers: [],
    templateUrl: './app/components/pages/public/signup-page/signup-page.html',
})

export class Signup implements OnInit {
    public user: User;

    private submitted = false;
    private res: any;
    private errorMsg:string = '';

    constructor(private _router: Router, private _userService: UserService) {}

    ngOnInit() {
        this.user = new User();
    }

    onSubmit() {
        this.submitted = true;
    }

    // TODO: Remove this when we're done
    get diagnostic() {
        return JSON.stringify(this.user);
    }

    signup() {
        this._userService
            .save(this.user)
            .subscribe(
                data => this.res = data
            );
    }

}
