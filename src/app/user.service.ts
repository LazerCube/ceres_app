import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { User } from './user';

@Injectable()
export class UserService {
    constructor(private http: Http) { }

    getMe() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let authToken = localStorage.getItem('token');
        headers.append('Authorization', `Bearer ${authToken}`);
        return Promise.resolve(
            this.http.get('http://192.168.2.48:8001/me/', { headers })
            .subscribe(
                response => {
                    console.log(response.json());
                },
                error => {
                    console.log(error.text());
                }
            )
        );
    }
}
