import { Component } from '@angular/core';

@Component({
    selector: 'question-tag-line',
    inputs: [ 'tags' ],
    template: `
<div class="question-tags-container">
    <span class="question-tag" *ngFor="let tag of tags">
        {{tag.title}}
    </span>
</div>
  `
})
export class QuestionTagLineComponent {
    constructor() {
    }

    ngOnChanges() {
    }
}