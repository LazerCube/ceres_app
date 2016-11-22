import { Component } from "@angular/core";
import { Router, ROUTER_DIRECTIVES } from '@angular/router-deprecated';

import { EventsService } from '../../shared';

@Component({
    selector: 'sidebar',
    directives: [ROUTER_DIRECTIVES],
    templateUrl: '/app/shared/sidebar/sidebar.component.html',
})
export class SidebarComponent {
    private _visible: boolean = true;
    constructor(private _router: Router, private _eventsService: EventsService) {
        this._eventsService.showNavigation.subscribe((mode: boolean) => {
            this._visible = (mode);
        });
    }

}
