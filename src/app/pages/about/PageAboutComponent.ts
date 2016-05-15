import { Component } from '@angular/core';

@Component({
    selector: 'page-about',
    template: `
    <h3 class="page-title">About Application</h3>

    <div class="mdl-grid">
        <div class="mdl-cell mdl-cell--12-col mdl-shadow--2dp static-page-content">
            Few words about functions, how to install and so forth
        </div>
    </div>
  `
})
export class PageAboutComponent {
    constructor() {

    }

    ngOnInit() {
    }
}