import { Component } from '@angular/core';
import { Router } from '@angular/router-deprecated';
import { API } from '../../services/api.service';
import { AppState } from '../../app.service';

@Component({
    selector: 'page-logout',
    template: `
    <h3 class="page-title">Logout</h3>
    <p>Logging out from application.</p>
    `
})
export class PageLogoutComponent {
    constructor(private api: API, private router: Router, private appState: AppState) {
    }

    ngOnInit() {
        this.api.logout().subscribe(res => {
            this.appState['loggedin'] = false;
            this.router.navigateByUrl("/");
        }, (err) => {
        });
    }
}