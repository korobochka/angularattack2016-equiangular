import { Component } from '@angular/core';
import { API } from '../../services/api.service';

@Component({
    selector: 'md',
    template: `
  <md-card>
    <h1>
      Login using Linkedin
    </h1>
    
    <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" (click)="handleLoginClick()">
        Login with Linkedin
    </button>
  </md-card>

  `
})
export class PageLoginComponent {
    constructor(private api: API) {
    }

    ngOnInit() {
    }

    handleLoginClick() {
        document.location.href = '/api/auth/li?return=' + encodeURIComponent("/#/profile");
    }
}