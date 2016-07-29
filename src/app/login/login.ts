import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router-deprecated';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from '@angular/common';
import { Http, Headers } from '@angular/http';


@Component({
    selector: 'login',
    templateUrl: './app/login/login.html',
    directives: [RouterLink, CORE_DIRECTIVES, FORM_DIRECTIVES]
})

export class Login {
  constructor(public router: Router, public http: Http) {}

  login(event, username, password) {
    event.preventDefault();

    var clientID = 'awesIPrHdeWqvZx4Xb7IKX2JtcuZ2Q4MdISasbCE';
    var data =  "grant_type=password&username="
             +  "&username=" + username
             +  "&password=" + password
             +  "&client_id=" + clientID;

     var headers = new Headers();
     headers.append('Content-Type', 'application/x-www-form-urlencoded');

    this.http.post('http://192.168.2.48:8000/token/', data, {
        headers: headers
    })
    .subscribe(
        response => {
            localStorage.setItem('token', response.json().access_token);
            this.router.parent.navigateByUrl('/dashboard');
        },
        error => {
            console.log(error.text());
        }
    );
  }

  signup(event) {
    event.preventDefault();
    this.router.parent.navigateByUrl('/signup');
  }
}
