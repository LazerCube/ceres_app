import { Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import 'rxjs/Rx';

import { AuthService } from '../../shared';
import { UserModel } from './user.model';

@Injectable()
export class UserService {
    private userUrl = 'http://localhost:8000/accounts/';  // URL to web api

    constructor(private authService: AuthService) { }

    getSelf(): Observable<UserModel[]> {
        return this.authService.get("http://localhost:8000/me/")
            .map(this.extractData)
            .catch(this.handleError);
    }

    getUser(id: string) {
        return this.authService.get(this.userUrl + "" + id + "/")
            .map(this.extractData)
            .catch(this.handleError);
    }

    save(user: UserModel): Observable<UserModel[]> {
        if (user.id) {
            return this.put(user);
        }
        return this.post(user);
    }

    // Add new User
    private post(user: UserModel): Observable<UserModel[]> {
        let _customHeader = new Headers();
        _customHeader.append('Content-Type', 'application/json');

        return this.authService.post(this.userUrl, JSON.stringify(user), { headers: _customHeader })
            .map(this.extractData)
            .catch(this.handleError);
    }

    // Update existing User
    private put(user: UserModel): Observable<UserModel[]> {
        let url = this.userUrl + "" + user.id + "/";
        let _customHeader = new Headers();
        _customHeader.append('Content-Type', 'application/json');

        return this.authService.put(url, JSON.stringify(user), { headers: _customHeader })
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();

        if (body) {
            if (body.results) {
                return body.results;
            } else {
                return body;
            }
        } else {
            return [];
        }
    }

    private handleError (error: any) {
        let errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }

}
