import {Component} from "@angular/core";
import { Router, ROUTER_DIRECTIVES } from '@angular/router-deprecated';

import { AuthService } from '../../../services/auth.service';
import { EventsService } from '../../../services/events.service';

@Component({
    selector: 'navbar',
    directives: [ROUTER_DIRECTIVES],
    providers: [],
    templateUrl: './app/components/navigation/navbar/navbar.html',
})

export class Navbar {
    public title = 'Ceres app';

    private visible: boolean = true;

    constructor(private authService:AuthService, public router: Router, private eventsService: EventsService) {
        this.eventsService.showNavigation.subscribe((mode: boolean) => {
            console.log(mode);
            this.visible = (mode);
        });
    }

    logout() {
        localStorage.removeItem("id_token");
        this.eventsService.showNavigation.emit(false);
        this.router.navigate(['Login']);
    }

}
