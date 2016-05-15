import { Component } from '@angular/core';

@Component({
    selector: 'page-about',
    template: `
    <h3 class="page-title">Equiangular: smarter testing</h3>

    <div class="mdl-grid">
        <div class="mdl-cell mdl-cell--12-col mdl-shadow--2dp static-page-content">
            <p>Our goal is to create a better platform for estimating personal skills.</p>
            <p>Simply login with your LinkedIn account, add a few skills to your profile and then answer automatic quizzes and see your estimated knowledge on the profile page.</p>
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