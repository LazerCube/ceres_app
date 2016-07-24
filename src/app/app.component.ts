import {Component, OnInit} from "@angular/core";

@Component({
  selector: 'my-app',
  templateUrl: './app/app.html',
})
export class AppComponent implements OnInit {
    title = 'Ceres app';
    ngOnInit() {
        console.log("Application component initialized ...");
    }
}
