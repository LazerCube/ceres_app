import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, CanActivate } from '@angular/router-deprecated';

import { AuthService, authenticated } from '../../../../services/auth.service';

@Component({
    selector: 'Home-Page',
    directives: [RouterLink],
    providers: [],
    templateUrl: './app/components/pages/protected/home-page/home-page.html',
})

@CanActivate(() => authenticated())

export class HomePage implements OnInit {
    constructor(private authService: AuthService, private router: Router) { }

    getInformation() {
        this.authService.get("http://localhost:8000/me/")
            .subscribe(
                data => console.log(data.json()),
                err => console.log(err.text()),
                () => console.log('Request Complete')
            );
    }

    logout() {
        localStorage.removeItem("id_token");
        this.router.parent.navigateByUrl('/');
    }

    ngOnInit() {
        this.getInformation();
    }
}
