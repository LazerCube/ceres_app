/* Avoid: 'error TS2304: Cannot find name <type>' during compilation */
///<reference path="../../typings/index.d.ts"/>

import { bootstrap }    from '@angular/platform-browser-dynamic';
import { Component, provide } from '@angular/core';

import {enableProdMode} from '@angular/core';

// enableProdMode();

@Component({
  selector: 'app',
  templateUrl: './app/app.html',
})

export class App {
    title = 'Ceres app'
}

bootstrap(App);
