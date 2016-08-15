import { EventEmitter, Injectable } from "@angular/core";
import { authenticated } from './auth.service';

@Injectable()
export class EventsService {
    public showNavigation: EventEmitter<any> = new EventEmitter();

    constructor() { }
}
