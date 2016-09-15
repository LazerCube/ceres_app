import { Component } from "@angular/core";
import { Router, ROUTER_DIRECTIVES } from '@angular/router-deprecated';

import { EventsService } from '../../shared';

@Component({
    selector: 'navbar',
    directives: [ROUTER_DIRECTIVES],
    templateUrl: '/app/shared/nav/nav.component.html',
})
export class Navbar {
    public title = 'Ceres app';

    private _visible: boolean = true;

    constructor(private _router: Router, private _eventsService: EventsService) {
        this._eventsService.showNavigation.subscribe((mode: boolean) => {
            this._visible = (mode);
        });
    }

    doLogout() {
        localStorage.removeItem("id_token");
        this._eventsService.showNavigation.emit(false);
        this._router.navigate(['Login-Page']);
    }
}
