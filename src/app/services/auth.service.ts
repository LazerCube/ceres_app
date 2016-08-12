import {Http, Headers, Request, RequestOptions, RequestOptionsArgs, RequestMethod, Response} from '@angular/http';
import { Injectable, provide } from "@angular/core";
import { Observable } from 'rxjs/Observable';

import { Router } from '@angular/router-deprecated';

declare var escape: any;

export interface IAuthConfig {
    headerName: string;
    headerPrefix: string;
    tokenName: string;
    tokenUrl: string;
    tokenGetter: any;
    userInfoUrl: string;
    clientId: string;
    noJwtError: boolean;
    noTokenScheme?: boolean;
    globalHeaders: Array<Object>;
}

export class AuthConfig {

    headerName: string;
    headerPrefix: string;
    tokenName: string;
    tokenUrl: string;
    tokenGetter: any;
    userInfoUrl: string;
    clientId: string;
    noJwtError: boolean;
    noTokenScheme?: boolean;
    globalHeaders: Array<Object>;

    constructor(config:any = {}) {
        this.headerName = config.headerName || 'Authorization';
        if (config.headerPrefix) {
            this.headerPrefix = config.headerPrefix + ' ';
        } else if (config.noTokenScheme) {
            this.headerPrefix = '';
        } else {
            this.headerPrefix = 'Bearer';
        }

        this.tokenName = config.tokenName || 'id_token';
        this.noJwtError = config.noJwtError || false;
        this.tokenGetter = config.tokenGetter || (() => localStorage.getItem(this.tokenName));
        this.globalHeaders = config.globalHeaders || [];
        this.noTokenScheme = config.noTokenScheme || false;

        this.tokenUrl = config.tokenUrl || '';
        this.clientId = config.clientId || '';
        this.userInfoUrl = config.userInfoUrl || '';
    }

    getConfig():IAuthConfig {
        return {
            headerName: this.headerName,
            headerPrefix: this.headerPrefix,
            tokenName: this.tokenName,
            tokenGetter: this.tokenGetter,
            noJwtError: this.noJwtError,
            noTokenScheme:this.noTokenScheme,
            globalHeaders: this.globalHeaders,
            tokenUrl: this.tokenUrl,
            clientId: this.clientId,
            userInfoUrl: this.userInfoUrl
        };
    }

}

@Injectable()
export class AuthService {

    private _config: IAuthConfig;
    public tokenStream: Observable<string>;

    constructor(options: AuthConfig, private http: Http, private _defOpts?: RequestOptions) {
    this._config = options.getConfig();

    this.tokenStream = new Observable<string>((obs: any) => {
        obs.next(this._config.tokenGetter());
        });
    }

    private setGlobalHeaders(headers: Array<Object>, request: Request | RequestOptionsArgs) {
        if ( ! request.headers ) {
            request.headers = new Headers();
        }
        headers.forEach((header: Object) => {
            let key: string = Object.keys(header)[0];
            let headerValue: string = (<any>header)[key];
            request.headers.set(key, headerValue);
        });
    }

    private request(url: string | Request, options?: RequestOptionsArgs) : Observable<Response> {
        if (typeof url === 'string') {
            return this.get(url, options); // Recursion: transform url from String to Request
        }
        // else if ( ! url instanceof Request ) {
        //   throw new Error('First argument must be a url string or Request instance.');
        // }

        // from this point url is always an instance of Request;
        let req: Request = <Request>url;
        req.headers.set(this._config.headerName, this._config.headerPrefix + this._config.tokenGetter());
        return this.http.request(req);
    }

    private mergeOptions(defaultOpts: RequestOptions, providedOpts: RequestOptionsArgs) {
        let newOptions = defaultOpts || new RequestOptions();
        if (this._config.globalHeaders) {
            this.setGlobalHeaders(this._config.globalHeaders, providedOpts);
        }
        newOptions = newOptions.merge(new RequestOptions(providedOpts));
        return newOptions;
    }

    private requestHelper(requestArgs: RequestOptionsArgs, additionalOptions: RequestOptionsArgs) : Observable<Response> {
        let options = new RequestOptions(requestArgs);
        if (additionalOptions) {
            options = options.merge(additionalOptions);
        }
        return this.request(new Request(this.mergeOptions(this._defOpts, options)));
    }

    public get(url: string, options?: RequestOptionsArgs) : Observable<Response> {
        return this.requestHelper({ url:  url, method: RequestMethod.Get }, options);
    }

