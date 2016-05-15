import { Component } from '@angular/core';
import { API } from '../../services/api.service';
import { AppState } from '../../app.service';

@Component({
    selector: 'page-login',
    template: `
    <h3 class="page-title text-center">Login using Linkedin</h3>
    
    <div class="mdl-cell mdl-cell--12-col text-center" style="margin: 4em 0;">
        <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" (click)="handleLoginClick()">
            Login with Linkedin
        </button>
    </div>
  `
})
export class PageLoginComponent {
    constructor(private api: API, private appState: AppState) {
    }

    ngOnInit() {
    }

    handleLoginClick() {
        let host = '';
        let returnHost = '';

        if (document.location.hostname != "localhost") {
            host = "http://korobochka.org:4567";

            returnHost = 'http://' + document.location.hostname;
            if (document.location.port.toString() != '80') {
                returnHost += ':' + document.location.port;
            }
        }
        console.log('handleLoginClick', document.location, host, returnHost);

        document.location.href = host + '/api/auth/li?return=' + encodeURIComponent(returnHost + "/#/profile");
    }
}