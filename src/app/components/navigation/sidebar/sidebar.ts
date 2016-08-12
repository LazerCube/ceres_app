import {Component} from "@angular/core";
import { Router, ROUTER_DIRECTIVES } from '@angular/router-deprecated';

import { AuthService } from '../../../services/auth.service';
import { EventsService } from '../../../services/events.service';

@Component({
    selector: 'sidebar',
    directives: [ROUTER_DIRECTIVES],
    providers: [],
    templateUrl: './app/components/navigation/sidebar/sidebar.html',
})

export class Sidebar {
    // private showSideBar: boolean = true;
    //
    // constructor(private authService:AuthService, public router: Router, private eventsService: EventsService) {
    //     this.eventsService.showNavigation.subscribe((mode: boolean) => {
    //         this.showSideBar = mode;
    //     });
    // }
}
