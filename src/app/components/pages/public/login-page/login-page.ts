import { Component } from "@angular/core";
import { ControlGroup, Control, FormBuilder, Validators, FORM_DIRECTIVES } from '@angular/common';
import { Router, RouterLink } from '@angular/router-deprecated';

import { AuthService } from '../../../../services/auth.service';
import { EventsService } from '../../../../services/events.service';

@Component({
    selector: 'login-page',
    directives: [RouterLink, FORM_DIRECTIVES],
    templateUrl: './app/components/pages/public/login-page/login-page.html',
})

// export class Login {
//     public errorMsg:string = '';
//
//     constructor(
//         private authService: AuthService,
//         public router: Router,
//         private eventsService: EventsService) {}
//
//     login(event, username, password) {
//         event.preventDefault();
//         this.authService.login(username, password)
//             .subscribe(
//                  data => {
//                      localStorage.setItem("id_token", data.json().access_token);
//                  },
//                  err => console.log(err.text()),
//                  () => {
//                      console.log("Authorizated");
//                      this.eventsService.showNavigation.emit(true);
//                      this.router.parent.navigate(['Home-Page']);
//                  }
//             );
//     }
//
//     signup(event) {
//         event.preventDefault();
//         this.router.parent.navigateByUrl('/signup');
//     }
// }

// export class Login {
//     private loginForm: any;
//
//     constructor(_builder: FormBuilder) {
//         this.loginForm = _builder.group({
//             username: ["", Validators.required],
//             password: ["", Validators.required]
//         });
//     }
//
//     doLogin(event) {
//         if (this.loginForm.dirty && this.loginForm.valid) {
//             console.log(this.loginForm.value);
//             event.preventDefault();
//         }
//     }
// }

export class Login {
    loginForm: ControlGroup;

    username: Control;
    email: Control;

    constructor(private _builder: FormBuilder) {

        this.username = new Control("", Validators.required);

        this.loginForm = _builder.group({
            username:  this.username
        });
    }

    doLogin(event) {
       if (this.loginForm.dirty && this.loginForm.valid) {
           console.log(this.loginForm.value);
           event.preventDefault();
       }
   }
}
