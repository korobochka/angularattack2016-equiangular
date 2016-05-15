import { Component } from '@angular/core';

@Component({
    selector: 'page-admin',
    template: `
    <h3 class="page-title">Title of our Application</h3>

    <div class="mdl-grid">
        <div class="mdl-cell mdl-cell--12-col mdl-shadow--2dp">
            Few words about functions, how to install and so forth
        </div>
    </div>
  `
})
export class PageAdminComponent {
    constructor() {
    }

    ngOnInit() {
    }
}