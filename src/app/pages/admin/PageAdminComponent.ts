import { Component } from '@angular/core';

@Component({
    selector: 'about',
    template: `
    <h1>Title of our Application</h1>
    Few words about functions, how to install and so forth
  `
})
export class PageAdminComponent {
    constructor() {
    }

    ngOnInit() {
    }
}