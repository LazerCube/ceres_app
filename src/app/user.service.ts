import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { User } from './user';

@Injectable()
export class UserService {

    private userUrl = 'http://192.168.2.48:8001/me/';


    constructor(private http: Http) { }

    getSelf(): Promise<User[]> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let authToken = localStorage.getItem('token');
        headers.append('Authorization', `Bearer ${ authToken }`);
        return this.http.get(this.userUrl, { headers })
                .toPromise()
                .then(response => response.json().data)
                .catch(this.handleError);
    }

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

    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
