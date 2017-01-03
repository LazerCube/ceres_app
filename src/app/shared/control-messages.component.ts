import { Component, Input } from '@angular/core';
import { Control } from '@angular/common';

import { ValidationService } from '../shared';

@Component({
    selector: 'control-messages',
    template: `<div *ngIf="errorMessage !== null">{{ errorMessage }}</div>`
})
export class ControlMessagesComponent {
    @Input() control: Control;
    constructor() { }

    get errorMessage() {
        for (let propertyName in this.control.errors) {
            if (this.control.errors.hasOwnProperty(propertyName) && !this.control.pristine) {
                return ValidationService.getValidatorErrorMessage(propertyName, this.control.errors[propertyName]);
            }
        }
        return null;
    }
}
