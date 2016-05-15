import { Component } from '@angular/core';

@Component({
    selector: 'question',
    inputs: [ 'body' ],
    template: `
<div class="question-body-container">
    <markdown [src]="body">
    </markdown>
</div>
  `
})
export class QuestionComponent {
    body: string;

    constructor() {
    }

    ngOnChanges() {
    }
}