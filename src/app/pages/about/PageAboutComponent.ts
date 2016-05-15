import { Component } from '@angular/core';

@Component({
    selector: 'page-about',
    template: `
    <h1>Equiangular: smarter testing</h1>
    Our goal is to create a better platform for estimating personal skills. 
    Simply login with your LinkedIn account, add a few skills to your profile and then answer automatic quizzes and see your estimated knowledge on the profile page.  
  `
})
export class PageAboutComponent {
    constructor() {

    }

    ngOnInit() {
    }
}