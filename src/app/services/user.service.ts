import { Response } from '@angular/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';

import 'rxjs/Rx';

import { AuthService } from './auth.service';

export class User {
    url: string;
    id: number;
    username: string;
    created_at: string;
    updated_at: string;
    first_name: string;
    last_name: string;
}

@Injectable()
export class UserService {
    constructor(private authService: AuthService) { }

    getSelf(): Observable<User[]> {
        return this.authService.get("http://localhost:8000/me/")
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
