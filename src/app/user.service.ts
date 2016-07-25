import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import 'rxjs/Rx';
import { Observable }       from 'rxjs/Observable';

import { User } from './user';

@Injectable()
export class UserService {

    private userUrl = 'http://192.168.2.48:8001/me/';

    constructor(private http: Http) { }

    getSelf(): Observable<User[]> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let authToken = localStorage.getItem('token');
        headers.append('Authorization', `Bearer ${ authToken }`);
        return this.http.get(this.userUrl, { headers })
                .map(this.extractData)
                .catch(this.handleError);
    }

    private extractData(res: Response) {
        let data = res.json();
        return data;
    }

    private handleError (error: any) {
        let errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
}
