import { Component } from '@angular/core';
import { Router } from '@angular/router-deprecated';
import { API } from '../../services/api.service';

@Component({
    selector: 'md',
    template: `
    <p>Logging out</p>
    `
})
export class PageLogoutComponent {
    constructor(private api: API, private router: Router) {
    }

    ngOnInit() {
        this.api.logout().subscribe(res => {
            this.router.navigateByUrl("/");
        }, (err) => {
        });
    }
}