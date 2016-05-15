import { Component } from '@angular/core';

@Component({
    selector: 'question',
    inputs: [ 'title', 'body' ],
    template: `
<div class="question-body-container">
    <markdown>
        {{body}}
        <ng-content></ng-content>
    </markdown>
</div>
  `
})
export class QuestionComponent {
    constructor() {
    }

    ngOnInit() {
    }
}