    public post(url: string, body: any, options?: RequestOptionsArgs) : Observable<Response> {
        return this.requestHelper({ url:  url, body: body, method: RequestMethod.Post }, options);
    }

    public put(url: string, body: any, options ?: RequestOptionsArgs) : Observable<Response> {
        return this.requestHelper({ url:  url, body: body, method: RequestMethod.Put }, options);
    }

    public delete(url: string, options ?: RequestOptionsArgs) : Observable<Response> {
        return this.requestHelper({ url:  url, method: RequestMethod.Delete }, options);
    }

    public patch(url: string, body:any, options?: RequestOptionsArgs) : Observable<Response> {
        return this.requestHelper({ url:  url, body: body, method: RequestMethod.Patch }, options);
    }

    public head(url: string, options?: RequestOptionsArgs) : Observable<Response> {
        return this.requestHelper({ url:  url, method: RequestMethod.Head }, options);
    }

    public login(username: string, password: string) : Observable<Response> {
        let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
        let body = "grant_type=password" + "&username=" + username + "&password=" + password + "&client_id=" + this._config.clientId;
        return this.requestHelper({ url:  this._config.tokenUrl, body: body, method: RequestMethod.Post }, { headers: myHeaders });
    }

    // private logError(err) {
    //     console.error('There was an error: ' + err);
    // }

    // public login(username, password, callback) {
    //     let myHeaders = new Headers();
    //     myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
    //
    //     let data = "grant_type=password"
    //                 +  "&username=" + username
    //                 +  "&password=" + password
    //                 +  "&client_id=" + this._config.clientId;
    //
    //     this.post(this._config.tokenUrl, data, { headers: myHeaders } )
    //         .subscribe(
    //             data => {
    //                 localStorage.setItem(this._config.tokenName, data.json().access_token);
    //         },
    //         err => console.log(err.text()),
    //         () => {
    //             callback();
    //         }
    //     );
    // }

}

// Helper class to decode and find JWT expiration.

export class JwtHelper {

    public urlBase64Decode(str:string) {
        var output = str.replace(/-/g, '+').replace(/_/g, '/');
        switch (output.length % 4) {
            case 0: { break; }
            case 2: { output += '=='; break; }
            case 3: { output += '='; break; }
            default: {
                throw 'Illegal base64url string!';
            }
        }
        return decodeURIComponent(escape(typeof window === 'undefined' ? atob(output) : window.atob(output)));
    }

    public decodeToken(token:string) {
        var parts = token.split('.');

    if (parts.length !== 3) {
        throw new Error('JWT must have 3 parts');
    }

    var decoded = this.urlBase64Decode(parts[1]);
    if (!decoded) {
        throw new Error('Cannot decode the token');
    }

        return JSON.parse(decoded);
    }

    public getTokenExpirationDate(token:string) {
        var decoded: any;
        decoded = this.decodeToken(token);

        if (typeof decoded.exp === "undefined") {
            return null;
        }

        var date = new Date(0); // The 0 here is the key, which sets the date to the epoch
        date.setUTCSeconds(decoded.exp);

        return date;
    }

    public isTokenExpired(token:string, offsetSeconds?:number) {
        var date = this.getTokenExpirationDate(token);
        offsetSeconds = offsetSeconds || 0;
        if (date === null) {
            return false;
        }

        // Checks if token has expired?
        return !(date.valueOf() > (new Date().valueOf() + (offsetSeconds * 1000)));
    }
}


// Checks for presence of token and that token hasn't expired.
// For use with the @CanActivate router decorator

export function tokenNotExpired(tokenName = 'id_token', jwt?:string):boolean {
    const token:string = jwt || localStorage.getItem(tokenName);
    const jwtHelper = new JwtHelper();
    return token && !jwtHelper.isTokenExpired(token, null);
}

export function authenticated(tokenName = 'id_token'): boolean {
    return (localStorage.getItem(tokenName) != null);
}

export const AUTH_PROVIDERS: any = [
    provide(AuthService, {
        useFactory: (http: Http, options: RequestOptions) => {
            return new AuthService(new AuthConfig(), http, options);
        },
        deps: [Http, RequestOptions]
    })
];

export function provideAuth(config = {}): any[] {
    return [
        provide(AuthService, {
            useFactory: (http: Http, options: RequestOptions) => {
                return new AuthService(new AuthConfig(config), http, options);
            },
        deps: [Http, RequestOptions]
        })
    ];
}
