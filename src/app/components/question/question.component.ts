import { Component } from '@angular/core';

/*
 * We're loading this component asynchronously
 * We are using some magic with es6-promise-loader that will wrap the module with a Promise
 * see https://github.com/gdi2290/es6-promise-loader for more info
 */

@Component({
    selector: 'question',
    inputs: [ 'title' ],
    template: `
            {{title}}
            <markdown>
                <ng-content></ng-content>
            </markdown>
  `
})
export class QuestionComponent {
    constructor() {
        console.log('QuestionComponent', this);
    }

    ngOnInit() {
    }
}