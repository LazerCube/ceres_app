import {AppComponent} from "./app.component";
import {bootstrap} from "@angular/platform-browser-dynamic";
import { FORM_PROVIDERS } from '@angular/common';
import {ROUTER_PROVIDERS} from '@angular/router';
import { Http, HTTP_PROVIDERS } from '@angular/http';


var providers = [
    HTTP_PROVIDERS,
    ROUTER_PROVIDERS
];

bootstrap(AppComponent, providers);
