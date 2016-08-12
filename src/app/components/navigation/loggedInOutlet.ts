import { Directive, Attribute, ViewContainerRef, DynamicComponentLoader, ViewChild} from '@angular/core';
import { Router, RouterOutlet, ComponentInstruction } from '@angular/router-deprecated';

import { authenticated } from '../../services/auth.service';

@Directive({
    selector: 'router-outlet',
})

export class LoggedInRouterOutlet extends RouterOutlet {
    publicRoutes: any;
    private parentRouter: Router;

    constructor(_viewContainerRef: ViewContainerRef, _loader: DynamicComponentLoader,
    _parentRouter: Router, @Attribute('name') nameAttr: string) {
        super(_viewContainerRef, _loader, _parentRouter, nameAttr);

        this.parentRouter = _parentRouter;
        // The Boolean following each route below
        // denotes whether the route requires authentication to view
        this.publicRoutes = {
            '': true,
            'signup': true
        };
    }

    activate(instruction: ComponentInstruction) {
        let url = instruction.urlPath;
        if (!this.publicRoutes[url] && !authenticated()) {
            this.parentRouter.navigate(['Login']);
        } else if (this.publicRoutes[url] && authenticated()) {
            this.parentRouter.navigate(['Home-Page']);
        }
        return super.activate(instruction);
    }
}
