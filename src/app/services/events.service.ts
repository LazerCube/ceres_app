import { EventEmitter, Injectable } from "@angular/core";

@Injectable()
export class EventsService {
    public showNavigation: EventEmitter<any> = new EventEmitter();

    constructor() { }
}
