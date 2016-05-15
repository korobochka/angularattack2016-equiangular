import { Component } from '@angular/core';

@Component({
    selector: 'question',
    inputs: [ 'title', 'body' ],
    template: `
            <markdown>
                {{body}}
                <ng-content></ng-content>
            </markdown>
  `
})
export class QuestionComponent {
    constructor() {
    }

    ngOnInit() {
    }
}