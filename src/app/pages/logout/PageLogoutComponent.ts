import { Component } from '@angular/core';
import { Router } from '@angular/router-deprecated';
import { API } from '../../services/api.service';
import { AppState } from '../../app.service';

@Component({
    selector: 'page-logout',
    template: `
    <p>Logging out</p>
    `
})
export class PageLogoutComponent {
    constructor(private api: API, private router: Router, private appState: AppState) {
    }

    ngOnInit() {
        this.api.logout().subscribe(res => {
            this.appState.loggedIn = false;
            this.router.navigateByUrl("/");
        }, (err) => {
        });
    }
}