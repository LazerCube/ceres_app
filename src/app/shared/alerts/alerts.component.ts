import { Component, Injectable } from '@angular/core';

import { AlertComponent } from './alert';
import { IAlertParams } from './alerts.interface';

@Component({
    selector: 'alerts',
    directives: [AlertComponent],
    templateUrl: '/app/shared/alerts/alerts.component.html',
})

@Injectable()
export class AlertsComponent {
    private DEFAULT_TYPE = 'warning';

    /*
     * msg: <"your text here!">
     *
     * type: <'success'/'warning'/'danger'/'info'> - Optional
     * dismissible <true/false> - Optional
     * timeout <0+> - Optional
     */

    public alerts:Array<Object> = [];

    public closeAlert(i:number):void {
        this.alerts.splice(i, 1);
    }

    // createAlert("Oh snap!",{timeout:5000, type:"success"})
    public createAlert(text: string, params?: IAlertParams):void {
        let alert = {msg: text};
        if (params) {
            if (params.type) {
                alert.type = params.type;
            } else {
                alert.type = this.DEFAULT_TYPE;
            }
            if (params.dismissible) {
                alert.dismissible = params.dismissible;
            }
            if (params.timeout) {
                alert.timeout = params.timeout;
            }
        }
        console.log(alert);
        this.alerts.push(alert);
    }

    public logAlerts():void {
        console.log(this.alerts);
    }

}
